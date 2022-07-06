import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const Captures = () => {
	const [data, setData] = useState();
	const activeUser = useUserStore();
	const apiPrivate = useApiCreds();
	console.log(activeUser.userInfo.id);
	const getData = async () => {
		apiPrivate
			.put(
				"/capture/",
				{
					id: activeUser.userInfo.id,
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
		console.log(data);
	}, []);

	return (
		<>
			<div>Captures</div>
			<div onClick={() => getData()}>GetData</div>
			<div>
				{!!data &&
					Object.keys(data).map((key) => (
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
