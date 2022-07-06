import React, { useEffect, useState } from "react";
import { apiPrivate } from "../../../api/api";
import { useUserStore } from "../../../store/userStore";

const Captures = () => {
	const [data, setData] = useState("Awaiting Data");
	const activeUser = useUserStore();
	console.log(activeUser.accessToken);
	const getData = async () => {
		apiPrivate
			.get(
				"/capture/",
				{
					accessToken: activeUser.accessToken,
				},
				{
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				}
			)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getData();
		console.log(data[0]);
	}, []);

	return (
		<>
			<div>Captures</div>
			<div onClick={() => getData()}>GetData</div>
			<div>
				{Object.keys(data).map((key) => (
					<div className='flex gap-3'>
						{Object.keys(data[key]).map((dk) => (
							<div>{dk + ":" + data[key][dk]}</div>
						))}
					</div>
				))}
			</div>
		</>
	);
};

export default Captures;
