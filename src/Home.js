import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorqueScene } from "./Scene";
import Button from "./Button";
import ModelSelector from "./ModelSelector";
import AnimationSelectorButton from "./AnimationSelector";

export function Home() {
	// console.log(useStore((state) => state.animationsArray));

	//General Design Handled Here
	return (
		<div className='App'>
			<div className='App-header'>
				<div className='Canvas-container'>
					<Canvas>
						<Suspense fallback={null}>
							<TorqueScene />
							<gridHelper
								args={[10, 10, `white`, `gray`]}
								position={[0, 0, 0]}
							/>
						</Suspense>
					</Canvas>
				</div>
				<h1>An Interactive 3d Learning Experience</h1>
				<div className='btn-container'>
					<AnimationSelectorButton />
					<ModelSelector />
					<Button />
				</div>
				<a
					className='App-link'
					href='https://torquetricking.com'
					target='_blank'
					rel='noopener noreferrer'>
					Powered By Torque
				</a>
			</div>
		</div>
	);
}
