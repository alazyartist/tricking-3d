import React from "react";
import dynamic from "next/dynamic";
const AdminSessionReview = dynamic(
  () => import("@admin/components/AdminSessionReview")
);
const SessionReview = () => {
  return <AdminSessionReview />;
};

export default SessionReview;
