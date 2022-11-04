import React, { useEffect, useState } from "react";
import { MdClose } from "../../../data/icons/MdIcons";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useBattleRoomSetup from "../../../api/useBattleRoom";
import useGetAllUsers from "../../../api/useGetAllUsers";
import { useUserStore } from "../../../store/userStore";
import DurationSetup from "../BattleroomSetup/DurationSetup";

const BattleroomSetup = ({ setSetupVisible, ably }) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const [sessionTimer, setSessionTimer] = useState(60);
	const [team1, setTeam1] = useState([]);
	const [team2, setTeam2] = useState([]);
	const [judges, setJudges] = useState([]);
	const [availableUsers, setAvailableUsers] = useState([]);
	const [activeTeam, setActiveTeam] = useState("Team1");
	const { mutate: saveSessionSetup } = useBattleRoomSetup();
	const { data: users } = useGetAllUsers();
	const nav = useNavigate();
	const createSession = () => {
		let sessionId = uuidv4();
		console.log(sessionId);
		const sessionChannel = ably.channels.get(`points:${sessionId}`);
		let newSession = {
			hostID: userInfo,
			team1: team1,
			team2: team2,
			judges: judges,
			sessionid: sessionId,
			duration: sessionTimer,
		};
		saveSessionSetup(newSession);
		sessionChannel.publish("newSession", newSession);

		setSetupVisible(false);
		setTimeout(() => {
			nav(`${sessionId}`);
		}, 69);

		//make uuid
		//get feed channel for uuid
		//return channel
	};
	const handleAdd = (user) => {
		console.log("add", activeTeam, user);
		if (activeTeam === "Team1") {
			setTeam1([...team1, user]);
		} else if (activeTeam === "Team2") {
			setTeam2([...team2, user]);
		} else if (activeTeam === "Judges") {
			setJudges([...judges, user]);
		}
	};

	useEffect(() => {
		if (team1.length > 0 || team2.length > 0 || judges.length > 0) {
			setAvailableUsers(
				users?.filter((user) => {
					let teams = [...team1, ...team2, ...judges];
					return !teams.includes(user);
				})
			);
		} else {
			setAvailableUsers(users);
		}
	}, [users, team1, team2, judges]);
	useEffect(() => {
		console.log(users);
		console.log(team1);
		console.log(team2);
		console.log(judges);
	}, [users, team1, team2, judges]);
	return (
		<>
			<MdClose
				onClick={() => setSetupVisible(false)}
				className='absolute top-2 right-2 text-2xl'
			/>
			<div className='font-titan text-2xl'>Prepare BattleRoom </div>
			<div className='w-full place-self-start p-2'>
				<div className='flex h-[90vh] flex-col gap-2'>
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
							{team2?.map((member, index) => (
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

					<div className='h-20 w-full text-center'>
						<h1
							className={`font-bold ${
								activeTeam === "Judges" ? "text-teal-500" : "text-zinc-300"
							}`}
							onClick={() => setActiveTeam("Judges")}>
							Judges
						</h1>
						{judges?.map((member, index) => (
							<div
								onClick={() =>
									setJudges((prevTeam) => {
										console.log(member);
										return prevTeam.filter((mem) => mem !== member);
									})
								}>
								{member?.username}
							</div>
						))}
					</div>
					<DurationSetup
						setSessionTimer={setSessionTimer}
						sessionTimer={sessionTimer}
					/>
					<div
						className={`flex h-full w-full place-content-start gap-2 overflow-x-auto px-4`}>
						{availableUsers?.map((user) => (
							<div
								onClick={() => handleAdd(user)}
								className='flex flex-col place-items-center'>
								<img
									className='h-10 w-10 rounded-full'
									src={
										user.profilePic !== (undefined || null)
											? `/images/${user.uuid}/${user.profilePic}`
											: "/images/noimg.jpeg"
									}
								/>
								<div
									className={`${
										user.uuid === userInfo?.uuid ? "text-emerald-500" : ""
									}`}>
									{user?.username?.slice(0, 8)}
									{user?.username?.length > 8 && "..."}
								</div>
							</div>
						))}
					</div>
				</div>
				<div
					onClick={() => createSession()}
					className='absolute bottom-5 left-0 w-full rounded-b-md bg-emerald-500 p-2 text-center font-titan text-2xl text-zinc-900'>
					CREATE
				</div>
			</div>
		</>
	);
};

export default BattleroomSetup;
