import * as styles from "./separator.module.scss";

import React from "react";
import mergeDefaults from "utils/merge-defaults";

const Separator = (props) => <div {...mergeDefaults({ className: styles.separator }, props)} />;

export default Separator;
