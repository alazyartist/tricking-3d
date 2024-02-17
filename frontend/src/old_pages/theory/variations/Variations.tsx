import Link from "next/link";
import React from "react";

const Variations = () => {
  const variations = [
    { href: "/theory/axes", title: "Axes" },
    { href: "/theory/touchdowns", title: "Touchdowns" },
    { href: "/theory/rotations", title: "Rotations" },
    { href: "/theory/kicks", title: "Kicks" },
    { href: "/theory/grabs", title: "Grabs" },
    { href: "/theory/shapes", title: "Shapes" },
  ];
  return (
    <div className="mb-14 rounded-md bg-zinc-900 bg-opacity-90 p-4 text-zinc-300 md:w-[60vw]">
      <h1 className="w-full pb-0 font-virgil text-xl">Variations</h1>
      <p className="font-inter font-normal text-zinc-400">
        Variations are the ways that we can manipulate a base to create a new
        Trick. We have a number of different types of variations that we can use
        to create new Tricks. These include:
      </p>
      <div className="flex w-full flex-col justify-around gap-2">
        {variations.map((variation, i) => (
          <Link
            href={variation.href}
            key={i}
            className="flex w-full flex-col place-content-center place-items-center justify-around gap-2 rounded-xl border-2 border-zinc-500 p-2 "
          >
            {variation.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Variations;
