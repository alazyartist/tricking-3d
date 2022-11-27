// src/pages/_app.tsx
import dynamic from "next/dynamic";
import "../index.css";
// import { SessionProvider } from "next-auth/react";
// import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
			<Component {...pageProps} />
		</QueryClientProvider>
		// </SessionProvider>
	);
};

export default MyApp;
// export default trpc.withTRPC(MyApp);
