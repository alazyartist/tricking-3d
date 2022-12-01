"use client";
import AppBackground from "@components/layout/AppBackground";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Header = dynamic(() => import("@components/app_layout/Header"), {
  ssr: false,
});
const UserIcon = dynamic(() => import("@components/app_layout/UserIcon"), {
  ssr: false,
});
const TabBar = dynamic(() => import("@components/app_layout/TabBar"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body>
        <Suspense>
          <AppBackground />
          <Header />
          <UserIcon />
          <TabBar />
        </Suspense>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
