import React from "react";
import MakeTrickedexUser from "./MakeTrickedexUser";
import * as d3 from "d3";
import { trpc } from "@utils/trpc";

const UserList = () => {
  const { data: allUsers } = trpc.userDB.findAll.useQuery();

  const newUserColor = d3.interpolateRainbow(
    (allUsers?.length % 15) / (allUsers?.length + 1)
  );
  return (
    <>
      <div className="no-scrollbar  w-full">
        <div className="px-2">Users</div>
        <div className="no-scrollbar flex h-[75vh] w-[90vw] flex-col gap-2 overflow-scroll rounded-md bg-zinc-900 bg-opacity-70 p-2">
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
                        : `${user.profilePic}`
                    }
                    alt={"profilePic"}
                    className={`h-5 w-5 rounded-full ${
                      user.isAdmin ? "border-[1px] border-amber-500" : ""
                    } ${
                      !user.profilePic ? " mix-blend-multiply contrast-150" : ""
                    }`}
                  />
                </div>
                <div className="no-scrollbar flex w-full place-content-start place-items-center gap-2 overflow-x-scroll ">
                  {user.username}
                  {user.isAdmin && <p className="text-amber-500">&#42;</p>}
                </div>
                <div className="flex place-items-center">
                  {user.first_name} {user.last_name}
                </div>
                <div className="no-scrollbar flex place-items-center overflow-x-scroll">
                  {user.email}
                </div>
              </div>
            ))}
        </div>
      </div>
      <MakeTrickedexUser userColor={newUserColor} />
      <div className="pb-14" />
    </>
  );
};

export default UserList;
