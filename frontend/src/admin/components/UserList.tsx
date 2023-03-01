import React, { useEffect } from "react";
import useGetAllUsers from "../../api/useGetAllUsers";
import { MdCheckCircle } from "../../data/icons/MdIcons";
import MakeTrickedexUser from "./MakeTrickedexUser";

const UserList = () => {
  const { data: allUsers } = useGetAllUsers();
  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);
  return (
    <>
      <div className="no-scrollbar h-[40vh] w-full p-4">
        <div>UserList</div>
        <div className="no-scrollbar flex w-full flex-col gap-2 overflow-scroll rounded-md bg-zinc-900 bg-opacity-70 p-2">
          {Array.isArray(allUsers) &&
            allUsers?.map((user) => (
              <div
                key={user.uuid}
                className="grid w-full grid-cols-3 gap-2 whitespace-nowrap text-[10px] odd:bg-zinc-700"
              >
                <div className="flex w-full place-content-start  place-items-center gap-2 ">
                  {user.isAdmin && (
                    <MdCheckCircle className="text-sm text-emerald-500" />
                  )}
                  {user.username}
                </div>
                <div className="">
                  {user.first_name} {user.last_name}
                </div>
                <div className="">{user.email}</div>
              </div>
            ))}
        </div>
      </div>
      <MakeTrickedexUser />
    </>
  );
};

export default UserList;
