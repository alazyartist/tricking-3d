import { useEffect, useRef } from "react";

const useClickOutside = (callback) => {
  const ref = useRef(null);
  const handleClick = (e) => {
    if (!ref.current?.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return ref;
};

export default useClickOutside;
