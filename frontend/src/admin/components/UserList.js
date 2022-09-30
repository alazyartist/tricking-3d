import React, { useEffect } from "react";
import useGetAllUsers from "../../api/useGetAllUsers";

const UserList = () => {
	const { data: allUsers } = useGetAllUsers();
	useEffect(() => {
		console.log(allUsers);
	}, [allUsers]);
	return (
		<div className='no-scrollbar h-[20vh] w-[80vw] overflow-scroll p-4'>
			<div>UserList</div>
			<div className='flex flex-col gap-2 p-2'>
				{Array.isArray(allUsers) &&
					allUsers?.map((user) => (
						<div className='grid grid-cols-3 gap-2 overflow-hidden text-xs odd:bg-zinc-700'>
							<div className='overflow-hidden '>{user.username}</div>
							<div className=''>
								{user.first_name} {user.last_name}
							</div>
							<div className=''>{user.email}</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default UserList;
