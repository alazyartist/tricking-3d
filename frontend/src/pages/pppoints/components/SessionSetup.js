import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import useGetAllUsers from "../../../api/useGetAllUsers";
import DurationSetup from "../sessionSetup/DurationSetup";

const SessionSetup = ({ setSetupVisible, ably }) => {
	const [sessionTimer, setSessionTimer] = useState(60);
	const [team1, setTeam1] = useState([]);
	const [team2, setTeam2] = useState([]);
	const [availableUsers, setAvailableUsers] = useState([]);
	const [activeTeam, setActiveTeam] = useState("Team1");
	//team1 = 1 or more users
	//team2 =[uuid,uuid2...]
	const liveSessionsChannel = ably.channels.get(`LiveSessions`);
	const { data: users } = useGetAllUsers();
	const createSession = () => {
		let sessionId = uuidv4();
		console.log(sessionId);
		const sessionChannel = ably.channels.get(`${sessionId}`);
		liveSessionsChannel.publish("newSession", {
			team1: team1,
			team2: team2,
			session: sessionId,
			duration: sessionTimer,
		});
		//make uuid
		//get feed channel for uuid
		//return channel
	};
	useEffect(() => {
		if (team1.length > 0 || team2.length > 0) {
			setAvailableUsers(
				users?.filter((user) => {
					let teams = [...team1, ...team2];
					return !teams.includes(user);
				})
			);
		} else {
			setAvailableUsers(users);
		}
	}, [users, team1, team2]);
	useEffect(() => {
		console.log(users);
		console.log(team1);
		console.log(team2);
	}, [users]);
	return (
		<>
			<MdClose
				onClick={() => setSetupVisible(false)}
				className='absolute top-2 right-2 text-2xl'
			/>
			<div className='text-2xl'>SetupSession </div>
			<div className='w-full place-self-start p-2'>
				<div className='flex flex-col gap-2'>
					<div className='flex place-content-center gap-3'>
						<div className='h-20 w-1/2 text-center'>
							<h1
								className={`font-bold ${
									activeTeam === "Team1" ? "text-teal-500" : "text-zinc-300"
								}`}
								onClick={() => setActiveTeam("Team1")}>
								Team1
							</h1>
							{team1?.map((member) => (
								<div
									onClick={() =>
										setTeam1((prevTeam) => {
											console.log(member);
											return prevTeam.filter((mem) => mem !== member);
										})
									}>
									{member?.username}
								</div>
							))}
						</div>
						<div className='h-20 w-1/2 text-center'>
							<h1
								className={`font-bold ${
									activeTeam === "Team2" ? "text-teal-500" : "text-zinc-300"
								}`}
								onClick={() => setActiveTeam("Team2")}>
								Team2
							</h1>
							{team2.map((member, index) => (
								<div
									onClick={() =>
										setTeam2((prevTeam) => {
											console.log(member);
											return prevTeam.filter((mem) => mem !== member);
										})
									}>
									{member?.username}
								</div>
							))}
						</div>
					</div>
					<div className='w-full text-center'>Competitors</div>
					<div className='w-full text-center text-sm'>Add Competitors</div>
					<div className='flex w-full place-content-center gap-2'>
						{availableUsers?.map((user) => (
							<div
								onClick={() =>
									activeTeam === "Team1"
										? setTeam1([...team1, user])
										: setTeam2([...team2, user])
								}
								className='flex flex-col place-items-center'>
								<div className='h-10 w-10 rounded-full bg-red-500' />
								<div>{user?.username}</div>
							</div>
						))}
					</div>
				</div>
				<DurationSetup
					setSessionTimer={setSessionTimer}
					sessionTimer={sessionTimer}
				/>
			</div>
			<div
				onClick={() => createSession()}
				className='absolute bottom-5 w-full bg-emerald-500 p-2 text-center font-bold text-zinc-900'>
				Create
			</div>
		</>
	);
};

export default SessionSetup;
