import ModelLoader from "@components/loaders/ModelLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import CircleShader from "shaders/CircleShader";
import * as THREE from "three";
import { Frank } from "animations/Frank";
import { useStore } from "@store/store";
import StanceShader from "shaders/StanceShader";
import { stanceShaderType } from "shaders/StanceShader";
import useCreateVersions from "apppp/sandbox/components/ui/modal/useCreateVersions";
import MultiDonateButton from "@components/info/MultiDonateButton";
extend({ THREE });
const Stances3d = () => {
  const orbitRef = useRef<any>();
  const [flat, setFlat] = useState(true);
  const animSet = useCreateVersions();
  const animationsArray = useStore((s) => s.animationsArray);
  const selectAnim = useStore((state) => state.selectAnim);
  return (
    <>
      <div className="flex w-full flex-col place-items-center gap-1">
        <div className="flex w-full flex-col place-items-center">
          <h1 className="font-semibold text-zinc-300">
            this is a work in progress
          </h1>
          <p className="text-sm font-normal text-zinc-300">
            donations encourage development!
          </p>
        </div>
        <MultiDonateButton />
      </div>
      <Canvas className={"h-full w-full rounded-md bg-zinc-800"}>
        {/* @ts-ignore */}
        <PerspectiveCamera position={[0, -1, 0]}>
          <ambientLight intensity={0.3} />
          <spotLight
            //  @ts-ignore
            color={"whitesmoke"}
            power={200}
            position={[0, 2, 5]}
          />
          <spotLight
            //  @ts-ignore
            color={"whitesmoke"}
            power={200}
            position={[0, 2, -5]}
          />
          <Frank position={[0, 0, 0]} />
          <StanceDiagram flat={flat} setFlat={setFlat} />
          <OrbitControls ref={orbitRef} />
        </PerspectiveCamera>
      </Canvas>
      <div className="minimalistScroll flex h-[27vh] flex-col gap-2 overflow-y-scroll py-2 text-zinc-300">
        {animationsArray.map((anim, i) => {
          return (
            <button
              className="rounded-md bg-zinc-700 p-2"
              onClick={() => selectAnim(anim)}
            >
              {anim}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Stances3d;

const StanceDiagram = ({ flat, setFlat }) => {
  const circleRef = useRef<THREE.Mesh>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial & stanceShaderType>(null!);
  const { scene } = useThree();

  const stanceTexture = useLoader(THREE.TextureLoader, "/Stances.png");
  const pos = new THREE.Vector3(0, -3, 0);
  const pos2 = new THREE.Vector3(0, 0, 0);
  const pos3 = new THREE.Vector3();
  const point = new THREE.Vector3(0, 0, 0);
  const point2 = new THREE.Vector3(0, 0, 0);
  const point3 = new THREE.Vector3(0, 0, 0);
  const points = [point, point2, point3];
  const raycasters = points.map((p) => {
    return new THREE.Raycaster(p, pos2);
  });
  const rot = new THREE.Euler(-Math.PI / 2, 0, -Math.PI);
  const rot2 = new THREE.Euler(0, 0, 0);
  let lastPosition = new THREE.Vector3();
  useFrame(({ clock, camera, scene }) => {
    if (shaderRef.current) {
      shaderRef.current.uTime = clock.getElapsedTime();
    }
    pos3.copy(camera.position);
    pos3.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(6));
    pos2.copy(pos3);
    scene
      .getObjectByName("mixamorig1Hips")
      ?.getWorldPosition(point) as THREE.Vector3;
    scene.getObjectByName("mixamorig1LeftFoot")?.getWorldPosition(point2);
    scene.getObjectByName("mixamorig1RightFoot")?.getWorldPosition(point3);
    if (shaderRef.current) {
      if (stanceTexture) {
        shaderRef.current.uniforms.uTexture.value = stanceTexture;
      }
    }
    if (circleRef.current && shaderRef.current) {
      raycasters.forEach((r, i) => {
        r.set(points[i], pos);
      });
      raycasters.forEach((r, i) => {
        const intersects = r.intersectObject(circleRef.current);
        if (intersects.length > 0) {
          if (i === 1) {
            shaderRef.current.uniforms.uLF.value = intersects[0].uv;
          }
          if (i === 2) {
            shaderRef.current.uniforms.uRF.value = intersects[0].uv;
          }
        }
      });
    }

    if (circleRef.current) {
      const quat = new THREE.Quaternion().setFromEuler(flat ? rot : rot2);
      //add camera roation to quat
      const quat2 = new THREE.Quaternion().setFromEuler(
        camera.rotation as THREE.Euler
      );
      quat2.multiply(quat);
      circleRef.current.quaternion.slerp(quat, 0.569);
      circleRef.current.position.lerp(pos, 0.569);
    }

    circleRef.current.position.lerp(
      point.sub(new THREE.Vector3(0, point.y, 0)),
      1
    );
    // camera.position.lerp(point.sub(new THREE.Vector3(2, 0, 2)), 0.569);
    // const currentPosition = new THREE.Vector3();
    // scene.getObjectByName("mixamorig1Hips")?.getWorldPosition(currentPosition);

    // // Direction vector based on x and z components
    // const direction = new THREE.Vector3(
    //   currentPosition.x - lastPosition.x,
    //   Math.PI / 2, // Ignoring y component
    //   currentPosition.z - lastPosition.z
    // ).normalize();

    // // Convert direction vector to rotation
    // const forward = new THREE.Vector3(0, 0, 1);
    // const rotation = new THREE.Quaternion().setFromUnitVectors(
    //   forward,
    //   direction
    // );

    // // Apply this rotation to circleRef
    // if (circleRef.current) {
    //   circleRef.current.setRotationFromQuaternion(rotation);
    // }

    // // Update lastPosition for the next frame
    // lastPosition.copy(currentPosition);
  });

  return (
    <mesh
      onClick={() => setFlat((prev) => !prev)}
      ref={circleRef}
      position={[0, 0, 0]}
    >
      <circleGeometry args={[2, 20, 300]} />
      <stanceShader
        ref={shaderRef}
        attach="material"
        side={THREE.DoubleSide}
        key={StanceShader.key}
      />
    </mesh>
  );
};
