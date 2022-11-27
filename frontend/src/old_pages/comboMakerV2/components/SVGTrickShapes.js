import React from "react";

export const TricksShape = (props) => {
	return (
		<svg
			viewBox='0 0 250 90'
			width={204.322}
			height={80.179}
			transform='translate(-10 -12)'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<defs>
				<style>
					{
						'@font-face{font-family:"Virgil";src:url(https://excalidraw.com/Virgil.woff2)}@font-face{font-family:"Cascadia";src:url(https://excalidraw.com/Cascadia.woff2)}'
					}
				</style>
			</defs>
			{/* <path fill='#fff0f6' d='M0 0h233.41v120.723H0z' /> */}
			<path
				d='M10 102.608c9.52-14.99 49.52-76.88 59.4-91.8m-54.72 88.88c9.23-14.38 44.74-70.68 53.73-85.95M223.411 105.25c-6.16-14.5-32.72-71.76-40.18-86.55m37.98 92.02c-6.24-15.29-32.87-81.2-39.04-96.49'
				stroke='#d4d4d8'
				fill='none'
				strokeLinecap='round'
			/>
			<path
				d='M65.23 14.903c18.56-.44 92.26-4.34 111.46-4.9m-113.72 2.97c19.19.06 99.43-.3 118.82.01'
				stroke='#d4d4d8'
				fill='none'
				strokeLinecap='round'
			/>
			<text
				y={12}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize={13.571}
				style={{
					whiteSpace: "pre",
				}}
				transform='translate(71.66 63.779)'>
				{props.title ?? "Tricks"}
			</text>
		</svg>
	);
};
export const SetupShape = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 181 77'
		width={181.322}
		height={77.179}
		{...props}>
		<defs>
			<style>
				{
					'@font-face{font-family:"Virgil";src:url(https://excalidraw.com/Virgil.woff2)}@font-face{font-family:"Cascadia";src:url(https://excalidraw.com/Cascadia.woff2)}'
				}
			</style>
		</defs>
		{/* <path fill='#fff0f6' d='M0 0h181.322v77.179H0z' /> */}
		<path
			d='M12.858 67.175c26.57-8.91 131.97-43.87 158.46-53.13M9.998 65.415c26.15-9.85 132.2-46.92 158.87-55.42'
			stroke='#d4d4d8'
			fill='none'
			strokeLinecap='round'
		/>
		<text
			y={12}
			fontFamily='Virgil, Segoe UI Emoji'
			fontSize={13.571}
			style={{
				whiteSpace: "pre",
			}}
			transform='translate(79.587 47.564)'>
			{props.title ?? "Setups"}
		</text>
		<path
			d='M137.23 61.974c4.9-8.3 23.9-40.06 28.94-47.4m-32.35 44.59c4.58-8.11 24.74-34.17 30.16-41.81'
			stroke='#d4d4d8'
			fill='none'
			strokeLinecap='round'
		/>
	</svg>
);

export const StanceShape = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		transform='translate(-10 -12)'
		viewBox='0 0 128 80'
		width={128.815}
		height={80.347}
		{...props}>
		<defs>
			<style>
				{
					'@font-face{font-family:"Virgil";src:url(https://excalidraw.com/Virgil.woff2)}@font-face{font-family:"Cascadia";src:url(https://excalidraw.com/Cascadia.woff2)}'
				}
			</style>
		</defs>
		{/* <path fill='#fff0f6' d='M0 0h145.815v113.347H0z' /> */}
		<path
			d='M135.816 103.35c-6.68-14.27-30.75-74.1-37.53-89.27m34.14 87.96c-7.06-14.93-28.39-77.61-34.96-92.04M12.02 16.291c14.54-.94 70.08-4.52 84.73-5.22M10 14.751c14.11-.66 69.3 1.21 84.23-.05'
			stroke='#d4d4d8'
			fill='none'
			strokeLinecap='round'
		/>
		<path
			d='M53.964 103.198c-6.66-14.92-30.56-72.86-36.84-87.79m33.12 85.32c-7.03-15.94-28.11-75.7-33.9-89.77'
			stroke='#d4d4d8'
			fill='none'
			strokeLinecap='round'
		/>
		<text
			y={12}
			fontFamily='Virgil, Segoe UI Emoji'
			fontSize={13.571}
			style={{
				whiteSpace: "pre",
			}}
			transform='translate(51.664 59.352)'>
			{props.title ?? "Stances"}
		</text>
	</svg>
);

