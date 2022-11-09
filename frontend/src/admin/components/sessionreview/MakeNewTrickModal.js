import React, { useState } from "react";
import { useGetTrickParts } from "../../../api/useGetTricks";
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
	const name = useTrickMakerStore((s) => s.name);
	const takeoffStance = useTrickMakerStore((s) => s.takeoffStance);
	const landingStance = useTrickMakerStore((s) => s.landingStance);
	const base_id = useTrickMakerStore((s) => s.base_id);
	const variationsArr = useTrickMakerStore((s) => s.variationsArr);
	const setTrickType = useTrickMakerStore((s) => s.setTrickType);
	const setName = useTrickMakerStore((s) => s.setName);

	const setBase_id = useTrickMakerStore((s) => s.setBase_id);
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
	console.log(bases, stances, variations);
	return trickMakerOpen ? (
		<div className='z-100 absolute top-[5vh] left-[15vw] h-[80vh] w-[70vw] rounded-xl bg-zinc-800 font-inter'>
			<MdClose
				className={`absolute top-2 right-2 text-5xl text-zinc-300`}
				onClick={() => setTrickMakerOpen()}
			/>
			<MdSave
				className={`absolute top-[10vh] right-2 text-5xl text-zinc-300`}
			/>
			<div className='flex w-full place-content-center '>
				<input
					type={"text"}
					value={name}
					className=' bg-transparent text-center font-titan text-3xl text-zinc-300'
				/>
			</div>
			<div className='m-2 flex flex-col items-center gap-4 text-3xl text-zinc-300'>
				<div className='flex items-center gap-2 rounded-md border-2 border-zinc-700'>
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
				<div className='flex gap-2 text-base text-zinc-800'>
					<div className='rounded-md bg-indigo-300 p-1'>
						{bases?.map((base) => (
							<p
								onClick={() => setBase_id(base.name)}
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
					<div className='columns-3 rounded-md bg-teal-300 p-1'>
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
	return (
		<div className='mt-2 first:mt-0'>
			{choosingStance && (
				<div className='flex gap-2 p-1'>
					<div
						className='rounded-md bg-zinc-800 bg-opacity-20 p-1'
						onClick={() => {
							setTakeoffStance(stance.name);
							setChoosingStance(false);
						}}>
						Takeoff
					</div>
					<div
						className='rounded-md bg-zinc-800 bg-opacity-20 p-1'
						onClick={() => {
							setLandingStance(stance.name);
							setChoosingStance(false);
						}}>
						Landing
					</div>
				</div>
			)}
			<p
				onClick={() => setChoosingStance(true)}
				className=' rounded-md bg-zinc-800 bg-opacity-20 p-1'>
				{stance.name}
			</p>
		</div>
	);
};
