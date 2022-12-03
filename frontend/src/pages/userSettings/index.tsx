import dynamic from "next/dynamic";
import React from "react";
const UserSettings = dynamic(
  () => import("@old_pages/userSettings/UserSettings")
);
const UserSettingsPage = () => {
  return <UserSettings />;
};

export default UserSettingsPage;
