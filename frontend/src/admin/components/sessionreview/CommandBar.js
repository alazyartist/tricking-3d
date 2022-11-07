import React, {
	Fragment,
	useEffect,
	useRef,
	createElement,
	useState,
	useCallback,
} from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import { createRoot } from "react-dom/client";
import "@algolia/autocomplete-theme-classic";
import "../../../autocomplete.css";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import useGetTricks from "../../../api/useGetTricks";

const CommandBar = () => {
	return (
		<div className='absolute bottom-[0vh] left-[20vw] h-[8vh] rounded-md rounded-b-none bg-zinc-900 p-2 font-titan text-zinc-400 sm:w-[60vw] md:left-[40vw] md:w-[20vw]'>
			<Autocomplete
				defaultActiveItemId='0'
				placeholder='/p to play'
				openOnFocus={true}
				autoFocus={true}
			/>
		</div>
	);
};
const getQueryPattern = (query, flags = "i") => {
	const pattern = new RegExp(
		`(${query
			.trim()
			.toLowerCase()
			.split(" ")
			.map((token) => `${token}`)
			.join("|")})`,
		flags
	);
	return pattern;
};
const Autocomplete = (props) => {
	const sessionSources = useSessionSummariesStore((s) => s.sessionSources);
	const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
	const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);
	const currentTime = useSessionSummariesStore((s) => s.currentTime);
	const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
	const setActiveClipData = useSessionSummariesStore((s) => s.setClipData);
	const activeClipData = useSessionSummariesStore((s) => s.clipData);
	const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
	const setVidIsPlaying = useSessionSummariesStore((s) => s.setVidIsPlaying);
	const { data: tricks } = useGetTricks();
	const setDetailsVisible = useSessionSummariesStore(
		(s) => s.setDetailsVisible
	);
	const setClipDetailsVisible = useSessionSummariesStore(
		(s) => s.setClipDetailsVisible
	);
	const timeRef = useRef(currentTime);
	const commandBarRef = useRef(null);
	const panelRootRef = useRef(null);
	const rootRef = useRef(null);
	const [count, setCount] = useState(0);

	const syncTime = useCallback(
		(time) => {
			setCurrentTime(time);
			timeRef.current = time;
		},
		[currentTime]
	);
	const handleSlash = (e) => {
		if (!commandBarRef.current) {
			return;
		}
		if (e.key !== "/" || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
			return;
		e.preventDefault();
		document.querySelector(".aa-Input").focus();
	};
	const handleSource = (e) => {
		if (!commandBarRef.current) {
			return;
		}
		if (
			!["0", "-", "=", "k", "j", "l"].includes(e.key) ||
			e.ctrlKey ||
			e.shiftKey ||
			e.altKey ||
			e.metaKey
		) {
			return;
		}
		if (e.key === "0") {
			e.preventDefault();
			setCount(0);
			// setVidsrc(sessionSources[0]?.vidsrc);
		}

		if (e.key === "-") {
			e.preventDefault();
			setCount((count) => (count > 0 ? count - 1 : 0));
		}

		if (e.key === "=") {
			e.preventDefault();
			setCount((count) => count + 1);
		}
		if (e.key === "k") {
			e.preventDefault();
			setVidIsPlaying();
		}
		if (e.key === "j") {
			e.preventDefault();
			setSeekTime(parseInt(currentTime) - 5);
			syncTime(parseInt(currentTime) - 5);
		}
		if (e.key === "l") {
			e.preventDefault();
			setSeekTime(parseInt(currentTime) + 5);
			syncTime(parseInt(currentTime) + 5);
		}
	};
	useEffect(() => {
		setVidsrc(sessionSources[count % sessionSources?.length]?.vidsrc);
	}, [count]);
	useEffect(() => {
		document.addEventListener("keyup", (e) => handleSlash(e));
		return () => document.removeEventListener("keyup", (e) => handleSlash(e));
	}, []);
	useEffect(() => {
		document.addEventListener("keyup", (e) => handleSource(e));
		return () => document.removeEventListener("keyup", (e) => handleSource(e));
	}, []);

	useEffect(() => {
		if (!commandBarRef.current) {
			return undefined;
		}

		const search = autocomplete(
			{
				detachedMediaQuery: "none",
				// detachedMediaQuery: "",
				container: commandBarRef.current,
				renderer: { createElement, Fragment, render: () => {} },
				render({ children }, root) {
					if (!panelRootRef.current || rootRef.current !== root) {
						rootRef.current = root;

						panelRootRef.current?.unmount();
						panelRootRef.current = createRoot(root);
					}
					panelRootRef.current.render(children);
				},
				getSources: ({ query }) => [
					{
						sourceId: "actions",
						templates: {
							item({ item }) {
								return (
									<p>
										{item?.label} {item.placeholder}
									</p>
								);
							},
						},
						onSelect(params) {
							const { item, setQuery } = params;
							item.onSelect(params);
							setQuery("");
						},
						getItems() {
							const pattern = getQueryPattern(query);
							return [
								{
									label: "/h",
									placeholder: " or press h to hideDetails",
									onSelect: (params) => {
										setDetailsVisible();
									},
								},
								{
									label: "/ha",
									placeholder: " hide ActiveClip Detials",
									onSelect: (params) => {
										setClipDetailsVisible();
									},
								},
								{
									label: "/p",
									placeholder: " or press k to play/pause",
									onSelect: (params) => {
										setVidIsPlaying();
									},
								},
								{
									label: "/i",
									placeholder: " set clipStart",
									onSelect: (params) => {
										console.log(timeRef);
										setActiveClipData({
											startTime: useSessionSummariesStore
												.getState()
												.currentTime.toFixed(2),
										});
									},
								},
								{
									label: "/o",
									placeholder: " set clipStart",
									onSelect: (params) => {
										console.log(timeRef);
										setActiveClipData({
											endTime: useSessionSummariesStore
												.getState()
												.currentTime.toFixed(2),
										});
									},
								},
								{
									label: "/s",
									placeholder: "seekTo time",
									onSelect: ({ itemInputValue }) => {
										let seekTime = itemInputValue.split(" ")[1];
										let time;
										if (seekTime.includes(":")) {
											let min = seekTime.split(":")[0];
											let sec = seekTime.split(":")[1];
											time = parseInt(min) * 60 + parseInt(sec);
										} else {
											time = seekTime;
										}
										console.log(time);
										setSeekTime(time);
										// console.log("selectVideo");
										// document.getElementById("video").focus();
									},
								},
							].filter((i) => pattern.test(i.label));
						},
					},
					{
						sourceId: "Tricks",
						templates: {
							header() {
								return <p>Tricks</p>;
							},
							item({ item }) {
								return <p>{item.name}</p>;
							},
						},
						getItems: async () => {
							const pattern = getQueryPattern(query);

							return tricks.filter((t) => pattern.test(t.name));
						},
						onSelect(params) {
							const { item, setQuery } = params;
							console.log(item);
							// item.onSelect(params);
							setQuery("");
						},
					},
				],
				...props,
			},
			[]
		);

		return () => {
			search.destroy();
		};
	}, [props]);

	return (
		<>
			<div id='commandbar' ref={commandBarRef} />
		</>
	);
};
export default CommandBar;

export function ProductItem({ hit, components }) {
	return (
		<a href={hit.url} className='aa-ItemLink'>
			<div className='aa-ItemContent'>
				<div className='aa-ItemTitle'>
					<components.Highlight hit={hit} attribute='name' />
				</div>
			</div>
		</a>
	);
}
