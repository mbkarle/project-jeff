import React, { createContext } from "react";
import PropTypes from "prop-types";
import { LocationProvider, createHistory, createMemorySource } from "@reach/router";

export const PreviewContext = createContext({});

const PreviewWrapper = ({ pathname, children }) => {
  const source = createMemorySource(pathname);
  const history = createHistory(source);
  return (
    <LocationProvider value={history}>
      <PreviewContext.Provider value={{ isPreview: true }}>{children}</PreviewContext.Provider>
    </LocationProvider>
  );
};

PreviewWrapper.propTypes = {
  pathname: PropTypes.string,
  children: PropTypes.node,
};

export default PreviewWrapper;
