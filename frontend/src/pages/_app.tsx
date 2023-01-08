import type { AppType } from "next/app";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import "../autocomplete.css";
import { useRouter } from "next/router";
import TheoryTabBar from "@components/layout/TheoryTabBar";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { useEffect } from "react";
const AppBackground = dynamic(
  () => import("../components/layout/AppBackground")
);
const UserIcon = dynamic(() => import("../components/layout/UserIcon"), {
  ssr: false,
});
const TabBar = dynamic(() => import("../components/layout/TabBar"), {
  ssr: false,
});

const MyApp: AppType<{
  session: Session | null;
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
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
  }, []);
  const router = useRouter();
  const path = router.pathname;
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AppBackground />
        {!path.includes("/landing") && path !== "/" && <UserIcon />}
        {path.includes("/theory") ? <TheoryTabBar /> : <TabBar />}
        <Component {...pageProps} />
      </QueryClientProvider>
      //{" "}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
