import { useState, useEffect } from "react";

const useScreenOrientation = () => {
  if (typeof window === "undefined") return "portrait";
  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? "landscape" : "portrait"
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return orientation;
};

export default useScreenOrientation;
