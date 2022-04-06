import React from 'react';

function ModalWrapper({handleClose, children}) {
  return (
    <div
      id="trick-info-modal-bg"
      className="fixed top-0 left-0 z-[-1] h-full w-full bg-zinc-800 bg-opacity-40 filter backdrop-blur-md"
      onClick={handleClose}
    >

      {children}

      {/* <button className="text-white" onClick={handleClose}>
          <h1>X</h1>
        </button> */}
    </div>
  );
}

export default ModalWrapper;
