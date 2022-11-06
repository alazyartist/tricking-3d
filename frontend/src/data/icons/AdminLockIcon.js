import React from "react";

const AdminLockIcon = (props) => {
	return (
		<svg
			{...props}
			stroke='currentColor'
			fill='currentColor'
			strokeWidth='0'
			viewBox='0 0 24 24'
			height='1em'
			width='1em'
			xmlns='http://www.w3.org/2000/svg'>
			<g>
				<path fill='none' d='M0 0h24v24H0z'></path>
				<path d='M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z'></path>
			</g>
		</svg>
	);
};

export default AdminLockIcon;