import { useEffect, useState } from "react";
import * as variables from "css/_export.module.scss";

const getWindowSize = () => {
  return {
    width: window.visualViewport?.width || window.innerWidth,
    height: window.visualViewport?.height || window.innerHeight,
  };
};

export const useWindowSize = () => {
  const [width, setWidth] = useState(() => getWindowSize().width);
  const [height, setHeight] = useState(() => getWindowSize().height);

  useEffect(() => {
    const handleResize = () => {
      const { width: w, height: h } = getWindowSize();
      setWidth(w);
      setHeight(h);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height };
};

const useIsAtWindowBreakpoint = (breakpoint) => {
  const { width } = useWindowSize();

  return width <= breakpoint;
};

export const useIsMobileSize = () => {
  return useIsAtWindowBreakpoint(variables.mobileBreakpoint);
};

export const useIsTabletSize = () => {
  return useIsAtWindowBreakpoint(variables.tabletBreakpoint);
};
