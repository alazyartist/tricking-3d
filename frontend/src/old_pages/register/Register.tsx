import React from "react";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

function Register() {
  return (
    <div className="flex h-screen w-full flex-col place-content-center place-items-center gap-3 font-inter text-zinc-300">
      <div className="rounded-lg bg-zinc-700 bg-opacity-30 p-4 backdrop-blur-md">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
