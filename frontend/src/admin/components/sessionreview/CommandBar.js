import React, { Fragment, useEffect, useRef, createElement } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import { createRoot } from "react-dom/client";
import "@algolia/autocomplete-theme-classic";
import "../../../autocomplete.css";

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
	const commandBarRef = useRef(null);
	const panelRootRef = useRef(null);
	const rootRef = useRef(null);
	const handleSlash = (e) => {
		if (!commandBarRef.current) {
			return;
		}
		if (e.key !== "/" || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
			return;
		// if (/^(?:input|textarea|select|button)$/i.test(e.target.tagName)) return;
		e.preventDefault();
		document.querySelector(".aa-Input").focus();
	};
	useEffect(() => {
		document.addEventListener("keyup", (e) => handleSlash(e));
		return () => document.removeEventListener("keyup", (e) => handleSlash(e));
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
									placeholder: "press h to hideDetails",
									onSelect: (params) => {
										console.log(query);
										console.log(params);
										console.log("Hiding Details");
									},
								},
								{
									label: "/p",
									placeholder: "press p to play",
									onSelect: (params) => {
										console.log(query);
										console.log("Playing");
										console.log(params);
									},
								},
								{
									label: "/v",
									placeholder: "press v to select vid",
									onSelect: (params) => {
										console.log("selectVideo");
										document.getElementById("video").focus();
									},
								},
							].filter((i) => pattern.test(i.label));
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
