import * as React from "react";

const AxesSketch = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 1449.9998474121094 1255.9537912193687'
		width={1449.9998474121094}
		height={1255.9537912193687}
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
			width={1449.9998474121094}
			height={1255.9537912193687}
			fill='transparent'
		/>
		<g
			strokeLinecap='round'
			transform='translate(258.78658044856 251.1947298314053) rotate(0 450.0000762939453 450.0000762939453)'>
			<path
				d='M245.3 50.52 C265.42 31.39, 296.6 24.94, 322.85 17.18 C349.09 9.43, 375.43 6.46, 402.76 4.01 C430.08 1.56, 459.08 0.66, 486.79 2.47 C514.49 4.28, 542.81 8.07, 569.01 14.87 C595.21 21.67, 619.34 31, 643.99 43.26 C668.63 55.52, 694.27 71.83, 716.9 88.43 C739.52 105.03, 760.97 122.64, 779.72 142.84 C798.46 163.04, 814.68 186.17, 829.36 209.64 C844.03 233.1, 857.32 258.19, 867.78 283.64 C878.25 309.09, 886.97 335.79, 892.16 362.35 C897.35 388.91, 898.64 415.8, 898.94 443 C899.24 470.19, 898.37 498.42, 893.97 525.54 C889.56 552.66, 881.95 579.63, 872.53 605.72 C863.11 631.81, 851.69 658.2, 837.45 682.09 C823.2 705.97, 805.76 728.74, 787.07 749.03 C768.39 769.32, 746.89 786.72, 725.33 803.81 C703.78 820.9, 682.4 838.81, 657.74 851.55 C633.08 864.3, 604.18 872.56, 577.36 880.28 C550.54 888, 524 894.75, 496.82 897.88 C469.64 901.01, 441.52 900.99, 414.27 899.09 C387.02 897.18, 360.19 893.41, 333.33 886.43 C306.48 879.45, 277.98 869.55, 253.12 857.2 C228.25 844.85, 205.93 828.65, 184.13 812.33 C162.33 796.02, 141.5 779.19, 122.29 759.33 C103.08 739.47, 83.84 716.53, 68.89 693.15 C53.94 669.78, 42.5 645.01, 32.58 619.09 C22.67 593.16, 14.71 564.92, 9.41 537.61 C4.1 510.3, 1.42 482.61, 0.77 455.24 C0.13 427.86, 0.66 400.05, 5.52 373.37 C10.39 346.69, 20.23 321, 29.98 295.14 C39.73 269.29, 49.82 242.48, 64.01 218.26 C78.2 194.03, 97.02 170.33, 115.11 149.82 C133.19 129.31, 140.66 116.34, 172.51 95.21 C204.36 74.08, 272.93 36.11, 306.2 23.05 C339.47 9.99, 369.73 9.27, 372.12 16.83 M528.52 9.05 C555.21 6.55, 584.16 20.44, 610.25 29.83 C636.34 39.21, 661.42 51.42, 685.05 65.36 C708.68 79.31, 731.87 94.59, 752.04 113.5 C772.22 132.41, 789.56 156.77, 806.1 178.84 C822.64 200.92, 838.74 221.18, 851.29 245.93 C863.84 270.69, 873.39 300.52, 881.38 327.38 C889.38 354.23, 896.6 380.24, 899.28 407.06 C901.96 433.88, 900.1 460.64, 897.46 488.31 C894.82 515.99, 890.65 546.12, 883.42 573.1 C876.18 600.08, 866.45 625.31, 854.06 650.2 C841.67 675.08, 825.53 700.32, 809.09 722.41 C792.64 744.5, 775.17 764.89, 755.39 782.74 C735.6 800.6, 714.22 815.56, 690.37 829.56 C666.53 843.56, 638.43 855.86, 612.32 866.76 C586.21 877.66, 560.84 889.49, 533.71 894.96 C506.58 900.42, 477.06 900.39, 449.55 899.56 C422.05 898.72, 395.6 894.95, 368.69 889.94 C341.78 884.94, 314.18 879.04, 288.1 869.53 C262.03 860.02, 236.03 847.18, 212.23 832.88 C188.43 818.58, 165.23 802.53, 145.29 783.74 C125.35 764.95, 108.99 742.04, 92.57 720.14 C76.16 698.25, 58.99 676.39, 46.8 652.38 C34.61 628.36, 26.73 603.1, 19.45 576.06 C12.17 549.03, 5.88 517.51, 3.11 490.15 C0.35 462.79, 0.61 438.77, 2.86 411.9 C5.12 385.02, 9.01 355.87, 16.66 328.91 C24.3 301.95, 36.5 274.64, 48.73 250.12 C60.95 225.59, 74.2 203.71, 90.01 181.76 C105.81 159.82, 123.39 137.55, 143.57 118.43 C163.76 99.31, 186.98 81.46, 211.11 67.04 C235.25 52.61, 262.95 41.6, 288.37 31.86 C313.8 22.12, 336.84 14.01, 363.66 8.59 C390.49 3.16, 421.23 -0.36, 449.34 -0.66 C477.45 -0.97, 518.87 3.73, 532.3 6.76 C545.73 9.79, 531.66 10.41, 529.92 17.51'
				stroke='#d4d4d8'
				strokeWidth={4}
				fill='none'
			/>
		</g>
		<g strokeLinecap='round'>
			<g transform='translate(718.5464784757414 157.16656494140625) rotate(0 0.24017826676367804 544.0282411839441)'>
				<path
					d='M0.35 1.13 C0.42 182.95, -2.28 907.59, -1.96 1088.79 M-2.9 -0.73 C-1.72 180.51, 2.61 904.2, 3.38 1084.93'
					stroke='#d4d4d8'
					strokeWidth={4}
					fill='none'
				/>
			</g>
		</g>
		<g strokeLinecap='round'>
			<g transform='translate(719.4700270805456 157.6967351822932) rotate(315 0.5231895902752512 543.4980709430575)'>
				<path
					d='M-1.36 1.06 C-1.21 181.89, -0.02 903.99, 0.13 1085.06 M3.09 -0.83 C2.96 180.32, -1.1 907.29, -2.04 1087.82'
					stroke='#d4d4d8'
					strokeWidth={4}
					fill='none'
				/>
			</g>
		</g>
		<g strokeLinecap='round'>
			<g transform='translate(716.4185580734661 155.52110476294) rotate(224.99999999999997 1.1118253214285687 544.3318983064966)'>
				<path
					d='M1.58 2.21 C0.98 183.76, -1.84 907.09, -1.64 1087.72 M-1 0.94 C-0.87 181.77, 3.3 901.98, 3.87 1083.29'
					stroke='#d4d4d8'
					strokeWidth={4}
					fill='none'
				/>
			</g>
		</g>
		<g strokeLinecap='round'>
			<g transform='translate(718.9996948242188 156.2226897299297) rotate(270 0.9542760104313857 542.9053323652596)'>
				<path
					d='M1.73 -2.07 C2.37 179.2, 2.5 906.12, 2.68 1087.88 M-0.77 2.99 C-0.16 183.37, 1.35 903.36, 1.89 1083.52'
					stroke='#d4d4d8'
					strokeWidth={4}
					fill='none'
				/>
			</g>
		</g>
		<g
			strokeOpacity={0.5}
			fillOpacity={0.5}
			strokeLinecap='round'
			transform='translate(262.3331298828125 610.4998474121094) rotate(0 454.9999237060547 86.66671752929688)'>
			<path
				d='M233.73 12.82 C256.93 9.13, 291.72 6.31, 323.17 4.18 C354.62 2.04, 389.69 0.24, 422.45 0 C455.22 -0.24, 487.94 1.72, 519.79 2.74 C551.63 3.76, 582.75 4.56, 613.54 6.12 C644.33 7.68, 677.07 8.82, 704.53 12.09 C731.99 15.37, 755.5 21.05, 778.32 25.77 C801.13 30.48, 823.88 35.3, 841.42 40.39 C858.96 45.48, 872.83 50.71, 883.57 56.28 C894.32 61.86, 901.98 67.81, 905.91 73.84 C909.83 79.87, 910.17 86.17, 907.12 92.46 C904.06 98.76, 896.86 105.4, 887.57 111.59 C878.28 117.79, 867.57 124.07, 851.37 129.63 C835.17 135.19, 812.57 140.08, 790.38 144.96 C768.18 149.84, 744.91 155.62, 718.19 158.9 C691.48 162.19, 660.3 162.77, 630.09 164.68 C599.88 166.6, 568.44 169.19, 536.91 170.41 C505.39 171.63, 473.47 171.71, 440.95 172.01 C408.43 172.31, 373.92 173.31, 341.79 172.21 C309.66 171.12, 277.17 168.69, 248.18 165.46 C219.2 162.23, 192.66 157.24, 167.88 152.84 C143.1 148.44, 119.74 143.97, 99.48 139.03 C79.23 134.09, 60.84 128.39, 46.34 123.2 C31.84 118.02, 20.12 113.44, 12.48 107.92 C4.83 102.39, 1.3 96.42, 0.49 90.04 C-0.33 83.67, 1.07 75.85, 7.59 69.66 C14.11 63.48, 26.35 58.37, 39.61 52.94 C52.86 47.5, 67.79 42.36, 87.09 37.04 C106.39 31.72, 124.11 26.07, 155.42 21.04 C186.73 16.01, 246.99 9.74, 274.96 6.87 C302.94 3.99, 320.42 2.41, 323.28 3.79 M224.33 13.34 C246.86 8.5, 282.91 5.22, 313.68 3.43 C344.44 1.63, 375.99 3.27, 408.94 2.58 C441.88 1.9, 478.23 -0.84, 511.35 -0.68 C544.46 -0.53, 577.41 1.64, 607.64 3.51 C637.86 5.37, 665.44 7.38, 692.69 10.49 C719.95 13.6, 747.93 17.07, 771.14 22.19 C794.36 27.3, 813.81 35.57, 831.97 41.18 C850.13 46.8, 867.93 50.97, 880.08 55.87 C892.23 60.77, 899.6 64.77, 904.87 70.56 C910.14 76.35, 914.11 83.95, 911.69 90.62 C909.27 97.3, 900.21 104.15, 890.35 110.61 C880.48 117.07, 867.55 123.78, 852.5 129.4 C837.45 135.02, 821.05 140.17, 800.03 144.32 C779.01 148.47, 753.24 150.69, 726.36 154.3 C699.48 157.91, 668.56 162.88, 638.76 165.97 C608.96 169.05, 578.63 171.59, 547.57 172.79 C516.52 174, 485.45 173.05, 452.44 173.2 C419.43 173.34, 381.64 175.06, 349.51 173.67 C317.37 172.27, 288.62 168.01, 259.63 164.83 C230.63 161.65, 200.79 158.03, 175.52 154.57 C150.26 151.12, 128.73 149.03, 108.02 144.1 C87.31 139.17, 66.44 130.79, 51.27 125 C36.09 119.21, 25.56 115.06, 16.95 109.35 C8.35 103.64, 1.62 96.57, -0.36 90.73 C-2.34 84.88, -0.58 80.11, 5.07 74.29 C10.72 68.48, 21.33 61.58, 33.54 55.84 C45.74 50.1, 59.72 45.06, 78.31 39.84 C96.91 34.62, 120.39 28.84, 145.11 24.51 C169.82 20.18, 212.31 15.96, 226.59 13.86 C240.88 11.76, 227.18 10.91, 230.81 11.93'
				stroke='#d4d4d8'
				strokeWidth={4}
				fill='none'
			/>
		</g>
		<g transform='translate(1300.6665649414062 591.8704833984375) rotate(0 24.5 54)'>
			<text
				x={0}
				y={76}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize='86px'
				fill='#d4d4d8'
				textAnchor='start'
				style={{
					whiteSpace: "pre",
				}}
				direction='ltr'>
				{"x"}
			</text>
		</g>
		<g transform='translate(747.3331298828125 10) rotate(0 20.5 54)'>
			<text
				x={0}
				y={76}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize='86px'
				fill='#d4d4d8'
				textAnchor='start'
				style={{
					whiteSpace: "pre",
				}}
				direction='ltr'>
				{"y"}
			</text>
		</g>
		<g
			strokeOpacity={0.5}
			fillOpacity={0.5}
			transform='translate(833.3331298828125 75.83320617675781) rotate(0 56.5 54)'>
			<text
				x={0}
				y={76}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize='86px'
				fill='#d4d4d8'
				textAnchor='start'
				style={{
					whiteSpace: "pre",
				}}
				direction='ltr'>
				{"90"}
			</text>
		</g>
		<g
			strokeOpacity={0.5}
			fillOpacity={0.5}
			transform='translate(10 615.8331298828125) rotate(0 74.5 54)'>
			<text
				x={0}
				y={76}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize='86px'
				fill='#d4d4d8'
				textAnchor='start'
				style={{
					whiteSpace: "pre",
				}}
				direction='ltr'>
				{"180"}
			</text>
		</g>
		<g
			strokeOpacity={0.5}
			fillOpacity={0.5}
			transform='translate(1379.9998474121094 639.1666412353516) rotate(0 30 54)'>
			<text
				x={0}
				y={76}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize='86px'
				fill='#d4d4d8'
				textAnchor='start'
				style={{
					whiteSpace: "pre",
				}}
				direction='ltr'>
				{"0"}
			</text>
		</g>
		<g
			strokeOpacity={0.5}
			fillOpacity={0.5}
			transform='translate(1143.3329772949219 235.8332061767578) rotate(0 54.5 54)'>
			<text
				x={0}
				y={76}
				fontFamily='Virgil, Segoe UI Emoji'
				fontSize='86px'
				fill='#d4d4d8'
				textAnchor='start'
				style={{
					whiteSpace: "pre",
				}}
				direction='ltr'>
				{"45"}
			</text>
		</g>
	</svg>
);

export default AxesSketch;