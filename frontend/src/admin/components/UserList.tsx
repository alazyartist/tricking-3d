import React, { useEffect } from "react";
import useGetAllUsers from "../../api/useGetAllUsers";
import { MdCheckCircle } from "../../data/icons/MdIcons";
import MakeTrickedexUser from "./MakeTrickedexUser";
import * as d3 from "d3";

const UserList = () => {
  const { data: allUsers } = useGetAllUsers();
  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);
  const newUserColor = d3.interpolateRainbow(
    (allUsers.length % 15) / allUsers.length + 1
  );
  return (
    <>
      <div className="no-scrollbar  w-full p-4">
        <div>UserList</div>
        <div className="no-scrollbar flex h-[40vh] w-full flex-col gap-2 overflow-scroll rounded-md bg-zinc-900 bg-opacity-70 p-2">
          {Array.isArray(allUsers) &&
            allUsers?.map((user, i) => (
              <div
                key={user.uuid}
                className="grid w-full grid-cols-[26px_min(80px)_1fr_1fr] gap-2 whitespace-nowrap text-[10px] odd:bg-zinc-600 odd:bg-opacity-30"
              >
                <div
                  style={{
                    backgroundColor: d3.interpolateRainbow(
                      (i % 15) / allUsers.length
                    ),
                  }}
                  className={`relative my-1 ml-1 h-5 w-5 rounded-full`}
                >
                  <img
                    src={
                      !user.profilePic
                        ? `/images/noimg.jpeg`
                        : `/images/${user.uuid}/${user.profilePic}`
                    }
                    alt={"profilePic"}
                    className={`h-5 w-5 rounded-full ${
                      !user.profilePic ? " mix-blend-multiply contrast-150" : ""
                    }`}
                  />
                </div>
                <div className="flex w-full place-content-start  place-items-center gap-2 ">
                  {user.isAdmin && (
                    <MdCheckCircle className="text-sm text-emerald-500" />
                  )}
                  {user.username}
                </div>
                <div className="flex place-items-center">
                  {user.first_name} {user.last_name}
                </div>
                <div className="flex place-items-center">{user.email}</div>
              </div>
            ))}
        </div>
      </div>
      <MakeTrickedexUser userColor={newUserColor} />
    </>
  );
};

export default UserList;
