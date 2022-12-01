import dynamic from "next/dynamic";
import React from "react";
const AdminIndex = dynamic(() => import("@admin/AdminIndex"));
const AdminPage = () => {
  return <AdminIndex />;
};

export default AdminPage;
