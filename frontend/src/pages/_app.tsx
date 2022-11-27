// src/pages/_app.tsx
import dynamic from "next/dynamic";
import "../index.css";
// import { SessionProvider } from "next-auth/react";
// import type { Session } from "next-auth";
import type { AppType } from "next/app";
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
	return (
		// <SessionProvider session={session}>
		<Component {...pageProps} />
		// </SessionProvider>
	);
};

export default MyApp;
// export default trpc.withTRPC(MyApp);
