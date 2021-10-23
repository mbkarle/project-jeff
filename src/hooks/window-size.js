import { useEffect, useState } from "react";
import * as variables from "css/_export.module.scss";

const min = (...values) => {
  const existing = values.filter((val) => val != null);
  return Math.min(...existing);
};

const getWindowSize = (useMin) => {
  const choose = useMin ? min : Math.max;
  return {
    width: choose(window?.visualViewport?.width, window?.innerWidth),
    height: choose(window?.visualViewport?.height, window?.innerHeight),
  };
};

export const useWindowSize = (useMin) => {
  const [width, setWidth] = useState(() => getWindowSize().width);
  const [height, setHeight] = useState(() => getWindowSize().height);

  useEffect(() => {
    const handleResize = () => {
      const { width: w, height: h } = getWindowSize(useMin);
      setWidth(w);
      setHeight(h);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [useMin]);

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
