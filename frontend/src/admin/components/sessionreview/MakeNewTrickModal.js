import React, { useEffect, useState } from "react";
import { useGetTrickParts, useSaveTrick } from "../../../api/useGetTricks";
import StanceRemap from "../../../components/info/trickInfo/StanceRemap";
import { MdClose, MdSave } from "../../../data/icons/MdIcons";
import { useTrickMakerStore } from "../trickMaker/TrickMakerStore";
import { useSessionSummariesStore } from "./SessionSummaryStore";
const details = {
	base_id: "Backflip",
	Variations: [{ name: "Fulltwist" }, { name: "hyper" }],
	name: "Cork.hyper",
	landingStance: "BacksideHyper",
	takeoffStance: "BacksideComplete",
};
const MakeNewTrickModal = () => {
	const { data: trickParts } = useGetTrickParts();
	const trickType = useTrickMakerStore((s) => s.trickType);
	const getTrickInfo = useTrickMakerStore((s) => s.getTrickInfo);
	const clearTrickInfo = useTrickMakerStore((s) => s.clearTrickInfo);
	const name = useTrickMakerStore((s) => s.name);
	const takeoffStance = useTrickMakerStore((s) => s.takeoffStance);
	const landingStance = useTrickMakerStore((s) => s.landingStance);
	const base_id = useTrickMakerStore((s) => s.base_id);
	const variationsArr = useTrickMakerStore((s) => s.variationsArr);
	const setTrickType = useTrickMakerStore((s) => s.setTrickType);
	const setName = useTrickMakerStore((s) => s.setName);

	const basePoints = useTrickMakerStore((s) => s.basePoints);
	const landingStancePoints = useTrickMakerStore((s) => s.landingStancePoints);
	const setBase_id = useTrickMakerStore((s) => s.setBase_id);
	const setBasePoints = useTrickMakerStore((s) => s.setBasePoints);
	const setVariationsArr = useTrickMakerStore((s) => s.setVariationsArr);
	const addVariation = useTrickMakerStore((s) => s.addVariation);
	const removeVariation = useTrickMakerStore((s) => s.removeVariation);
	const trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
	const setTrickMakerOpen = useSessionSummariesStore(
		(s) => s.setTrickMakerOpen
	);
	let bases = trickParts?.filter((e) => e.base_id);
	let stances = trickParts?.filter((e) => e.type === "Stance");
	let variations = trickParts?.filter((e) => e.type === "Variation");
	let trickInfo = getTrickInfo();
	const { mutate: saveTrick, data: response } = useSaveTrick();
	// console.log("re-ran", getTrickInfo());
	useEffect(() => {
		console.log(response);
		if (response?.status === 200) {
			clearTrickInfo();
			setTrickMakerOpen(false);
		}
	}, [response]);
	return trickMakerOpen ? (
		<div className='z-100 absolute top-[5vh] left-[10vw] h-[80vh] w-[80vw] rounded-xl bg-zinc-800 font-inter md:left-[15vw] md:w-[70vw]'>
			<MdClose
				className={`absolute top-2 right-2 text-2xl text-zinc-300 md:text-5xl`}
				onClick={() => setTrickMakerOpen()}
			/>
			<MdSave
				onClick={() => saveTrick(trickInfo)}
				className={`absolute top-12 right-2 text-2xl text-zinc-300 md:top-[10vh] md:text-5xl`}
			/>
			<div className='flex w-full place-content-center '>
				<input
					spellcheck='false'
					placeholder='set trick name'
					onChange={(e) => setName(e.target.value)}
					type={"text"}
					value={name}
					className=' bg-transparent text-center font-titan text-3xl text-zinc-300'
				/>
			</div>
			<div
				onClick={() =>
					trickType === "Invert" ? setTrickType("Kick") : setTrickType("Invert")
				}
				className={`relative left-[40%] w-fit rounded-md bg-zinc-700 p-1 text-xl text-zinc-300 md:absolute md:left-2 md:top-[10vh] md:text-3xl`}>
				{trickType}
			</div>
			<div className='relative left-[10%] top-[12vh]'>
				{(variationsArr.length &&
					variationsArr?.reduce((sum, b) => {
						return sum + b.pointValue;
					}, 0)) +
					landingStancePoints +
					basePoints}
			</div>
			<div className='text-md m-2 flex flex-col items-center gap-4 text-zinc-300 md:text-3xl'>
				<div className='flex min-h-[15vh] items-center gap-2 rounded-md border-2 border-zinc-700'>
					<StanceRemap trickMaker={true} stance={takeoffStance} />
					<div className='flex flex-col gap-2'>
						<div className='rounded-md border-[1px] border-zinc-400 p-1 px-4 text-center'>
							{(base_id !== name && base_id) || `Base Trick`}
						</div>
						<div className='flex flex-col'>
							{variationsArr?.map((v) => (
								<div
									onClick={() => removeVariation(v)}
									key={`${v.id}+${Math.random()}`}
									className='border-2 border-purple-400 p-1 px-4 first:rounded-t-md first:border-b-[1px] last:rounded-b-md last:border-t-[1px]'>
									{v?.name}
								</div>
							))}
						</div>
					</div>
					<StanceRemap trickMaker={true} stance={landingStance} />
				</div>
				<div className='no-scrollbar grid h-[56vh] max-w-[90vw] grid-cols-2 flex-col gap-2 overflow-hidden overflow-y-scroll rounded-md text-base text-zinc-800 md:flex-row md:overflow-visible lg:flex'>
					<div className='rounded-md bg-zinc-300 p-1'>
						{bases?.map((base) => (
							<p
								onClick={() => {
									setBase_id(base.name);
									setBasePoints(base.pointValue);
								}}
								className='mt-2 rounded-md bg-zinc-800 bg-opacity-20 p-1 first:mt-0'>
								{base.name}
							</p>
						))}
					</div>
					<div className='rounded-md  bg-emerald-300 p-1'>
						{stances?.map((stance) => (
							<ChooseStance stance={stance} />
						))}
					</div>
					<div className='col-span-2 rounded-md bg-purple-300 p-1 md:columns-3'>
						{variations
							?.sort((a, b) => {
								if (a.variationType < b.variationType) return -1;
								if (a.variationType > b.variationType) return 1;
								if (a.name < b.name) return -1;
								if (a.name > b.name) return 1;
								return 0;
							})
							?.map((variation) => (
								<div
									onClick={() => addVariation(variation)}
									className='mt-2 flex place-items-center justify-between gap-2 rounded-md bg-zinc-800 bg-opacity-20 p-1 first:mt-0'>
									<p className='w-1/3'>{variation.name}</p>
									<div className='flex w-1/3 place-items-center gap-2'>
										<p>{variation.variationType}</p>
										{variation.variationType === "Kick" && (
											<p
												className={`${
													variation.value[0] === "R"
														? "bg-zinc-400"
														: "bg-zinc-600"
												} place-self-end rounded-md bg-opacity-40 px-2 text-[8pt]`}>
												{variation.value[0]}
											</p>
										)}
									</div>
									<p className='w-1/6 text-xs'>{variation.pos}</p>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default MakeNewTrickModal;

const ChooseStance = ({ stance }) => {
	const [choosingStance, setChoosingStance] = useState(false);
	const setTakeoffStance = useTrickMakerStore((s) => s.setTakeoffStance);
	const setLandingStance = useTrickMakerStore((s) => s.setLandingStance);
	const setLandingStancePoints = useTrickMakerStore(
		(s) => s.setLandingStancePoints
	);
	return (
		<div className='mt-2 first:mt-0'>
			{choosingStance ? (
				<div className='flex gap-2'>
					<div
						className='w-1/2 rounded-md bg-zinc-800 bg-opacity-40 p-1 hover:bg-emerald-600'
						onClick={() => {
							setTakeoffStance(stance.name);
							setChoosingStance(false);
						}}>
						Takeoff
					</div>
					<div
						className='w-1/2 rounded-md bg-zinc-800 bg-opacity-40 p-1 hover:bg-emerald-600'
						onClick={() => {
							setLandingStance(stance.name);
							setLandingStancePoints(stance.pointValue);
							setChoosingStance(false);
						}}>
						Landing
					</div>
				</div>
			) : (
				<p
					onClick={() => setChoosingStance(true)}
					className=' rounded-md bg-zinc-800 bg-opacity-20 p-1'>
					{stance.name}
				</p>
			)}
		</div>
	);
};
