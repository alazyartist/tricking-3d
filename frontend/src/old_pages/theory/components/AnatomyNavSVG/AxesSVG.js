import * as React from "react";

const AxesSVG = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1026.8161367195285 352.68253968253964'
			width={1026.8161367195285}
			height={352.68253968253964}
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
			{/* axes Square */}
			<g
				strokeLinecap='round'
				transform='translate(34.85520468380298 246.25) rotate(0 57.59793814432987 44.34126984126982)'>
				<path
					d='M-2.55 -0.17 C29.47 2.36, 60.18 -2.91, 115.19 2.22 M0.36 1.11 C38.55 -2.37, 76.2 -1.65, 114.73 -0.42 M116.85 -1.93 C111.74 24.81, 113.57 57.62, 114.63 84.69 M113.3 -1.62 C115.92 20.14, 113.89 37.15, 115.21 86.82 M118.41 84.9 C79.64 88.33, 47 92.43, 0.09 86.14 M116.35 88.05 C79.46 88.73, 42.3 91.07, 0.09 88.84 M-0.05 87.94 C0.09 62.73, -2.65 31.85, -2.32 -2.17 M0.03 87.53 C0.76 64.35, 1.57 44.4, 1.84 1.25'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(60.85520468380298 280.25) rotate(0 23.5 12.5)'>
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
					{"Axes"}
				</text>
			</g>
		</svg>
	);
};

export default AxesSVG;
