import React, {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  ChangeEvent,
  ForwardedRef,
} from "react";
import AxesSketch from "./components/AxesSketch";
import * as THREE from "three";
import { Mesh } from "three";
import { Canvas, Euler, Vector3, useFrame } from "@react-three/fiber";
import {
  Circle,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Sphere,
  Torus,
} from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrankFollowCam } from "@hooks/useFollowCam";
import useMediaController from "@hooks/useMediaController";
import { MyGLTF } from "types/mythree";

const Axes = () => {
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [rotZ, setRotZ] = useState<number>(0);
  return (
    <div className="flex flex-col place-content-center place-items-center text-zinc-300">
      <div>Axes</div>
      {/* <AxesSketch className="h-80 w-80" /> */}
      <div className="h-80 w-full">
        <Canvas>
          {/* @ts-ignore */}
          <PerspectiveCamera position={[0, -1, 0]}>
            <Scene rotX={rotX} rotY={rotY} rotZ={rotZ} />
          </PerspectiveCamera>
        </Canvas>
      </div>
      <div className="flex gap-2">
        <div className="p-2 text-sm">
          <p className="w-full text-center">X:{rotX}</p>
          <input
            type="range"
            className="p-2 text-sm"
            value={rotX}
            max={360}
            step={1}
            onChange={(e) => setRotX(parseFloat(e.target.value))}
          />
        </div>
        <div className="p-2 text-sm">
          <p className="w-full text-center">Y:{rotY}</p>
          <input
            type="range"
            className="p-2 text-sm"
            value={rotY}
            max={360}
            step={1}
            onChange={(e) => setRotY(parseFloat(e.target.value))}
          />
        </div>
        <div className="p-2 text-sm">
          <p className="w-full text-center">Z:{rotZ}</p>
          <input
            type="range"
            className="p-2 text-sm"
            value={rotZ}
            max={360}
            step={1}
            onChange={(e) => setRotZ(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="w-[80%] text-sm font-light">
        Each of the base flips can be manipulated on these axes. 0 is the axis
        of the pure flips 45 is the axis cork 90 is the axis of the btwist
      </div>
    </div>
  );
};

export default Axes;
interface DonutProps {
  position: Vector3;
  rotation: Euler;
  color: string;
  offset: number;
}
const Donut = React.forwardRef(
  (
    { position, rotation, color, offset }: DonutProps,
    donutref: ForwardedRef<any>
  ) => {
    //   const donutref = useRef();

    useFrame(() => {
      // donutref.current.rotation.x += 0.002 + offset;
      // donutref.current.rotation.y += 0.002 + offset;
      // donutref.current.rotation.z += 0.002 + offset;
    });

    return (
      // @ts-ignore
      <Torus
        args={[1.5, 0.02, 16, 100]}
        ref={donutref}
        position={position}
        rotation={rotation}
      >
        <meshStandardMaterial color={color} />
      </Torus>
    );
  }
);

const Scene = ({ rotX, rotY, rotZ }) => {
  const hipsRef = useRef<Mesh>();
  const donut1 = useRef<Mesh>();
  const donut2 = useRef<Mesh>();
  const donut3 = useRef<Mesh>();
  const donut = useRef<Mesh>();
  const sphereRef = useRef<Mesh>();

  console.log(hipsRef.current);
  useFrame(() => {
    // donut.current.rotation.x = hipsRef.current.rotation.x;
    // donut.current.rotation.y = hipsRef.current.rotation.y;
    // donut.current.rotation.z = hipsRef.current.rotation.z;

    const box = new THREE.Box3().setFromObject(donut.current);

    const center = box.getCenter(new THREE.Vector3());
    donut.current.position.x = hipsRef.current.position.x * 0.01;
    donut.current.position.y = hipsRef.current.position.y * 0.01;
    donut.current.position.z = hipsRef.current.position.z * 0.01;
    donut1.current.rotation.x = Math.PI / 2 - degToRad(rotX);
    donut2.current.rotation.y = degToRad(rotY);
    donut3.current.rotation.y = Math.PI / 2 - degToRad(rotZ);

    // donut1.current.rotation.z = hipsRef.current.rotation.z;
    // donut1.current.quaternion.slerp(hipsRef.current.quaternion, 0.1);
    // donut2.current.quaternion.slerp(hipsRef.current.quaternion, 0.1);
    // donut3.current.quaternion.slerp(hipsRef.current.quaternion, 0.1);
    // donut1.current.rotation.y += 0.01;
    // sphereRef.current.position.x = hipsRef.current.position.x;
    // sphereRef.current.position.y = hipsRef.current.position.y;
    // sphereRef.current.position.z = hipsRef.current.position.z;
  });
  return (
    <>
      {/* @ts-ignore */}
      <ambientLight intensity={0.5} />
      {/* @ts-ignore */}
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} />

      <Frank visible={true} hipsRef={hipsRef} />
      {/* @ts-ignore */}
      <Sphere ref={sphereRef} args={[0.05, 32, 32]}>
        <meshStandardMaterial color="green" />
      </Sphere>
      {/* @ts-ignore */}
      <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} ref={donut}>
        <Donut
          ref={donut1}
          rotation={[Math.PI / 2, 0, 0]}
          offset={0}
          position={[0, 1.5, 0]}
          color="red"
        />
        <Donut
          ref={donut2}
          rotation={[0, 0, 0]}
          offset={0.001}
          position={[0, 1.5, 0]}
          color="orange"
        />
        <Donut
          ref={donut3}
          rotation={[0, 0, 0]}
          offset={0.002}
          position={[0, 1.5, 0]}
          color="blue"
        />
      </group>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        args={[32, 32]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color={"grey"} />
      </Plane>

      <OrbitControls />
    </>
  );
};

export function Frank({ ...props }) {
  const group = useRef();
  const hipsRef = props.hipsRef;
  //   HipsRef attached to skeletons Hips

  const { nodes, materials, animations } = useGLTF("/Frank2.glb") as MyGLTF;
  const { actions, names, mixer } = useAnimations(animations, group);

  useMediaController(actions, names, mixer);

  useFrankFollowCam(hipsRef);
  return (
    <group ref={group} {...props} scale={[1, 1, 1]} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive ref={props.hipsRef} object={nodes.mixamorig1Hips} />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Skin.geometry}
          material={materials.Ch36_Body}
          skeleton={nodes.Skin.skeleton}
        />
      </group>
    </group>
  );
}
