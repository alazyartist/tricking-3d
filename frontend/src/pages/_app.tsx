// src/pages/_app.tsx
// import { SessionProvider } from "next-auth/react";
// import type { Session } from "next-auth";
import type { AppType } from "next/app";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import "../autocomplete.css";
import AppBackground from "../components/layout/AppBackground";
import { Suspense } from "react";
const UserIcon = dynamic(() => import("../components/layout/UserIcon"), {
  suspense: true,
});
const TabBar = dynamic(() => import("../components/layout/TabBar"), {
  suspense: true,
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
  const queryClient = new QueryClient();
  return (
    // <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      <AppBackground />
      <UserIcon />
      <TabBar />
      <Component {...pageProps} />
    </QueryClientProvider>
    // </SessionProvider>
  );
};

export default MyApp;
// export default trpc.withTRPC(MyApp);
