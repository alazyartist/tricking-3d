import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";
import UserCard from "./UserCard";

const Captures = () => {
	const [data, setData] = useState();
	const activeUser = useUserStore();
	const apiPrivate = useApiCreds();
	// console.log(activeUser.userInfo.id);
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
		// console.log(data);
	}, []);

	return (
		<div className='flex flex-col place-items-center font-inter'>
			<div className='text-xl'>Captures</div>
			<div onClick={() => getData()}>GetData</div>
			<div>
				{!!data &&
					Object.keys(data).map((key) => (
						<div key={`${data[key].username}`} className='flex flex-col gap-3'>
							<CapturedCard
								name={data[key].first_name + " " + data[key].last_name}
								src={
									data[key].uuid
										? `./images/${data[key].profilePic}`
										: `./images/noimg.jpeg`
								}
								username={`${data[key].username}`}
							/>
							{/* {Object.keys(data[key]).map((dk) => (
								<>
									<div>{dk + ":" + data[key][dk]}</div>
								</>
							))} */}
						</div>
					))}
			</div>
		</div>
	);
};

export default Captures;
