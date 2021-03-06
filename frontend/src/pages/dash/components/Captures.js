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
	const getData = () => {
		if (activeUser.userInfo.id) {
			apiPrivate
				.put("/capture/", {
					id: activeUser.userInfo.id,
					accessToken: activeUser.accessToken,
				})
				.then((res) => {
					console.log(res.data);
					console.log(res.data.Captured);
					setData(res.data.Captured);
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		if (activeUser.accessToken !== null) {
			getData();
		}
		// console.log(data);
	}, []);

	return (
		<div className='flex flex-col place-items-center font-inter'>
			<div onClick={() => getData()}>Your Captures</div>
			<div>
				{!!data &&
					Object.keys(data).map((key) => (
						<div key={`${data[key].username}`} className='flex flex-col gap-3'>
							<CapturedCard
								name={data[key].first_name + " " + data[key].last_name}
								src={
									data[key].profilePic
										? `./images/${data[key].uuid}/${data[key].profilePic}`
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
