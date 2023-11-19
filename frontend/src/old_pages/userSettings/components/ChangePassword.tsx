import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import useChangePassword from "../../../api/useChangePassword";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });
  const [res, setRes] = useState();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  //TODO: update api routes
  const { mutateAsync: changePassword } = useChangePassword();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword(passwords);
      if (await response) {
        console.log(response);
        setRes(response.message);
      }
    } catch (err) {
      setRes(err?.response?.data?.message);
      console.log(err);
    }
  };
  return (
    <>
      <div
        onClick={() => setChangePasswordOpen(!changePasswordOpen)}
        className=" mx-4 px-4 py-2 text-xl"
      >
        Change Password
      </div>
      {changePasswordOpen && (
        <div
          className={`flex flex-col place-content-center place-items-center rounded-md bg-zinc-800 p-4 text-base`}
        >
          <form
            onSubmit={handleSubmit}
            className="place-item-center flex flex-col place-content-center gap-6 p-4 text-zinc-900"
          >
            <div className="flex place-content-center place-items-center justify-between gap-2">
              <input
                value={passwords.oldPassword}
                onChange={(e) => {
                  setPasswords({ ...passwords, oldPassword: e.target.value });
                }}
                placeholder="old password"
                className="rounded-xl bg-zinc-300 p-2 text-zinc-900"
                type={"text"}
              />
              {passwords.newPassword !== "" &&
                passwords.newPassword === passwords.newPasswordCheck && (
                  <FaCheck className="fill-emerald-500 text-xl" />
                )}
            </div>
            <div className="flex place-content-center place-items-center justify-between gap-2">
              <input
                value={passwords.newPassword}
                onChange={(e) => {
                  setPasswords({ ...passwords, newPassword: e.target.value });
                }}
                placeholder="new password"
                className="rounded-xl bg-zinc-300 p-2 text-zinc-900"
                type={"text"}
              />
              {passwords.newPassword !== "" &&
                passwords.newPassword === passwords.newPasswordCheck && (
                  <FaCheck className="fill-emerald-500 text-xl" />
                )}
            </div>
            <div className="flex place-content-center place-items-center justify-between gap-2">
              <input
                value={passwords.newPasswordCheck}
                onChange={(e) => {
                  setPasswords({
                    ...passwords,
                    newPasswordCheck: e.target.value,
                  });
                }}
                placeholder="new password"
                className="rounded-xl bg-zinc-300 p-2 text-zinc-900"
                type={"text"}
              />
              {passwords.newPassword !== "" &&
                passwords.newPassword === passwords.newPasswordCheck && (
                  <FaCheck className="fill-emerald-500 text-xl" />
                )}
            </div>
            <button
              className="w-[80%] place-self-center rounded-xl bg-teal-200 p-2"
              type="submit"
            >
              Change Now
            </button>
          </form>
          {res && res}
        </div>
      )}
    </>
  );
};

export default ChangePassword;
