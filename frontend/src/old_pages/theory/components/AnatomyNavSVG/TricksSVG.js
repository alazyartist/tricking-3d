import * as React from "react";

const TrickSVG = (props) => {
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
			<g
				strokeLinecap='round'
				transform='translate(269.605204683803 12) rotate(0 57.59793814432987 43.34126984126982)'>
				<path
					d='M2.36 0.24 C36.42 -1.11, 75.62 -0.7, 113.4 0.31 M0.59 -1.53 C30.42 -3.69, 58.56 -2.64, 113.87 0.72 M115.2 -2.74 C114.9 18.25, 113.79 38.65, 119.17 90.18 M116.48 -0.31 C116.79 17.74, 115.61 34.77, 116.95 87.94 M111.94 84.77 C83.16 86.95, 55.26 83.8, 0.51 83.07 M116.12 86.88 C70.83 87.78, 29.71 87.65, 1.36 85.33 M-2.99 89.08 C-4.48 59.42, -1.38 38.93, -1.65 -2.68 M1.09 86.09 C0.15 50.69, 2.63 16.08, -1.03 -0.5'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(297.605204683803 40) rotate(0 30.5 12.5)'>
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
			</g>
		</svg>
	);
};

export default TrickSVG;
