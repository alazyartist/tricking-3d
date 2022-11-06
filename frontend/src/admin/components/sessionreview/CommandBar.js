import React, { Fragment, useEffect, useRef, createElement } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import { createRoot } from "react-dom/client";
import "@algolia/autocomplete-theme-classic";
import "../../../autocomplete.css";

const CommandBar = () => {
	return (
		<div className='absolute bottom-0 left-[40vw] h-[8vh] w-[20vw] rounded-md rounded-b-none bg-zinc-900 p-2 font-titan text-zinc-400'>
			<Autocomplete
				debug
				openOnFocus={true}
				getSources={({ query }) => [
					{
						sourceId: "actions",
						getItems() {
							return [{ test: 1 }, { test: 2 }];
						},
						templates: {
							item({ item, components }) {
								return <ProductItem hit={item} components={components} />;
							},
						},
					},
				]}
			/>
		</div>
	);
};

const Autocomplete = (props) => {
	const commandBarRef = useRef(null);
	const panelRootRef = useRef(null);
	const rootRef = useRef(null);

	useEffect(() => {
		if (!commandBarRef.current) {
			return undefined;
		}

		const search = autocomplete({
			placeholder: "/p to play",
			// detachedMediaQuery: "none",
			detachedMediaQuery: "",
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
			getSources: () => [
				{
					sourceId: "actions",
					templates: {
						items({ item }) {
							return <p className='text-zinc-300'>{item.command}</p>;
						},
					},
					getItems: () => [{ command: "/p", placeholder: "press p to play" }],
				},
			],
			...props,
		});

		return () => {
			search.destroy();
		};
	}, [props]);

	return (
		<div ref={panelRootRef}>
			<div ref={commandBarRef} />
		</div>
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
