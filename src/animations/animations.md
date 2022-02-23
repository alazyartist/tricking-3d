# What is happening

Our App
<br>&#8607; &#8607; &#8607; &#8607;<br>
React &#8602; Renders all Component Logic
<br> &#8595; &#8595; &#8595;<br>
React Three Fiber &#8602; Used to Write Declaritive Three.js
<br>&#8595; &#8595;<br>
Three.js &#8602; WebGl Abstraction Layer <br> &#8595;<br>
WebGl &#8602; Handles on Screen Painting of Final Render

## Model

We load in the models GLTF file and store it in the FrankAnim variable

```js
import FrankAnim from "../data/Frank.gltf";
```

## Animation Logic

We create the ref group with useRef() to apply to our model in the return of our function

```js
const group = useRef();
```

The animations are pulled in off of the [fbx-model-name].gltf and extracted into the animations variable using useGLTF(model) hook

```js
const { nodes, materials, animations } = useGLTF(FrankAnim);
```

The animations are applied to the useRef group using the useAnimations(animations, ref) hook.

```js
const { actions, names, mixer } = useAnimations(animations, group);
```

We extract actions, names, and mixer out of the animations object.

## Model Return

We return the model in a group with the ref={group} applied in the return of the function.

```js
export function Frank({ ...props }) {
	//Animation logic goes here
	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
				<primitive object={nodes.mixamorig1Hips} />
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
```

This component `<Frank />` can then be loaded into our scene which contains our camera, lighting, and objects in scene.js

```js
function TorqueScene(props) {
	return (
		<PerspectiveCamera makeDefualt position={[0, -2, 0]}>
			//Model
			<Frank />
			//Light
			<ambientLight intensity={0.1} />
			<spotLight
				ref={light2}
				color={"#FF0000"}
				intensity={3}
				position={[0, 2, 5]}
			/>
			<spotLight
				ref={light}
				color={"cyan"}
				intensity={3}
				position={[0, 2, -5]}
			/>
			//HDR Environment Preset (affects lighting)
			<Environment preset='park' />
			//Camera Controller
			<OrbitControls />
		</PerspectiveCamera>
	);
}
```
