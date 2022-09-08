import * as React from "react";

const GrabsSVG = (props) => {
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
				transform='translate(748.355204683803 254) rotate(0 57.59793814432987 44.34126984126982)'>
				<path
					d='M0.93 -1.87 C29.48 -4.4, 56.08 -0.29, 116.55 1.45 M0.7 -0.03 C42.94 3.04, 84.39 3.6, 115.55 0.4 M111.46 2.12 C110.51 27.29, 114.35 45.66, 114.65 85.12 M113.73 1.67 C115.59 26.32, 115.35 53.82, 117.08 87.94 M115.2 86.62 C80.01 92.9, 55.15 89.25, 2.37 85.55 M113.79 87.27 C81.96 86.52, 48.43 89.92, -0.42 86.97 M-1.91 88.92 C-1.25 65.03, -0.34 34.53, -0.79 -0.93 M0.45 90.58 C3.37 67.09, 0.18 47.52, -1.59 -1.64'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(766.355204683803 286) rotate(0 30 12.5)'>
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
					{"Grabs"}
				</text>
			</g>
		</svg>
	);
};

export default GrabsSVG;
