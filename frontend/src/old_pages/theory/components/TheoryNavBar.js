import React from "react";
import Link from "next/link";

function TheoryNavBar() {
  return (
    <div className=" flex flex-col place-content-center place-items-center gap-1 pb-2 font-inter font-semibold text-zinc-300">
      <Link href="anatomy">Anatomy of a Trick</Link>
      <Link href="setups">Setups</Link>
      <Link href="inverts">Invert Tricks</Link>
      {/* <Link href='stances'>Stances</Link> */}
      {/* <Link href='transitions'>Transitions</Link> */}
      <Link href="axes">Axes</Link>
      <Link href="touchdowns">Touchdowns</Link>
      <Link href="rotations">Rotations</Link>
      <Link href="kicks">Kicks</Link>
      <Link href="grabs">Grabs</Link>
      <Link href="shapes">Shapes</Link>
      {/* <Link href='tricklist'>TrickList</Link> */}
      {/* <Link href='transitionlist'>TransitionList</Link> */}
      {/* <Link href='/3d/comboMaker'>ComboMaker</Link> */}
    </div>
  );
}

export default TheoryNavBar;
