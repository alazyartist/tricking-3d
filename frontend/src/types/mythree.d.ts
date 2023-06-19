import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
export interface MyGLTF extends GLTF {
  nodes: any;
  materials: any;
}
