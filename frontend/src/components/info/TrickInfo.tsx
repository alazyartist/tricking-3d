import React, { useEffect, useState } from "react";
import { useStore } from "@store/store";
import { TrickInformation } from "../../data/TrickInfoJson";
import Interact from "@old_pages/dash/components/Interact";
import TrickInfoComments from "./TrickInfoComments";
import { useGetTricksById } from "../../api/useGetTricks";
import { useGetComboById } from "../../api/useGetCombos";
import TrickOrComboDetails from "./trickInfo/TrickOrComboDetails";
import useGetTricks from "../../api/useGetTricks";
import useGetCombos from "../../api/useGetCombos";
import { FaKey } from "react-icons/fa";
export default function TrickInfo() {
  const setInfo = useStore((state) => state.setInfo);
  const [count, setCount] = useState(0);
  const trick_id = useStore((state) => state.trick_id);
  const trickOrCombo = useStore((state) => state.trickOrCombo);
  const [details, setDetails] = useState<undefined | any>();
  const currentAnim = useStore((s) => s.currentAnim);
  const setTrick_id = useStore((s) => s.setTrick_id);
  const setTrickOrCombo = useStore((s) => s.setTrickOrCombo);
  const { data: tricks } = useGetTricks();
  const { data: combos } = useGetCombos();
  const { data: trickDetails } = useGetTricksById(trick_id);
  const { data: comboDetails } = useGetComboById(trick_id);
  useEffect(() => {
    if (trickOrCombo === "Trick") {
      setDetails(trickDetails);
    } else if (trickOrCombo === "Combo") {
      setDetails(comboDetails);
    }
  }, [trick_id, comboDetails, trickDetails]);
  useEffect(() => {
    console.log(details);
  }, [details]);

  useEffect(() => {
    let tid =
      (tricks?.length &&
        combos?.length &&
        tricks?.filter((trick) =>
          trick?.name?.toLowerCase().includes(currentAnim.toLowerCase())
        )[0]?.trick_id) ||
      combos?.filter((trick) =>
        trick.name.toLowerCase().includes(currentAnim.toLowerCase())
      )[0]?.combo_id;

    let comboOrTrick =
      (tricks?.length &&
        combos?.length &&
        tricks?.filter((trick) =>
          trick?.name?.toLowerCase().includes(currentAnim.toLowerCase())
        )[0]?.type) ||
      combos?.filter((trick) =>
        trick.name.toLowerCase().includes(currentAnim.toLowerCase())
      )[0]?.type;

    setTrick_id(tid);
    setTrickOrCombo(comboOrTrick);
  }, [tricks, currentAnim]);
  const TrickInfoText = TrickInformation[currentAnim]?.toString();

  return (
    <>
      <div
        id="modal-conatiner"
        className="h-full w-full"
      >
        <div id="trick-info-containers-reposition" >
          <div
            id="trick-info-container"
            className="flex h-auto w-auto flex-col place-items-center p-4 align-middle text-zinc-200 "
          >
            <h2
              id="trick-info-header"
              className="justify-center text-3xl font-black "
            >
              {currentAnim}
            </h2>
            <div className="my-2 flex gap-3">
              <h5>{trickOrCombo}</h5>
              {details?.[0]?.trickType && (
                <h5>
                  <span className="pr-2">|</span> {details?.[0]?.trickType}
                </h5>
              )}
            </div>
            <TrickOrComboDetails
              details={details?.[0]}
              trickOrCombo={trickOrCombo}
            />
          </div>
          <InfoKey />
        </div>
        {/*
        <TrickInfoComments count={count} />
        <Interact count={count} setCount={setCount} />
        */}
      </div>
    </>
  );
}

const InfoKey = () => {
  const [keyVisible, showKey] = useState(false);
  return keyVisible ? (
    <div
      onClick={() => showKey(!keyVisible)}
      className="flex flex-row gap-2 text-zinc-300"
    >
      <div className="flex items-center gap-2 text-sm">
        <div className="h-6 w-6 rounded-full bg-zinc-400" />
        <span>Base</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="h-6 w-6 rounded-full bg-purple-400" />
        <span>Variation</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="h-6 w-6 rounded-full bg-zinc-700" />
        <span>Trick</span>
      </div>
    </div>
  ) : (
    <FaKey
      onClick={() => showKey(!keyVisible)}
      className="text-zinc-300"
    />
  );
};
