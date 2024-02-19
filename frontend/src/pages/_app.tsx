import type { AppType } from "next/app";
import type { NextRouter } from "next/router";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import "../autocomplete.css";
import { useRouter } from "next/router";
import TheoryTabBar from "@components/layout/TheoryTabBar";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useEffect } from "react";
import mixpanel from "@utils/mixpanel";
import Head from "next/head";
const AppBackground = dynamic(
  () => import("../components/layout/AppBackground")
);
const UserIcon = dynamic(() => import("../components/layout/UserIcon"), {
  ssr: false,
});
const TabBar = dynamic(() => import("../components/layout/TabBar"), {
  ssr: false,
});
interface MyRouter extends NextRouter {
  components?: any;
}
const queryClient = new QueryClient();
const MyApp: AppType<{ Session: null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("./serviceWorker.js")
          .then((reg) =>
            console.log("YOU DID IT", "Registration Scope", reg.scope)
          )
          .catch((err) => console.log("Fucked it up...", err));
      });
    }

    if (path === "/") {
      mixpanel.track("Landing Page View", {
        path: path,
        components: router?.components ? Object.keys(router?.components) : [],
      });
    } else {
      mixpanel.time_event("Login");

      mixpanel.track("Page View", {
        path: path,
        components: router?.components ? Object.keys(router?.components) : [],
      });
    }
  }, []);

  const router = useRouter() as MyRouter;
  const path = router.pathname;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Trickedex" />
        <meta property="og:url" content="https://trickedex.app/" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content={`508164441188790`} />
        <meta
          property="og:image"
          content="https://trickedex.app/Trickedex_og_wide.jpg"
        />
        {/* <meta
          property="og:image"
          content="https://trickedex.app/Trickedex_og.jpg"
        /> */}
        <meta
          property="og:description"
          content="Tricking Information at your fingertips"
        />
      </Head>
      <ClerkProvider appearance={{ baseTheme: dark }} {...pageProps}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools position={"top-right"} /> */}
          <AppBackground />
          <SignedIn>
            {!path.includes("/landing") && path !== "/" && <UserIcon />}
          </SignedIn>
          <div id={"portal-root"}></div>

          {path.includes("/theory") ? (
            <TheoryTabBar />
          ) : (
            path !== "/" && <TabBar />
          )}
          <Component {...pageProps} />
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
