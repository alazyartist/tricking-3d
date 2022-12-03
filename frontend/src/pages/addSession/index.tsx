import React from "react";
import dynamic from "next/dynamic";
const AddSessionPage = dynamic(
  () => import("@old_pages/sessions/AddSessionPage")
);
const AddSession = () => {
  return <AddSessionPage />;
};

export default AddSession;
