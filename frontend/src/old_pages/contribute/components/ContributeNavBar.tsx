import React from "react";
import Link from "next/link";
function ContributeNavBar() {
  const inactive = "p-2 text-center font-inter font-bold text-zinc-200";
  const active = "p-2 text-center font-inter font-bold text-emerald-400";
  return (
    <div
      id="content-container"
      className="m-4 
                    flex place-content-center
                    gap-1 rounded-3xl bg-zinc-700
                    "
      // bg-gradient-to-b from-sky-600 to-sky-400
    >
      {/* Design */}
      <Link href="design">Design</Link>
      {/* CODE */}
      <Link href="code">Code</Link>
      {/* Marketing */}
      <Link href="marketing">Marketing</Link>
      {/* Theory */}
      <Link href="theory">Theory</Link>
      {/* 3d */}
      <Link href="3d">3d</Link>
    </div>
  );
}

export default ContributeNavBar;
