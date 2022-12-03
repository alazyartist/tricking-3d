import * as React from "react";

const RotationsSVG = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1026.8161367195285 352.68253968253964'
			width={1026.8161367195285}
			height={352.68253968253964}
			// onClick={handleNav}
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
				width={1026.8161367195285}
				height={352.68253968253964}
				fill='transparent'
			/> */}
			<g
				strokeLinecap='round'
				transform='translate(419.605204683803 252.75) rotate(0 71.97293814432987 44.34126984126982)'>
				<path
					d='M-1.78 -1.6 C37.79 -1.66, 69.34 -3.12, 146.74 2.1 M0.81 1.9 C34.6 0.26, 71.71 1.44, 142.28 0.59 M143.71 0.64 C142.41 20, 145.08 39.62, 145.55 86.43 M145.85 0.39 C143.79 20.56, 144.93 43.25, 145.21 87.78 M143.8 87.81 C89.15 89.02, 41.9 87.42, 1.74 89.59 M143.91 87.99 C109.08 90.43, 74.66 88.3, 0.87 90.3 M-3.1 87.89 C0.64 60.14, 0.07 37.04, 2.91 -2.17 M1.87 87.78 C0.7 57.26, -2.02 27.35, -1.07 -0.88'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(450.105204683803 286) rotate(0 48.5 12.5)'>
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
					{"Rotations"}
				</text>
			</g>
		</svg>
	);
};

export default RotationsSVG;
