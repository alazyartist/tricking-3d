import React, { useEffect } from "react";
import useGetAllUsers from "../../api/useGetAllUsers";

const UserList = () => {
	const { data: allUsers } = useGetAllUsers();
	useEffect(() => {
		console.log(allUsers);
	}, [allUsers]);
	return (
		<div className='no-scrollbar h-[40vh] w-[80vw] p-4'>
			<div>UserList</div>
			<div className='no-scrollbar flex w-full flex-col gap-2 overflow-scroll p-2'>
				{Array.isArray(allUsers) &&
					allUsers?.map((user) => (
						<div
							key={user.uuid}
							className='flex w-full flex-shrink-0 gap-2 whitespace-nowrap text-xs odd:bg-zinc-700'>
							<div className='w-1/3 '>{user.username}</div>
							<div className='w-1/3'>
								{user.first_name} {user.last_name}
							</div>
							<div className='w-1/3'>{user.email}</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default UserList;
