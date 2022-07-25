import React, { useEffect, useState } from "react";
import useApiCreds from "../../hooks/useApiCreds";

const UserProfilePicById = ({ id }) => {
	const api = useApiCreds();
	const [data, setData] = useState({ profilePic: "noimg.jpeg" });

	const getData = async () => {
		const response = await api
			.post("/user/getInfoById", {
				id: id,
			})
			.then((info) => {
				setData(info.data[0]);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getData();
	}, []);
	const { profilePic, uuid } = data;
	return (
		<div className=' h-2 w-5'>
			{!!uuid && (
				<img
					className='h-5 w-5 rounded-full'
					src={
						profilePic !== null
							? `/images/${uuid}/${profilePic}`
							: `/images/noimg.jpeg`
					}
				/>
			)}
		</div>
	);
};

export default UserProfilePicById;
