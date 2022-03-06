
import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store/store";
import * as THREE from "three";
import FrankAnim from "../data/Frank-SA.gltf";
import AnimsForFrank from "../data/Frank.gltf";

export default function MediaController() {
  return (
  <></>
  );
}

useGLTF.preload(FrankAnim);
useGLTF.preload(AnimsForFrank);
