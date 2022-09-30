import React, { useState } from "react";
import { IoIosList, IoIosPeople } from "react-icons/io";
import DataList from "./DataList";
import UserList from "./UserList";
const AdminDisplay = () => {
	const [displayItem, setItem] = useState();
	return (
		<>
			<div className='absolute left-2 top-20 z-[100] flex flex-col gap-2 text-4xl'>
				<IoIosList onClick={() => setItem("Tricks")} />
				<IoIosPeople onClick={() => setItem("Users")} />
			</div>
			<div>
				{displayItem === "Tricks" && <DataList />}
				{displayItem === "Users" && <UserList />}
			</div>
		</>
	);
};

export default AdminDisplay;
