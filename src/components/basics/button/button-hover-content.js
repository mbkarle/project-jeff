import * as styles from "./button.module.scss";

import React from "react";
import mergeDefaults from "utils/merge-defaults";

const ButtonHoverContent = (props) => (
  <div {...mergeDefaults({ className: styles.hoverContent }, props)} />
);

export default ButtonHoverContent;
