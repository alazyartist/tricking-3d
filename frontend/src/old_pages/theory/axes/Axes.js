import React, { useRef, useEffect } from "react";
import AxesSketch from "./components/AxesSketch";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Circle,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Sphere,
  Torus,
} from "@react-three/drei";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrankFollowCam } from "@hooks/useFollowCam";
import useMediaController from "@hooks/useMediaController";

const Axes = () => {
  return (
    <div className="flex flex-col place-content-center place-items-center text-zinc-300">
      <div>Axes</div>
      {/* <AxesSketch className="h-80 w-80" /> */}
      <div className="h-80 w-full">
        <Canvas>
          <PerspectiveCamera position={[0, -1, 0]}>
            <Scene />
          </PerspectiveCamera>
        </Canvas>
      </div>
      <div className="w-[80%] text-sm font-light">
        Each of the base flips can be manipulated on these axes. 0 is the axis
        of the pure flips 45 is the axis cork 90 is the axis of the btwist
      </div>
    </div>
  );
};

export default Axes;

const Donut = React.forwardRef(
  ({ position, rotation, color, offset }, donutref) => {
    //   const donutref = useRef();

    useFrame(() => {
      // donutref.current.rotation.x += 0.002 + offset;
      // donutref.current.rotation.y += 0.002 + offset;
      // donutref.current.rotation.z += 0.002 + offset;
    });

    return (
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

const Scene = () => {
  const hipsRef = useRef();
  const donut1 = useRef();
  const donut2 = useRef();
  const donut3 = useRef();
  const donut = useRef();
  const sphereRef = useRef();

  console.log(donut.current);
  useFrame(() => {
    // donut.current.rotation.x = hipsRef.current.rotation.x;
    // donut.current.rotation.y = hipsRef.current.rotation.y;
    // donut.current.rotation.z = hipsRef.current.rotation.z;

    const box = new THREE.Box3().setFromObject(donut.current);

    const center = box.getCenter(new THREE.Vector3());
    // donut.current.quaternion.slerp(hipsRef.current.quaternion, 0.01);

    donut.current.position.x = hipsRef?.current.position.x * 0.01;
    donut.current.position.y = hipsRef?.current.position.y * 0.01;
    donut.current.position.z = hipsRef.current.position.z * 0.01;
    // donut.current.rotation.y = hipsRef.current.rotation.y;
    // donut1.current.rotation.y = hipsRef.current.rotation.y;
    // donut1.current.rotation.z = hipsRef.current.rotation.z;
    // donut1.current.rotation.y += 0.01;
    sphereRef.current.position.x = center.x;
    sphereRef.current.position.y = center.y;
    sphereRef.current.position.z = center.z;
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} />

      <Frank hipsRef={hipsRef} />
      <Sphere ref={sphereRef} args={[0.05, 32, 32]}>
        <meshStandardMaterial color="orange" />
      </Sphere>
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
          rotation={[0, Math.PI / 2, 0]}
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

  const { nodes, materials, animations } = useGLTF("/Frank2.glb");
  const { actions, names, mixer } = useAnimations(animations, group);

  useMediaController(actions, names, mixer);

  useFrankFollowCam(hipsRef);
  return (
    <group ref={group} {...props} dispose={null}>
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
