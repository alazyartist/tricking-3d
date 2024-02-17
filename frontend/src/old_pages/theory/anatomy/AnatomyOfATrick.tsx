import React from "react";
import AnatomyTrickSVG from "./components/AnatomyTrickSVG";
import AnatomyIntro from "./components/AnatomyIntro";
import AnatomyBreakdown from "./components/AnatomyBreakdown";
import AnatomySketch from "../components/AnatomySketchSVG";
import Link from "next/link";
function AnatomyOfATrick() {
  return (
    <div className="flex w-full flex-col place-items-center lg:w-[60vw]">
      <div className="sticky top-0 h-8"></div>
      <div className=" flex w-full flex-col place-items-center rounded-md bg-zinc-900 bg-opacity-90">
        <AnatomyIntro />
        <AnatomyBreakdown />
        {/* <AnatomyTrickSVG className="w-full fill-zinc-300" /> */}
        <AOATText />
      </div>
    </div>
  );
}

export default AnatomyOfATrick;

function AOATText() {
  return (
    <div className="w-full p-4 font-normal text-zinc-400">
      <h1 className=" pb-0 font-virgil text-xl text-zinc-300">Orientation</h1>
      All tricks have a directionality to them meaning they exist within an
      oriented framework where up and down and forward and backward have been
      decided by your Direction of Momentum. DOM, simply means the direction we
      are traveling in space parallel to the ground, i.e. front to back, left to
      right, etc. Our DOM also gives a grounding point for the stances. The
      Stances are a way to refer to our bodies position in space in relation to
      our DOM. We have Takeoff Stances, as well as Landing Stances. The takeoff
      stance gives us information about the way the feet and body are positioned
      in relation to our DOM, in the entrance to the Trick, while the landing
      stance gives us information about the way the feet and body are positioned
      during the exit of the Trick. The Takeoff and Landing Styles denote how
      many feet, in what order, and in which way. We can usually find this
      information about the takeoff and landing styles by looking at the
      Transitions that are used in and out of the Trick.
      <br />
      <br />
      <AnatomyTrickSVG className="w-full fill-zinc-300" />
      <h1 className="pb-0 font-virgil text-xl text-zinc-300">Setup</h1>
      When a Trick is going to be performed the use a Setup of some kind is
      needed in order to generate the initial momentum. The setup can be thought
      to have the same anatomy as a Trick. The exit of the setup will overlap
      with the entrance of the Trick, this is where the performer is positioning
      themselves to begin the defining movement for the Trick. Taking that
      momentum that was generated and using it to perform the Trick. <br />
      <br />
      <AnatomySketch className="h-fit w-full" />
      <h1 className="pb-0 font-virgil text-xl text-zinc-300">Combo</h1>
      When tricks are performed in a combo a Transition of some form is used to
      move between the end state of one Trick and the Beginning state of another
      Trick. Transitions can be thought to have the same anatomy as the Tricks
      and Setups we've mentioned so far. And again like the shift from Setup to
      Trick the Exit of the Trick overlaps with the Entrance of the Transition.
      The Transitions main movements are performed and the Exit of the
      Transition overlaps with the Entrance to the next Trick. So the format is
      either Setup &gt; Trick or Setup &gt; Trick &gt; Transition &gt; Trick.
      Hopefully you are noticing the pattern that we can create by adding
      another &gt; Transition &gt; Trick to the end. We could do this
      "theoretically" forever.
      <br />
      <h1 className="pb-0 font-virgil text-xl text-zinc-300">Transition</h1>
      When we are chaining multiple Tricks together using various transitions we
      also have what we can refer to as our Momentum Line. This is effectively a
      trail of where in space we have been over the course of multiple Tricks.
      We could choose to maintain a linearity and keep each Trick going in the
      same direction even though we may incorporate a variety of Tricks.
      Alternatively we can allow, or even direct, our DOM to go in all sorts of
      directions. Some people will even spiral around the floor over the course
      of their combo. Using different transitions we can maintain or destroy our
      DOM(Direction of Movement) which could affect how much momentum we have to
      use in the next trick.
      <br />
      <h1 className="pb-0 font-virgil text-xl text-zinc-300">Recap</h1>
      We can use this framework as the basic structure of Tricks and Tricking
      combos. Any trick we want to look at can be dissected, or created, through
      this lens. We have been talking about breaking things down into their
      parts quite a bit but these pieces aren't that useful when they aren't
      combined together. Its once we take these pieces and put them all back
      together that we actually start to get somewhere. We can take a Trick that
      we have broken down, make some adjustments to its pieces and put the new
      pieces back together. <br />
      <br />
      <h1 className="pb-0 font-virgil text-xl text-zinc-300">Expanding</h1>
      This gives us a different, and often more complex move. All of the higher
      level Tricks are really just basic moves that were put through this
      process of variating the Core-trick over and over again until something
      new and interesting came out of it. This also means that if there is any
      higher level move that you want to perform you just have to work up the
      basic moves and do the small variations along the way to eventually get
      there. The whole tricking System is nothing more than a bunch of layers of
      simple movements that have been pushed to their limits! <br />
      <br />
      At this point we should have a basic understanding that Tricks can be
      looked at using the Anatomy of a Trick. That Tricks have setups, and
      transitions can be used to move from one Trick to the next. Tricking
      combos can be as long as the performer wants, or rather is capable of. And
      that all Tricks can be broken down into their more basic parts. We should
      also know that our Direction of Momentum is the grounding point for the
      stances; and that the stances reference our bodies position in relation to
      our DOM.
      <br />
      <br /> Next we can start to talk about the Parameters that can be used
      within this structure. We mentioned briefly the{" "}
      <TLink href={"/theory/setups"} title={"Setups"} />{" "}
      <TLink href={"/theory/stances"} title={"Stances"} />{" "}
      <TLink href={"/theory/transitions"} title={"Transitions"} /> We will also
      need to exlore the variatons. Once we have done this we will have the
      majority of movements we will need in order to create just about any Trick
      we can think of!
    </div>
  );
}

const TLink = ({ href, title }) => {
  return (
    <Link href={href} className="text-zinc-300 underline">
      {title}
    </Link>
  );
};
