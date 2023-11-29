import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import * as THREE from "three";
import React, { use, useEffect, useRef, useState } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  shaderMaterial,
} from "@react-three/drei";
import WaveShaderMaterial, { waveShaderMaterialType } from "shaders/WaveShader";
import CircleShader from "shaders/CircleShader";
import GridShader from "shaders/GridShader";
import { Frank } from "animations/Frank";
import CircleWipeShader from "shaders/CircleWipe";
extend({ THREE });
const Test = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Scene isPlaying={isPlaying} />
      <div
        onClick={() => setIsPlaying((prev) => !prev)}
        className="absolute bottom-4 left-[50vw] z-[50] h-fit rounded-md bg-zinc-300 p-2"
      >
        {isPlaying ? "Pause" : "Play"}
      </div>
    </>
  );
};

const FlatSquare = ({
  color,
  position,
  size,
  isPlaying,
}: {
  color?: THREE.Color;
  position?: THREE.Vector3;
  isPlaying: boolean;
  size: [width: number | undefined, height: number | undefined];
}) => {
  const ref = useRef<THREE.ShaderMaterial & waveShaderMaterialType>(null!);
  useFrame(({ clock }) => {
    if (ref.current && isPlaying) {
      ref.current.uTime = clock.getElapsedTime();
    }
  });
  return (
    <mesh position={position ? position : undefined}>
      <planeGeometry args={[...size, 300, 300]} />
      <waveShaderMaterial
        ref={ref}
        // wireframe
        key={WaveShaderMaterial.key}
        attach={"material"}
        side={THREE.DoubleSide}
        uColor={color ? color : undefined}
      />
    </mesh>
  );
};
const Circle = ({
  color,
  position,
  size,
  isPlaying,
}: {
  color?: THREE.Color;
  position?: THREE.Vector3;
  isPlaying: boolean;
  size?: [width: number | undefined, height: number | undefined];
}) => {
  const ref = useRef<THREE.ShaderMaterial & waveShaderMaterialType>(null!);
  useFrame(({ clock, raycaster }) => {
    if (ref.current && isPlaying) {
      ref.current.uTime = clock.getElapsedTime();
    }
    if (ref.current) {
    }
  });
  return (
    <mesh position={position ? position : undefined}>
      <planeGeometry args={[5, 5, 300, 300]} />
      <gridShader
        ref={ref}
        // wireframe
        key={GridShader.key}
        attach={"material"}
        side={THREE.DoubleSide}
        uColor={color ? color : undefined}
      />
      {/* <meshBasicMaterial color={"hotpink"} /> */}
    </mesh>
  );
};
const CircleWipe = ({
  color,
  position,
  size,
  isPlaying,
}: {
  color?: THREE.Color;
  position?: THREE.Vector3;
  isPlaying: boolean;
  size?: [width: number | undefined, height: number | undefined];
}) => {
  const ref = useRef<THREE.ShaderMaterial & waveShaderMaterialType>(null!);
  const ref1 = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, "/Stances.png");
  useFrame(({ clock, raycaster, pointer, camera }) => {
    raycaster.setFromCamera(pointer, camera);
    if (ref.current && ref1.current) {
      if (texture) {
        ref.current.uniforms.uTexture.value = texture;
      }
      ref.current.uTime = clock.getElapsedTime();
      const intersect = raycaster.intersectObject(ref1.current)[0];
      if (intersect) {
        ref.current.uniforms.uMouse.value = intersect.uv;
      }
    }
    if (ref.current) {
    }
  });
  return (
    <mesh ref={ref1} position={position ? position : undefined}>
      {/* <planeGeometry args={[5, 5, 300, 300]} /> */}
      <circleGeometry args={[3, 300]} />
      <circleWipeShader
        ref={ref}
        // wireframe
        key={CircleWipeShader.key}
        attach={"material"}
        side={THREE.DoubleSide}
        uColor={color ? color : undefined}
      />
      {/* <meshBasicMaterial color={"hotpink"} /> */}
    </mesh>
  );
};
const Grids = ({
  color,
  position,
  size,
  isPlaying,
  flat,
  setFlat,
}: {
  color?: THREE.Color;
  position?: THREE.Vector3;
  isPlaying: boolean;
  size?: [width: number | undefined, height: number | undefined];
  flat: boolean;
  setFlat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref1 = useRef<THREE.Mesh>(null!);
  const ref = useRef<THREE.ShaderMaterial & waveShaderMaterialType>(null!);
  const rot = new THREE.Euler(-Math.PI / 2, 0, -Math.PI);
  const rot2 = new THREE.Euler(0, 0, 0);
  const pos = new THREE.Vector3(0, -3, 0);
  const pos2 = new THREE.Vector3(0, 1, 3);
  const pos3 = new THREE.Vector3();
  const { scene } = useThree();
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([pos, pos]);
  const line = new THREE.Line(lineGeometry, lineMaterial);
  //add and remove line
  //   console.log(texture);
  useEffect(() => {
    scene.add(line);
    return () => {
      scene.remove(line);
    };
  }, [flat]);
  const point = new THREE.Vector3();
  const point2 = new THREE.Vector3();
  const point3 = new THREE.Vector3();
  const points = [point, point2, point3];
  const raycasters = points.map((p) => {
    return new THREE.Raycaster(p, pos2);
  });
  useFrame(({ clock, pointer, raycaster, camera, scene }) => {
    if (ref.current && isPlaying) {
      ref.current.uTime = clock.getElapsedTime();
    }
    pos3.copy(camera.position);
    pos3.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(12));

    pos2.copy(pos3);
    scene
      .getObjectByName("mixamorig1Hips")
      ?.getWorldPosition(point) as THREE.Vector3;
    scene.getObjectByName("mixamorig1LeftFoot")?.getWorldPosition(point2);
    scene.getObjectByName("mixamorig1RightFoot")?.getWorldPosition(point3);
    if (ref.current && ref1.current) {
      raycasters.forEach((r, i) => {
        r.set(points[i], pos);
      });
      raycasters.forEach((r, i) => {
        const intersects = r.intersectObject(ref1.current);
        if (intersects.length > 0) {
          if (i === 1) {
            ref.current.uniforms.uLF.value = intersects[0].uv;
          }
          if (i === 2) {
            ref.current.uniforms.uRF.value = intersects[0].uv;
          }
          // ref.current.uniforms.uRF.value = intersects?.[1]?.uv;
        } else {
          line.geometry = new THREE.BufferGeometry().setFromPoints([
            point,
            pos,
          ]);
        }
      });
      raycaster.set(point, pos);
      const intersect = raycaster.intersectObject(ref1.current)[0];
      if (intersect) {
        line.geometry = new THREE.BufferGeometry().setFromPoints([
          point,
          intersect.point,
        ]);
      }
      if (ref1.current) {
        const time = clock.getElapsedTime();
        const quat = new THREE.Quaternion().setFromEuler(flat ? rot : rot2);
        //add camera roation to quat
        const quat2 = new THREE.Quaternion().setFromEuler(
          camera.rotation as THREE.Euler
        );
        quat2.multiply(quat);
        ref1.current.quaternion.slerp(flat ? quat : quat2, 0.0569);
        ref1.current.position.lerp(flat ? pos : pos2, 0.0569);
      }
      //   ref1.current.position.lerp(point.sub(new THREE.Vector3(0, 1, 0)), 0.0569);
      ref1.current.position.lerp(
        point.sub(new THREE.Vector3(0, 0.97, 0)),
        0.569
      );
    }
  });

  const s = size ?? [20, 40];

  return (
    <>
      <OrbitControls enabled={flat} />
      <mesh
        onClick={() => setFlat((p) => !p)}
        ref={ref1}
        position={position ? position : pos2}
      >
        <circleGeometry args={[...s, 300]} />
        <circleShader
          ref={ref}
          // wireframe
          key={CircleShader.key}
          attach={"material"}
          side={THREE.DoubleSide}
          uColor={color ? color : undefined}
        />
        {/* <meshBasicMaterial color={"hotpink"} /> */}
      </mesh>
    </>
  );
};
const Scene = ({ isPlaying }) => {
  const [flat, setFlat] = useState(true);
  return (
    <div className="h-[100vh] p-8">
      <Canvas className="h-[100vh] w-[100vw] bg-zinc-300">
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />

        <Frank visible={flat} position={new THREE.Vector3(0, -3, 0)} />
        <FlatSquare
          position={new THREE.Vector3(1, 0, -6)}
          isPlaying={isPlaying}
          size={[4, 6]}
          color={new THREE.Color(0.3, 0.5, 0.9)}
        />
        <OrbitControls />
        <Grids
          flat={flat}
          setFlat={setFlat}
          isPlaying={isPlaying}
          size={[5, 50]}
          color={new THREE.Color(0.9, 0.2, 0.3)}
        />

        <CircleWipe
          isPlaying={isPlaying}
          position={new THREE.Vector3(-3, 0, 3)}
        />
        <Circle isPlaying={isPlaying} position={new THREE.Vector3(8, 0, 3)} />
        {/* <ambientLight intensity={0.1} /> */}
        <pointLight
          color={new THREE.Color(0xffffff)}
          position={[0, 0.5, 0.59]}
          power={500}
        />
        <pointLight
          color={new THREE.Color(0xff219)}
          position={[0, 1, 1]}
          power={300}
        />
        <pointLight
          color={new THREE.Color(0xffffff)}
          position={[0, 1, 3]}
          intensity={8}
        />
      </Canvas>
    </div>
  );
};

export default Test;
