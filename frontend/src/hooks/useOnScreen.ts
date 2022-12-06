import { useEffect, useState } from "react";
interface Options {
  root?: any;
  rootMargin?: string;
  threshold?: number | number[];
}
const useOnScreen = (options: Options) => {
  const [ref, setRef] = useState<any>(null);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const iobserver = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting);
    }, options);
    if (ref) {
      iobserver.observe(ref);
    }

    return () => {
      if (ref) {
        iobserver.unobserve(ref);
      }
    };
  }, [ref, options]);
  return [setRef, onScreen];
};

export default useOnScreen;
