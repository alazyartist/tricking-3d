import React from "react";
import Dropdown from "@components/Dropdown";
import { useStore } from "@store/store";
import { useRouter } from "next/router";
// import { useNavigate } from "react-router-dom";
function ModelDropdown() {
  const activeModel = useStore((state) => state.activeModel);
  const modelArray = useStore((state) => state.modelArray);
  const setModel = useStore((state) => state.setModel);
  const selectAnim = useStore((s) => s.selectAnim);
  const currentAnim = useStore((s) => s.currentAnim);
  const navigate = useRouter();
  return (
    <Dropdown
      buttonName={activeModel}
      buttonMap={modelArray}
      f={(e) => {
        // selectAnim("Backflip");
        setModel(e);
        // selectAnim("Backflip");
        navigate.push(`/3d/sandbox/${e}`);
      }}
    />
  );
}

export default ModelDropdown;
