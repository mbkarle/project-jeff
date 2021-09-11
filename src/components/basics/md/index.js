import React from "react";
import ReactMarkdown from "react-markdown";

const MD = (props) => (
  <ReactMarkdown
    components={{
      p: (props) => {
        // default to use divs instead of p
        return <div {...props} />;
      },
    }}
    {...props}
  />
);

export default MD;
