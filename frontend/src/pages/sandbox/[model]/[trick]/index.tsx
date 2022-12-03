import dynamic from "next/dynamic";
import React from "react";

const Sandbox = dynamic(() => import("@components/sandbox/Sandbox"), {
  ssr: false,
});
const SandboxPage = () => {
  return <Sandbox />;
};

export default SandboxPage;
