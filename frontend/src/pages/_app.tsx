// src/pages/_app.tsx
// import { SessionProvider } from "next-auth/react";
// import type { Session } from "next-auth";
import type { AppType } from "next/app";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import "../autocomplete.css";
import AppBackground from "../components/layout/AppBackground";
import { useRouter } from "next/router";
import TheoryTabBar from "@components/layout/TheoryTabBar";
const UserIcon = dynamic(() => import("../components/layout/UserIcon"), {
  ssr: false,
});
const TabBar = dynamic(() => import("../components/layout/TabBar"), {
  ssr: false,
});
// import { trpc } from "../utils/trpc";

const MyApp: AppType<{
  // session: Session | null
}> = ({
  Component,
  pageProps: {
    // session,
    ...pageProps
  },
}) => {
  const router = useRouter();
  const path = router.pathname;
  const queryClient = new QueryClient();
  return (
    // <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      <AppBackground />
      <UserIcon />
      {path.includes("/theory") ? <TheoryTabBar /> : <TabBar />}
      <Component {...pageProps} />
    </QueryClientProvider>
    // </SessionProvider>
  );
};

export default MyApp;
// export default trpc.withTRPC(MyApp);
