"use client";
import AppBackground from "@components/layout/AppBackground";
import TabBar from "@components/app_layout/TabBar";
import Header from "@components/app_layout/Header";
import UserIcon from "@components/app_layout/UserIcon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body>
        <AppBackground />
        <Header />
        <UserIcon />
        <TabBar />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
