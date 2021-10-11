import * as styles from "./md.module.scss";

import React from "react";
import ReactMarkdown from "react-markdown";
import mergeDefaults from "utils/merge-defaults";

const MD = (props) => (
  <ReactMarkdown
    components={{
      p: (props) => {
        // default to use divs instead of p
        return <div {...props} />;
      },
    }}
    {...mergeDefaults({ className: styles.md }, props)}
  />
);

export default MD;
