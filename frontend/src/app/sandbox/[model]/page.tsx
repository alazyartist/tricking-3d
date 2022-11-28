import React from "react";
import { Html } from "@react-three/drei";
const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Html>
      <p className="bg-teal-300">Testing</p>;
    </Html>
  );
};

export default Page;
