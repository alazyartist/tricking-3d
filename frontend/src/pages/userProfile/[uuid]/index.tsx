import dynamic from "next/dynamic";
import React from "react";

const UserProfile = dynamic(() => import("@old_pages/userProfile/userProfile"));

const UserProfilePage = () => {
  return <UserProfile />;
};

export default UserProfilePage;

// export async function getStaticProps() {
//   const ssgHelper = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContextInner(),
//     transformer: superjson, // optional - adds superjson serialization
//   });

//   const id = "1";
//   const post = await ssgHelper.userDB.findByUUID.fetch({ id });

//   if (!post) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       trpcState: ssgHelper.dehydrate(),
//       id,
//     },
//     revalidate: 1,
//   };
// }
