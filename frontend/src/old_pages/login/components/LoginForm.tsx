"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReturnData, useLogin } from "../../../api/useLogin";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useUserStore } from "../../../store/userStore";
import { useRouter } from "next/navigation";
import mixpanel from "@utils/mixpanel";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState<Boolean>();
  const [data, setData] = useState<ReturnData>();
  const [loginError, setLoginError] = useState<string>();
  const accessTokenStore = useUserStore((s) => s.accessToken);
  const user = useUserStore((s) => s.user);
  const userInfo = useUserStore((s) => s.userInfo);
  const [persist, setPersist] = useLocalStorage("persist", false);
  const nav = useRouter();

  const from = "/home";
  const { mutateAsync: login, data: response, error } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: email.toString(),
        password: password.toString(),
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoginError(error?.response?.data?.message);
  }, [error]);

  useEffect(() => {
    if (response?.message === "You are logged in!") {
      mixpanel.identify(response.uuid);
      mixpanel.people.set({
        $name: `${response.first_name} ${response.last_name}`,
        $email: email,
        $avatar: `https://trickedex.app/images/${response.uuid}/${response.profilePic}`,
        first_name: response.first_name,
        last_name: response.last_name,
        profilePic: response.profilePic,
      });
      mixpanel.track("Login");
      console.log(response);
      nav.push("/home");
    }
  }, [response]);
  useEffect(() => {
    console.log(response);
    console.log(accessTokenStore, user, from);
  }, [accessTokenStore, response, user, from]);

  const togglePersist = () => {
    const bool = JSON.parse(localStorage.getItem("persist"));
    setPersist(!bool);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-zinc-800"
      >
        <h1 className="text-center font-inter text-2xl font-bold text-zinc-300">
          LOGIN
        </h1>
        <input
          id="login"
          className="rounded-xl p-2"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <div>
          <input
            id="login"
            className="rounded-xl p-2"
            onChange={(e) => setPassword(e.target.value.toString())}
            type={isVisible ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="p-2 text-xs text-white"
          >
            {!isVisible ? "Show" : "Hide"}
          </button>
        </div>
        <div className="flex w-full justify-around">
          <button
            type="submit"
            className="text=zinc-700 w-fit rounded bg-white px-2 py-1 "
          >
            Log In
          </button>
          <Link
            className="place-self-end text-base text-zinc-300"
            href="/register"
          >
            Register
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-zinc-300">
          {/* {data && JSON.stringify(data[1].user_name)} */}

          {data && JSON.stringify(data.message)}
          {/* <div>{data.accessToken}</div> */}
        </div>
      </form>
      {loginError}
      <div className="flex w-full place-content-center place-items-center">
        <label htmlFor="persist">Remember this Device</label>
        <input
          className="mx-2 rounded-2xl"
          id={"persist"}
          type="checkbox"
          onChange={() => togglePersist()}
          checked={persist}
        />
      </div>
    </>
  );
}

export default LoginForm;
