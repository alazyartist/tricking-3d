import { useState, useEffect } from "react";

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    if (typeof window === "undefined") setOrientation("portrait");

    const handleResize = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      );
    };
    window.addEventListener("orientationchange", handleResize);

    window.addEventListener("resize", handleResize);
    if (typeof window !== "undefined") {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      );
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return orientation;
};

export default useScreenOrientation;
