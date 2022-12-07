import React from "react";
import { pureSetups } from "../../data/trickDataModel/TrickObjects";
function Setups() {
  return (
    <div className="mt-4 flex flex-col place-content-center place-items-center font-inter text-zinc-400">
      <div className="flex w-[80vw] flex-col gap-4 font-normal">
        <div>
          <h1 className="w-full pb-0 text-left font-virgil text-xl text-zinc-300">
            Setups
          </h1>
          Setups are movements we perform in order to generate momentum and get
          into the starting position for a particular trick. Here we are
          primarily refering to pure setups as opposed to setup tricks or setup
          combos. However colloquially you will hear the term setup used to
          refer to all three.
        </div>
        <div>
          <h1 className="w-full pb-0 text-left font-virgil text-xl text-zinc-300">
            Pure-Setups
          </h1>
          Pure setups are the initial movements used to generate momentum and
          get into the starting position for the first Trick performed. These
          are the movements we use to get us from a standing unmoving position
          into one that is generating movement and momentum to be used in the
          upcoming Trick.
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {Object.keys(pureSetups).map((e, i) => (
            <div
              className="text-zinc-30 flex place-content-center place-items-center rounded-xl border-2 border-zinc-500 p-2 font-virgil"
              id={i.toString()}
            >
              <div className="text-center">{pureSetups[e]}</div>
            </div>
          ))}
        </div>
        <div>
          The pure setups generally include J-Step, K-Step, Euro-Step, Pivot,
          back-step, Spin Step, Skip Step, as well as Standing. Each of these is
          used to position the body in a different way depending on which Trick
          you want to perform.
        </div>
        <div>
          Many of these are just slight variations of simmilar ways into the
          same Tricks. Typically only having slight alterations made between
          them it us up to the Tricker which ones feel the best for a particular
          Trick.
        </div>
        <div>
          <h1 className="w-full pb-0 text-left font-virgil text-xl text-zinc-300">
            Options, not constraints.
          </h1>
          J-step, Euro-step, and Pivot for example are all ways to get into
          position where it is easy to perform a backswing. Standing, Skip-Step
          and Spin Step are common ways to get into position for a Bkick or
          Aerial style trick.
        </div>
        <div>
          This doesnt mean we are limited to these options. Any setup can be
          used to get into any trick you'd like, although its arguable that some
          are better suited for particular Tricks than others.
        </div>
        <div>
          <h1 className="w-full pb-0 text-left font-virgil text-xl text-zinc-300">
            Explore Your Way
          </h1>
          That's the joy of Tricking though, you get to make it your own through
          the way you approach things. So whichever setups you'd like to
          incorporate. Have at it! It can be extremely fun to put tricks
          together with setups that are unconventional, it also helps us build
          an understanding of how momentum flows through the body during
          movements, making some tricks easier and others more difficult to
          perform based on the setup we chose.
          <br /> Finding the right setup to use is one that will only come
          through exploration of each of these, as well as creating your own.
          The setups we listed here are just the main few that are consistently
          used. <br />
        </div>
        <div>
          <h1 className="w-full pb-0 text-left font-virgil text-xl text-zinc-300">
            Recap
          </h1>
          So the setups are what get us into the starting position of our first
          Trick. These are meant to work to our advantage in generating momentum
          to be used in execution of the Trick itself. This can make many tricks
          possible that (at first) could not easily be done from standing. We
          will be getting to the elements of the Tricks themselves in just a
          moment but first let's talk about how we "Transition" between two
          Tricks.
        </div>
      </div>
      <h1 className="p-4 pb-0 font-virgil text-xl text-zinc-300">
        Pure Setups
      </h1>

      <div className="p-4 font-virgil text-xl text-zinc-300">
        Setup/Transitional Tricks
      </div>
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
