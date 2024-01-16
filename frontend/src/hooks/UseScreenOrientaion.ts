import { useState, useEffect } from "react";

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(
    window?.innerWidth > window?.innerHeight
      ? "landscape"
      : "portrait" ?? "portrait"
  );

  useEffect(() => {
    if (typeof window === "undefined") setOrientation("portrait");
    const handleResize = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      );
    };
    window.addEventListener("orientationchange", handleResize);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return orientation;
};

export default useScreenOrientation;
