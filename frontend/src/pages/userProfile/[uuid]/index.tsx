import dynamic from "next/dynamic";
import React from "react";
const UserProfile = dynamic(() => import("@old_pages/userProfile/userProfile"));

const UserProfilePage = () => {
  return <UserProfile />;
};

export default UserProfilePage;
