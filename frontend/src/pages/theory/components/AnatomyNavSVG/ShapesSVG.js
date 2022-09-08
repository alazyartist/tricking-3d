import * as React from "react";

const ShapesSVG = (props) => {
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
				transform='translate(895.855204683803 254) rotate(0 57.59793814432987 44.34126984126982)'>
				<path
					d='M3.37 -1.46 C24.89 -3.61, 59.3 -4.62, 118.95 1.78 M1.81 -1.27 C31.95 -0.67, 65.33 1.52, 116.04 -1.57 M117.56 -3.41 C118.67 24.01, 117.78 56.14, 111.3 87.53 M115.27 -0.01 C114.82 17.62, 115.2 37.92, 116.14 87.08 M117.49 88.25 C68.34 91.85, 20.88 88.36, -1.93 86.9 M115.43 89.66 C83.8 86.92, 50.23 89.69, 0.75 89.85 M-0.65 88.54 C-3.43 54.51, -1.26 16.89, 0.99 -2.07 M-1.27 86.69 C-1.09 67.36, -1.01 44.02, -1.89 0.76'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(913.855204683803 286) rotate(0 34 12.5)'>
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
					{"Shapes"}
				</text>
			</g>
		</svg>
	);
};

export default ShapesSVG;
