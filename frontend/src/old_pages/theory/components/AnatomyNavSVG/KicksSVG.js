import * as React from "react";

const KicksSVG = (props) => {
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
				transform='translate(593.355204683803 252) rotate(0 57.59793814432987 43.34126984126982)'>
				<path
					d='M-2.46 1.88 C26.97 -4.02, 64.49 -3.23, 117.94 -0.75 M-0.08 1.47 C38.85 0.3, 80.16 0.14, 115.25 1.71 M111.75 -2.13 C118.48 31.88, 112.32 65.37, 117.97 88.09 M116.88 1.14 C113.58 32.79, 116.06 68.23, 113.41 85.92 M111.76 86.44 C86.49 82.09, 59.68 86.97, -1.18 89.22 M117.06 86.93 C91.09 85.68, 70.22 85.18, 1.27 87.76 M-0.79 84.75 C1.51 56.1, -0.85 15.93, -2.69 -0.77 M-1.72 88.11 C-0.35 64.41, -1.46 43.51, -1.37 0.38'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(621.355204683803 280) rotate(0 24 12.5)'>
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
					{"Kicks"}
				</text>
			</g>
		</svg>
	);
};

export default KicksSVG;
