import * as React from "react";

const VariationsLinesSVG = (props) => {
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
			/>{" "} */}
			{/* Variation group Lines */}
			<g strokeLinecap='round'>
				<g transform='translate(335.855204683803 129.74999999999994) rotate(0 0.4465639916887767 27.776882747951902)'>
					<path
						d='M0.87 0.47 C1.14 9.63, 0.98 45.73, 0.88 54.89 M-0.13 -0.32 C0.1 8.95, 0.37 46.4, 0.31 55.88'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			<g strokeLinecap='round'>
				<g transform='translate(10.355204683802981 202.17474290100262) rotate(0 501.46527461218255 -2.2900958649544236)'>
					<path
						d='M0.72 -1.05 C167.79 -2.06, 836.2 -4.77, 1003.29 -5.59 M-0.36 1.01 C166.49 0.12, 835.25 -3.28, 1002.39 -4.31'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			<g strokeLinecap='round'>
				<g transform='translate(1015.855204683803 198.49999999999994) rotate(0 -0.09363972005428423 15.946397884013152)'>
					<path
						d='M0.25 1.08 C-0.02 6.44, -1.13 26.43, -1.15 31.28 M-1.08 0.61 C-1.03 5.66, 0.88 24.22, 0.96 29.31'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			<g strokeLinecap='round'>
				<g transform='translate(13.508117939176941 202.5666013414745) rotate(0 -0.24591637434434688 14.172393351758274)'>
					<path
						d='M-0.07 0.88 C-0.36 5.53, -1.18 22.27, -1.07 26.74 M-1.57 0.3 C-1.55 5.22, 0.8 23.82, 1.07 28.05'
						stroke='#d4d4d8'
						strokeWidth={1}
						fill='none'
					/>
				</g>
			</g>
			{/* variation-line label */}
			<g transform='translate(351.355204683803 153.75) rotate(0 49 12.5)'>
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
					{"variations"}
				</text>
			</g>
		</svg>
	);
};

export default VariationsLinesSVG;
