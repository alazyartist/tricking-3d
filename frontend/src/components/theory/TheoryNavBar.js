import React from "react";
import { Link } from "react-router-dom";

function TheoryNavBar() {
	return (
		<div className=' font-inter flex flex-col place-content-center place-items-center gap-1 pb-2 font-semibold text-zinc-300'>
			<Link to='anatomy'>Anatomy of a Trick</Link>
			<Link to='stances'>Stances</Link>
			<Link to='setups'>Setups</Link>
			<Link to='transitions'>Transitions</Link>
			<Link to='inverts'>Invert Tricks</Link>
			<Link to='axes'>Axes</Link>
			<Link to='touchdowns'>Touchdowns</Link>
			<Link to='rotations'>Rotations</Link>
			<Link to='kicks'>Kicks</Link>
			<Link to='grabs'>Grabs</Link>
			<Link to='shapes'>Shapes</Link>
			<Link to='tricklist'>Tricklist</Link>
		</div>
	);
}

export default TheoryNavBar;
