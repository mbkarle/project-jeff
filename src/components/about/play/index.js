import * as styles from "./play.module.scss";

import React from "react";
import CategoriesSlideshow from "./categories-slideshow";
import mergeDefaults from "utils/merge-defaults";

const Play = ({ title, categories, ...otherProps }) => {
  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      <div className={styles.title}>{title}</div>
      <CategoriesSlideshow categories={categories} />
    </div>
  );
};

export default Play;
