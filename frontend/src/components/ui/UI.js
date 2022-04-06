import React from 'react';
import ActiveDevNote from '../info/ActiveDevNote';
import Controller from '../media/Controller';
import DurationSlider from './DurationSlider';
import ModalNav from './ModalNav';

function UI () {

  return (
    <>
      <ModalNav />
      <ActiveDevNote />
      <div
        id="controller"
        className="fixed left-0 bottom-0 z-[2] w-full bg-opacity-50 p-4  md:left-[10vw] md:w-[80vw] xl:left-[30vw] xl:w-[40vw]"
      >
        <DurationSlider />
        <Controller />
      </div>
    </>
  );
}

export default UI;
