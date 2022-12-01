import React from "react";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("@old_pages/dash/Dashboard"));
const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
