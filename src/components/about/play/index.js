import * as styles from "./play.module.scss";

import React from "react";
import PropTypes from "prop-types";
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

Play.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
};

export default Play;
