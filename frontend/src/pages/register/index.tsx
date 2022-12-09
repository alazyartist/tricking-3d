import React from "react";
import dynamic from "next/dynamic";
const Register = dynamic(() => import("@old_pages/register/Register"));
const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
