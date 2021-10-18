import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.visualViewport?.width || window.innerWidth;
      const h = window.visualViewport?.height || window.innerHeight;
      setWidth(w);
      setHeight(h);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height };
};

const MOBILE_BREAKPOINT = 600;

export const useIsMobileSize = () => {
  const { width } = useWindowSize();
  return width <= MOBILE_BREAKPOINT;
};
