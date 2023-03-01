import React, { useState } from "react";
import { trpc } from "utils/trpc";
interface UserShape {
  instaName: string;
  firstName: string;
  lastName: string;
}
const MakeTrickedexUser: React.FC = () => {
  const [newUser, setNewUser] = useState<UserShape>({
    instaName: "",
    firstName: "",
    lastName: "",
  });

  const { mutateAsync: createTempUser } =
    trpc.userDB.createTempUser.useMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    createTempUser({
      email: `${newUser.instaName}@trickedex.app`,
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      username: newUser.instaName,
    });
  };
  const isDisabled =
    newUser.instaName === "" ||
    newUser.firstName === "" ||
    newUser.lastName === "";
  return (
    <div className="w-full rounded-md p-4">
      <div className="rounded-md bg-zinc-900 bg-opacity-70 p-4">
        MakeTrickedexUser
      </div>
      <form onSubmit={handleSubmit} className="p-2">
        <label className="flex flex-col text-xs" htmlFor="instaName">
          {"InstaName"}
          <input
            placeholder=""
            onChange={(e) =>
              setNewUser((prev: UserShape) => ({
                ...prev,
                instaName: e.target.value,
              }))
            }
            className="rounded-md bg-zinc-800 p-2 text-base text-zinc-300"
            id="instaName"
            type="text"
          />
        </label>
        <label className="flex flex-col text-xs" htmlFor="firstName">
          {"Name"}
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="first"
              onChange={(e) =>
                setNewUser((prev: UserShape) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              className="appearance-none rounded-md bg-zinc-800 p-2 text-base text-zinc-300"
              id="firstName"
              type="text"
            />

            <input
              placeholder="last"
              onChange={(e) =>
                setNewUser((prev: UserShape) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              className="appearance-none rounded-md bg-zinc-800 p-2 text-base text-zinc-300"
              id="lastName"
              type="text"
            />
          </div>
        </label>
        <button
          disabled={isDisabled}
          className={`rounded-md ${
            isDisabled ? "bg-zinc-600" : "bg-sky-600"
          } px-2 text-zinc-300`}
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col">
        <p>{newUser.instaName + "@trickedex.app"}</p>
        <p>{newUser.firstName + " " + newUser.lastName}</p>
      </div>
    </div>
  );
};

export default MakeTrickedexUser;
