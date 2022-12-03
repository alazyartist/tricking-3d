import * as React from "react";

const StancesSVG = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1026.8161367195285 352.68253968253964'
			// width={1026.8161367195285}
			// height={352.68253968253964}
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
				transform='translate(424.605204683803 14) rotate(0 57.59793814432987 44.34126984126982)'>
				<path
					d='M-3.06 2.13 C21.11 -1, 48.29 -3.33, 116.63 -2.32 M-1.37 -0.75 C41.13 -1.3, 83.34 1.99, 116.95 -1.95 M114.58 1.08 C115.82 30.69, 114.79 67.46, 117.71 87.04 M114.24 -1.11 C115.44 19.61, 113.87 39.77, 113.39 90.1 M115.59 85.45 C84.58 89.75, 52 92.46, -2.7 87.49 M116.4 86.84 C73.38 86.67, 34.95 86.13, -1.34 90.66 M-1.18 86.76 C-1.18 70.81, -1.28 44.81, -0.99 -1.64 M-1.59 90.61 C0.97 60.61, -2.28 32.44, -1.76 -0.1'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(442.605204683803 46) rotate(0 39.5 12.5)'>
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
					{"Stances"}
				</text>
			</g>
		</svg>
	);
};

export default StancesSVG;
