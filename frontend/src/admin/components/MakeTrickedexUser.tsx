import React, { useEffect, useState } from "react";
import { trpc } from "utils/trpc";
interface UserShape {
  instaName: string;
  firstName: string;
  lastName: string;
}
const MakeTrickedexUser: React.FC<{ userColor: string }> = ({ userColor }) => {
  const [newUser, setNewUser] = useState<UserShape>({
    instaName: "",
    firstName: "",
    lastName: "",
  });

  const { mutateAsync: createTempUser, isSuccess } =
    trpc.userDB.createTempUser.useMutation();
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);
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
  const infoVisible =
    newUser.instaName === "" &&
    newUser.firstName === "" &&
    newUser.lastName === "";
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col place-items-center rounded-md p-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-md z-[5] flex w-full place-content-start rounded-md bg-zinc-900 bg-opacity-70 p-4"
      >
        Make Trickedex User
      </button>
      {open && (
        <>
          <div className="absolute top-0 left-0 h-screen w-screen bg-zinc-900 bg-opacity-30 backdrop-blur-md"></div>
          <form
            onSubmit={handleSubmit}
            className="z-[5] w-[95%] bg-zinc-900 bg-opacity-40 p-4"
          >
            <label className="flex flex-col text-xs" htmlFor="instaName">
              {"Instagram Handle"}
              <input
                placeholder="@username"
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
            <div className="flex w-full place-content-end p-2 px-4">
              <button
                disabled={isDisabled}
                className={`rounded-md ${
                  isDisabled ? "bg-zinc-600" : "bg-sky-600"
                } px-2 text-zinc-300`}
              >
                Make Tricker
              </button>
            </div>
          </form>
          <div className="absolute top-60 left-[10%] flex w-[80%] flex-col place-items-center rounded-md bg-zinc-900 p-8">
            <div
              style={{ backgroundColor: userColor }}
              className="absolute top-4 left-4 h-4 w-4 rounded-md"
            ></div>
            {infoVisible ? (
              <p>Add User Details Below</p>
            ) : (
              <>
                <p>{newUser.instaName + "@trickedex.app"}</p>
                <p>{newUser.firstName + " " + newUser.lastName}</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MakeTrickedexUser;
