import React from "react";
import Dropdown from "@components/Dropdown";
import { useStore } from "@store/store";
import { useRouter } from "next/router";
function AnimationsDropwdown() {
  const animationsArray = useStore((s) => s.animationsArray);
  const selectAnim = useStore((s) => s.selectAnim);
  const currentAnim = useStore((s) => s.currentAnim);
  const currentModel = useStore((s) => s.activeModel);
  const navigate = useRouter();
  return (
    <>
      <Dropdown
        buttonName={currentAnim}
        buttonMap={animationsArray}
        f={(e) => {
          selectAnim(e);
          navigate.push(`/3d/sandbox/${currentModel}/${e}`);
        }}
      />
    </>
  );
}

export default AnimationsDropwdown;
