import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useSubmitSessionForReview } from "../../api/useSessionSummaries";
import { v4 as uuidv4 } from "uuid";
import { MdCheckCircle } from "../../data/icons/MdIcons";
import { Link, useNavigate } from "react-router-dom";
import PaymentEmbed from "../../admin/components/payments/PaymentEmbed";
const whatsToday = () => {
	let today = new Date(Date.now());
	return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${(
		"0" + today.getDate()
	).slice(-2)}`;
};
const AddSessionPage = () => {
	let todaytime = new Date(Date.now()).toISOString().slice(-13, -8);

	const { mutateAsync: submitSession, data: response } =
		useSubmitSessionForReview();
	const { uuid: user_id, SessionReviewCredits } = useUserStore(
		(s) => s.userInfo
	);
	const userInfo = useUserStore((s) => s.userInfo);
	console.log(userInfo);
	const [submitSuccess, setSubmitSucces] = useState(false);
	const [formData, setFormData] = useState({
		sessionDate: whatsToday(),
		url: {},
		user_id: user_id,
		sessionid: uuidv4(),
	});

	const onSubmit = (e) => {
		e.preventDefault();
		submitSession(formData);
		console.log("submitting", formData);
	};
	useEffect(() => {
		if (response?.data?.message === "Submitted") {
			setSubmitSucces(true);
		}
	}, [response]);
	const [count, setCount] = useState(1);
	let isEnabled =
		(formData.startTime &&
			formData.endTime &&
			formData.sessionDate &&
			formData.sessionid &&
			formData.url[0] &&
			true) ||
		false;
	console.log(isEnabled);
	return (
		<div className='mt-14 flex h-[80vh] flex-col items-center text-zinc-300'>
			{submitSuccess ? (
				<SessionSubmitted SessionReviewCredits={SessionReviewCredits} />
			) : (
				<>
					<div className='p-2 text-center font-titan text-2xl'>
						Submit Session
					</div>
					<div className='text-zinc-300'>Credits:{SessionReviewCredits}</div>
					<form
						onSubmit={onSubmit}
						className='flex w-[80vw] flex-col gap-2 rounded-md bg-zinc-700 p-3'>
						<input
							onChange={(e) =>
								setFormData((s) => ({ ...s, name: e.target.value }))
							}
							id='name'
							type='text'
							className='rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'
							placeholder='Session Name'
						/>
						<input
							onChange={(e) =>
								setFormData((s) => ({ ...s, sessionDate: e.target.value }))
							}
							id='date'
							type='date'
							value={whatsToday()}
							className='rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'
						/>
						<div className='flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80'>
							<label className='w-1/6 pl-2' htmlFor='startTime'>
								Start
							</label>
							<input
								onChange={(e) =>
									setFormData((s) => ({ ...s, startTime: e.target.value }))
								}
								id='startTime'
								step={"00:15"}
								className='w-full select-none place-self-end bg-transparent p-1 text-zinc-300  '
								type='time'
								value={formData.startTime}
							/>
						</div>
						<div className='flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80'>
							<label className='w-1/6 pl-2' htmlFor='endTime'>
								End
							</label>
							<input
								onChange={(e) =>
									setFormData((s) => ({ ...s, endTime: e.target.value }))
								}
								id='endTime'
								step={"00:15"}
								className='w-full select-none place-self-end bg-transparent p-1 text-zinc-300  '
								type='time'
								value={formData.endTime}
							/>
						</div>
						{Array.from(Array(count).keys()).map((i) => (
							<div className='flex w-full gap-2 rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300'>
								<input
									onChange={(e) =>
										setFormData((s) => ({
											...s,
											url: { ...s.url, [i]: e.target.value },
										}))
									}
									id={`url${i}`}
									className='w-full bg-transparent p-1 text-zinc-300'
									type='url'
									value={formData.url[i]}
									placeholder={`https://your-video.com/goes-here${i}`}
								/>
								{i > 0 && (
									<span
										className='text-2xl leading-none text-red-500'
										onClick={() => setCount((c) => c - 1)}>
										-
									</span>
								)}
							</div>
						))}
						<span
							onClick={() => setCount((c) => c + 1)}
							className='flex place-items-center gap-2 font-titan'>
							<span>Add Another URL Source</span>
							<span className='text-2xl leading-none text-emerald-500'>+</span>
						</span>

						<button
							type='submit'
							value='Submit'
							disabled={isEnabled === false ? true : false}
							className={`rounded-lg ${
								isEnabled ? "bg-emerald-500" : "bg-zinc-800 text-zinc-600"
							} p-2`}>
							Start Processing
						</button>
					</form>
					<div className='flex flex-col place-items-center gap-2'>
						<div>{response?.data?.message}</div>
						{(response?.data?.message === "Out of Credits" ||
							SessionReviewCredits === 0) && <OutOfCredits />}
					</div>
				</>
			)}
		</div>
	);
};

export default AddSessionPage;

const SessionSubmitted = ({ SessionReviewCredits }) => {
	return (
		<div className='flex h-full flex-col place-content-center place-items-center gap-2 font-titan'>
			<div className='text-center text-3xl'>Your Session was Submitted</div>
			<MdCheckCircle className={"text-8xl text-emerald-500"} />
			<div className='text-center text-3xl'>
				Please check back later for the Summary
			</div>
			<div>You have {SessionReviewCredits - 1} left</div>
			<Link to={"/home"} className={"rounded-md bg-zinc-700 p-1"}>
				Home
			</Link>
		</div>
	);
};

const OutOfCredits = () => {
	const [showForm, setShowForm] = useState(false);
	const [creditAmount, setcreditAmount] = useState(1);

	return (
		<>
			{/* <a
				//testlink
				href='https://buy.stripe.com/test_bIY7w414l3OG2QM5kk'
				// production linkhref='https://buy.stripe.com/bIYdTd7yO57g2ly5kk'
				className=' rounded-md bg-emerald-300 p-2 font-inter text-zinc-800'>
				Add Credits
			</a> */}
			<div className='flex place-content-center place-items-center gap-4 text-center font-inter text-4xl'>
				<div
					className='flex h-10 w-10 place-content-center place-items-center rounded-full bg-zinc-200 bg-opacity-10'
					onClick={() => setcreditAmount((ca) => ca - 1)}>
					-
				</div>
				{(creditAmount > 0 ? creditAmount : 1) * 5}$
				<div
					className='flex h-10 w-10 place-content-center place-items-center rounded-full bg-zinc-200 bg-opacity-10'
					onClick={() => setcreditAmount((ca) => ca + 1)}>
					+
				</div>
			</div>
			<button
				type='button'
				onClick={() => setShowForm(true)}
				className='w-[200px] rounded-md bg-emerald-500 py-2 text-3xl'
				id='submit'>
				Add Credits
			</button>
			{showForm && (
				<div className='absolute top-[0vh] left-[0vw] z-[1290] h-[100vh] w-[100vw] rounded-md bg-zinc-900 bg-opacity-40 p-8 backdrop-blur-md'>
					<PaymentEmbed creditAmount={creditAmount} setShowForm={setShowForm} />
				</div>
			)}
		</>
	);
};