export const TransitionShape = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={145.359}
			height={76.853}
			viewBox='0 0 145 76'
			{...props}>
			<defs>
				<style>
					{
						'@font-face{font-family:"Virgil";src:url(https://excalidraw.com/Virgil.woff2)}@font-face{font-family:"Cascadia";src:url(https://excalidraw.com/Cascadia.woff2)}'
					}
				</style>
			</defs>
			{/* <path fill="#fff0f6" d="M0 0h145.359v76.853H0z" /> */}
			<path
				d='M12.228 15.292c19.03-.5 97.48-.5 117.02-1.19m-112.66-1.19c18.51-1.49 91.65-3.02 110.14-2.91'
				stroke='#d4d4d8'
				fill='none'
				strokeLinecap='round'
			/>
			<text
				y={12}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize={13.571}
				style={{
					whiteSpace: "pre",
				}}
				transform='translate(32.154 31.532)'>
				{props.title ?? "Transitions"}
			</text>
			<path
				d='M113.104 61.374c3.75-7.95 18.38-37.24 22.25-44.75m-25.85 50.23c3.44-8.91 19.41-45.13 23.68-54.36M26.967 63.525c-2.49-7.3-12.52-38.99-15.31-46.69m11.92 45.11c-2.74-8.03-11-41.22-13.58-49.42'
				stroke='#d4d4d8'
				fill='none'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export const BaseLine = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 200 76'
			width={200}
			height={76}
			{...props}>
			<defs>
				<style>
					{
						'\r\n      @font-face {\r\n        font-family: "Virgil";\r\n        src: url("https://excalidraw.com/Virgil.woff2");\r\n      }\r\n      @font-face {\r\n        font-family: "Cascadia";\r\n        src: url("https://excalidraw.com/Cascadia.woff2");\r\n      }\r\n    '
					}
				</style>
			</defs>
			{/* <rect
				x={0}
				y={0}
				width={200}
				height={76}
				fill='transparent'
			/> */}
			<g strokeLinecap='round'>
				<g transform='translate(19.070612571354445 349.6851220510024) rotate(0 456.08471387941387 0.8317360341357478)'>
					<path
						d='M-1.05 -2.09 C150.98 -1.72, 760.59 -0.26, 913.21 0.94 M3.58 2.94 C155.23 3.76, 759.75 3.94, 911.53 3.59'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			<g strokeLinecap='round'>
				<g transform='translate(638.0706125713542 344.6851220510024) rotate(0 35.84605571266263 -63.61495593134313)'>
					<path
						d='M1.01 -1.81 C13.45 -22.61, 61.46 -105.92, 73.57 -126.86 M-1.88 3.38 C10.5 -17.97, 60.16 -108.03, 72.69 -130.61'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			<g strokeLinecap='round'>
				<g transform='translate(945.0706125713547 351.6851220510024) rotate(0 -27.360701386444248 -65.48694881476462)'>
					<path
						d='M2.5 2.34 C-7.07 -18.9, -46.26 -107.19, -56.4 -129.22 M0.41 1.13 C-9.39 -20.74, -47.18 -110.66, -57.22 -133.31'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			<g strokeLinecap='round'>
				<g transform='translate(713.0706125713542 215.6851220510024) rotate(0 86.12368501361459 -2.814465457163749)'>
					<path
						d='M2.62 1.69 C30.81 0.82, 143.53 -2.26, 171.64 -2.91 M0.6 0.14 C28.25 -0.36, 141.58 -6.17, 169.76 -7.32'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			<g transform='translate(771.0706125713542 275.6851220510024) rotate(0 30.5 12.5)'>
				<text
					x={0}
					y={18}
					fontFamily='Virgil, Segoe UI Emoji'
					fontSize='20px'
					fill='#d4d4d8'
					textAnchor='start'
					style={{
						whiteSpace: "pre",
					}}
					direction='ltr'>
					{"Tricks"}
				</text>
			</g>{" "}
		</svg>
	);
};
