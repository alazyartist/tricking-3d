import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TorqueScene } from "../scenes/Scene";
import Loader from "../components/Loader";
import { AiFillDownCircle, AiFillRightCircle } from "react-icons/ai";
function CanvasComponent() {
	const min = 54;
	let initialWidth = 0,
		initialHeight = 0,
		mouseX = 0,
		mouseY = 0;

	useEffect(() => {
		const element = document.getElementById("Resizeable");
		const button = document.getElementById("Draggable");

		//Mousedown event to control scaling with scale() and to add mouseup event to stop scaling with stop()
		button.addEventListener("mousedown", function (e) {
			getMousePositions(e);
			getElementDimensions();
			window.addEventListener("mousemove", scale);
			window.addEventListener("mouseup", removeScale);
		});

		//Get x and y mouse position
		function getMousePositions(e) {
			mouseX = e.pageX;
			mouseY = e.pageY;
		}

		//Get element height and width make property a number
		function getElementDimensions() {
			initialWidth = element.clientWidth;
			initialHeight = element.clientHeight;
		}

		//Sets the width and height bases on how the mouse moves to scale the element
		function scale(e) {
			const width = initialWidth + (e.pageX - mouseX);
			const height = initialHeight + (e.pageY - mouseY);
			if (width > min) {
				element.style.width = width + "px";
			}
			if (height > min) {
				element.style.height = height + "px";
			}
		}

		//Removes the scale() function to stop scaling element
		function removeScale() {
			window.removeEventListener("mousemove", scale);
		}

		//Mobile event listeners
		button.addEventListener("touchstart", function (e) {
			e.preventDefault();
			getAxisPositions(e);
			getElementDimensions();
			window.addEventListener("touchmove", scaleMobile);
			window.addEventListener("touchend", removeScaleMobile);
		});

		//Scale function for mobile
		function scaleMobile(e) {
			const width = initialWidth + (e.touches[0].pageX - mouseX);
			const height = initialHeight + (e.touches[0].pageY - mouseY);
			if (width > min) {
				element.style.width = width + "px";
			}
			if (height > min) {
				element.style.height = height + "px";
			}
		}

		//Mobile get touch location
		function getAxisPositions(e) {
			mouseX = e.touches[0].pageX;
			mouseY = e.touches[0].pageY;
		}
		console.log(mouseX);
		//Removes Mobile Scale
		function removeScaleMobile() {
			window.removeEventListener("touchmove", scaleMobile);
		}
	}, []);

	return (
		<div className='md:flex'>
			<Canvas
				id='Resizeable'
				className='sticky z-[1000] min-h-[40] min-w-full max-w-full md:min-h-screen md:min-w-[500px]'>
				<Suspense fallback={<Loader />}>
					<TorqueScene />
				</Suspense>
			</Canvas>
			<div
				id='Draggable'
				className='flex h-[30px] cursor-s-resize justify-center bg-gray-800 align-middle text-gray-500 md:hidden'>
				<AiFillDownCircle />
			</div>
		</div>
	);
}

export default CanvasComponent;
