import Link from "next/link";
import React from "react";
import { FaDiscord } from "react-icons/fa";

function DiscordLink() {
  return (
    <Link
      href={"https://discord.gg/egkkxNnDuh"}
      className="flex w-full place-content-center px-2"
    >
      <div className="w-fit rounded-xl bg-zinc-800 p-8">
        <div className="flex flex-col">
          <h1 className="text-center text-sm font-semibold text-gray-400">
            Join the discord to Give Feedback <br /> or Report Issues{" "}
          </h1>
          <div className="place-self-center rounded-full p-[4px] text-5xl text-indigo-400  hover:text-indigo-700">
            <FaDiscord />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DiscordLink;
