import React from "react";
import { pureSetups } from "../../data/trickDataModel/TrickObjects";
function Setups() {
  return (
    <div className="mt-4 flex flex-col place-content-center place-items-center font-inter font-bold text-zinc-300">
      <div className="pb-4 text-xl text-white">Pure Setups</div>
      {Object.keys(pureSetups).map((e, i) => (
        <div className="flex" id={i.toString()}>
          <div>{pureSetups[e]}</div>
        </div>
      ))}

      <div className="w-[80vw] pt-4">
        Setups are movements we perform in order to generate momentum and get
        into the starting position for a particular trick. Here we are primarily
        refering to pure setups as opposed to setup tricks or setup combos.
        However colloquially you will hear the term setup used to refer to all
        three.
        <br />
        <br /> Pure setups are the initial movements used to generate momentum
        and get into the starting position for the first Trick performed. <br />
        <br />
        These are the movements we use to get us from a standing unmoving
        position into one that is generating movement and momentum to be used in
        the upcoming Trick.
        <br />
        <br /> The pure setups generally include J-Step, K-Step, Euro-Step,
        Pivot, back-step, Spin Step, Skip Step, as well as Standing. Each of
        these is used to position the body in a different way depending on which
        Trick you want to perform.
        <br />
        <br /> Many of these are just slight variations of simmilar ways into
        the same Tricks. Typically only having slight alterations made between
        them it us up to the Tricker which ones feel the best for a particular
        Trick. <br />
        <br />
        J-step, Euro-step, and Pivot for example are all ways to get into
        position where it is easy to perform a backswing. Standing, Skip-Step
        and Spin Step are common ways to get into position for a Bkick or Aerial
        style trick. <br />
        <br /> This doesnt mean we are limited to these options. Any setup can
        be used to get into any trick you'd like, although its arguable that
        some are better suited for particular Tricks than others.
        <br />
        <br />
        That's the joy of Tricking though, you get to make it your own through
        the way you approach things. So whichever setups you'd like to
        incorporate. Have at it! It can be extremely fun to put tricks together
        with setups that are unconventional, it also helps us build an
        understanding of how momentum flows through the body during movements,
        making some tricks easier and others more difficult to perform based on
        the setup we chose.
        <br />
        <br /> Finding the right setup to use is one that will only come through
        exploration of each of these, as well as creating your own. The setups
        we listed here are just the main few that are consistently used. <br />
        <br />
        So the setups are what get us into the starting position of our first
        Trick. These are meant to work to our advantage in generating momentum
        to be used in execution of the Trick itself. This can make many tricks
        possible that (at first) could not easily be done from standing. We will
        be getting to the elements of the Tricks themselves in just a moment but
        first let's talk about how we "Transition" between two Tricks.
      </div>
      <div className="p-4 text-xl text-white">Setup/Transitional Tricks</div>
      <div>Cartwheel</div>
      <div>Round-Off</div>
      <div>Aerial</div>
      <div>Gumbi</div>
      <div>Raiz</div>
      <div>TouchdownRaiz</div>
      <div>BackHandspring</div>
      <div>Macacao</div>
      <div>Scoot</div>
      <div>MasterScoot</div>
      <div>Hook</div>
    </div>
  );
}

export default Setups;
