import React, { useEffect } from "react";
import BackgroundCircles from "@admin/components/BackgroundCircles";
import dynamic from "next/dynamic";
import { SignIn } from "@clerk/nextjs";
const LoginForm = dynamic(
  () => import("@old_pages/login/components/LoginForm"),
  { ssr: false }
);

function Login() {
  return (
    <div className="flex h-screen w-full flex-col place-content-center place-items-center gap-3 font-inter text-zinc-300">
      <SignIn afterSignInUrl="/addSession" />

      <BackgroundCircles />
    </div>
  );
}

export default Login;
