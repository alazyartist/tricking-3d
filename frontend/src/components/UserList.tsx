import useGetAllUsers from "api/useGetAllUsers";
import Link from "next/link";
import React from "react";

const UserList = () => {
  const { data: users } = useGetAllUsers();
  console.log(users);
  return (
    <div className="flex flex-col gap-2">
      <div>UserList</div>
      <div className="flex flex-col gap-2">
        {users &&
          users.map((user) => (
            <Link
              href={`/userProfile/${user.uuid}`}
              className="flex justify-between rounded-md bg-zinc-800 p-1"
            >
              <div className="rounded-md bg-zinc-800 p-1">{user.username}</div>
              <div className="rounded-md bg-zinc-800 p-1">
                {user?.SessionSummaries?.length}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserList;
