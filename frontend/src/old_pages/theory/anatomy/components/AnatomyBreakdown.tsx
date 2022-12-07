import React from "react";
import { BasesOverview } from "./Overview";

const AnatomyBreakdown = () => {
  return (
    <div>
      <h1 className="p-4 pb-0 font-virgil text-xl text-zinc-300">Base</h1>
      <div className="w-full p-4 text-zinc-400">
        The Anatomy of a Trick, as seen above, has at it's heart a base. This is
        a set of movements that meets a particular criteria. We will see how
        this works throughout this section.
      </div>
      <BasesOverview />
      <div className="w-full p-4 text-zinc-400">
        The base has an <span className="text-zinc-300">Entrance</span>,{" "}
        <span className="text-zinc-300">Beginning</span>,{" "}
        <span className="text-zinc-300">Middle</span>,{" "}
        <span className="text-zinc-300">End</span>, and an{" "}
        <span className="text-zinc-300">Exit</span>. Each of these sections of
        the Trick offer up some information to be used in understanding the
        movement.
      </div>

      <h1 className="p-4 pb-0 font-virgil text-xl text-zinc-300">Entrance</h1>
      <div className="w-full p-4 text-zinc-400">
        The <span className="text-zinc-300">Entrance</span> gives us information
        about the Takeoff Stance, and the Takeoff Style. The{" "}
        <span className="text-zinc-300">Entrance</span> to the Trick is at the
        very start before any defining movements have been made that allow us to
        determine the trick being performed. This section overlaps with the{" "}
        <span className="text-zinc-300">Exit</span> of the Transition or Setup
        that leads into it.
      </div>
      <div className="flex gap-2">
        <h1 className="p-4 pb-0 font-virgil text-xl text-zinc-300">Begining</h1>
        <h1 className="p-4 pb-0 font-virgil text-xl text-zinc-300">Middle</h1>
        <h1 className="p-4 pb-0 font-virgil text-xl text-zinc-300">End</h1>
      </div>
      <div className="w-full p-4 text-zinc-400">
        The <span className="text-zinc-300">Beginning</span>,{" "}
        <span className="text-zinc-300">Middle</span>, and{" "}
        <span className="text-zinc-300">End</span>, are the sections in which
        the core-trick is actually being performed in the air or on the ground.
        Each of these different sections can themselves be variated
        independently of the other elements of the Trick to create something
        different out of it.
      </div>
      <h1 className="p-4 pb-0 font-virgil text-xl text-zinc-300">Exit</h1>
      <div className="w-full p-4 text-zinc-400">
        The <span className="text-zinc-300">Exit</span> of the Trick is after
        all essential movements for the Trick have been completed and the only
        thing left is to Land in a particular Landing Stance, and Landing Style
        for the next Transition.
      </div>
      <div className="w-full p-4 text-zinc-400"></div>
    </div>
  );
};

export default AnatomyBreakdown;
