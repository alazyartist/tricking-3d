import * as React from "react";
import { useNavigate } from "react-router-dom";

const AnatomyNav = (props) => {
	const nav = useNavigate();

	const handleNav = (e) => {
		if (e.target?.innerHTML && !e.target?.innerHTML.includes("<style>")) {
			let adr = e.target.innerHTML;
			nav(adr.toLowerCase());
			console.log(adr.toLowerCase());
			return;
		}
	};

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 1026.8161367195285 352.68253968253964'
			width={1026.8161367195285}
			height={352.68253968253964}
			onClick={handleNav}
			{...props}>
			<defs>
				<style>
					{
						'\r\n      @font-face {\r\n        font-family: "Virgil";\r\n        src: url("https://excalidraw.com/Virgil.woff2");\r\n      }\r\n      @font-face {\r\n        font-family: "Cascadia";\r\n        src: url("https://excalidraw.com/Cascadia.woff2");\r\n      }\r\n    '
					}
				</style>
			</defs>
			<rect
				x={0}
				y={0}
				width={1026.8161367195285}
				height={352.68253968253964}
				fill='transparent'
			/>
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
			<g
				strokeLinecap='round'
				transform='translate(103.60520468380298 10) rotate(0 57.59793814432987 44.34126984126982)'>
				<path
					d='M-0.23 -0.22 C33.44 0.68, 68.67 -2.93, 118.17 1.19 M-0.16 -0.92 C24.44 3, 50.36 3.66, 116.12 0 M112.6 -3.3 C118.51 24.04, 110.63 43.5, 115.73 91.26 M114.56 -0.32 C117.43 26.49, 114.85 48.93, 115.54 87.06 M114.91 85.4 C86.64 84.99, 59.91 87.83, 0.43 90.53 M115.2 89.4 C80.85 88.31, 43.19 90.59, 0.3 87.19 M-0.58 87.79 C-0.02 54.07, 5.58 22.25, -3.75 2.18 M1.52 87.21 C-0.18 64.2, 0.03 40.97, 1.04 1.28'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(129.60520468380298 44) rotate(0 33.5 12.5)'>
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
					{"Setups"}
				</text>
			</g>
			<g
				strokeLinecap='round'
				transform='translate(568.9384871545061 15) rotate(0 106.09793814432987 44.34126984126982)'>
				<path
					d='M-1.59 -2.9 C65.09 0.75, 122.25 1.58, 208.72 -0.28 M-1.02 1.21 C54.66 -1.34, 106.51 -2, 211 -1.14 M208.29 2.42 C214.5 21.85, 213.34 39.64, 212.58 87.4 M211.37 -1.54 C214.1 23.54, 212.8 49.22, 212.13 88.54 M214.7 88 C166.31 86.94, 120.03 82.47, 1.49 88.69 M211.67 89.5 C141.15 84.84, 70.62 84.54, -1.69 88.43 M3.95 86.11 C-3.02 66.24, -0.45 37.52, -2.84 3.03 M-0.82 88.94 C1.96 69.87, -0.67 50.44, 1.89 -0.32'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(620.605204683803 44) rotate(0 55.5 12.5)'>
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
					{"Transitions"}
				</text>
			</g>
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
			<g
				strokeLinecap='round'
				transform='translate(200.85520468380298 248.25) rotate(0 83.84793814432987 43.34126984126982)'>
				<path
					d='M-0.36 -2.1 C68.53 1.93, 130.71 0.43, 169.86 -1.73 M1.05 -1.15 C41.93 -2.2, 85.23 -0.44, 167.4 0.46 M168.88 -3.37 C168.32 36.29, 168.88 69.3, 166.52 87.54 M166.57 -1.29 C168.79 30.82, 170.18 58.84, 167.09 86.37 M165.89 88.96 C114.66 89.76, 58.14 87.93, -3.41 86.33 M168.15 85.38 C114.48 88.8, 60.97 87.46, -1.06 87.49 M3.24 86.56 C-0.12 65.47, -1.95 48.39, 0.08 -2.2 M-1.09 87.77 C-0.15 62.21, 1.42 35.91, 0.96 0.01'
					stroke='#d4d4d8'
					strokeWidth={1}
					fill='none'
				/>
			</g>
			<g transform='translate(228.85520468380298 276.25) rotate(0 57 12.5)'>
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
					{"Touchdowns"}
				</text>
			</g>
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

export default AnatomyNav;
