import React, { createContext } from "react";
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

export default PreviewWrapper;
