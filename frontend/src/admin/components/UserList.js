import React, { useEffect } from "react";
import useGetAllUsers from "../../api/useGetAllUsers";

const UserList = () => {
	const { data: allUsers } = useGetAllUsers();
	useEffect(() => {
		console.log(allUsers);
	}, [allUsers]);
	return (
		<div className='h-[20vh] w-full overflow-scroll'>
			<div>UserList</div>
			<div className='flex flex-col gap-2 p-2'>
				{Array.isArray(allUsers) &&
					allUsers?.map((user) => (
						<div className='flex gap-2'>
							<div className='text-sm'>{user.username}</div>
							<div className='text-sm'>{user.first_name}</div>
							<div className='text-sm'>{user.last_name}</div>
							<div className='text-sm'>{user.email}</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default UserList;
