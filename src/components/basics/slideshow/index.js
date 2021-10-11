import React, { createContext, useContext, useState } from "react";

const SlideshowContext = createContext({});

const Slideshow = ({ initialSlide, ...otherProps }) => {
  const [activeKey, setActiveKey] = useState(initialSlide);
  return <SlideshowContext.Provider value={{ activeKey, setActiveKey }} {...otherProps} />;
};

const Slide = ({ eventKey, children }) => {
  const { activeKey } = useContext(SlideshowContext);
  const isActive = activeKey === eventKey;

  return isActive ? children : null;
};

const Tab = ({ eventKey, children }) => {
  const { activeKey, setActiveKey } = useContext(SlideshowContext);
  const activate = () => setActiveKey(eventKey);
  const isActive = activeKey === eventKey;

  return children({ activate, isActive });
};

Slideshow.Slide = Slide;
Slideshow.Tab = Tab;

export default Slideshow;
