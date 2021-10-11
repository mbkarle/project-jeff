import * as styles from "./intro.module.scss";

import React from "react";
import PropTypes from "prop-types";
import Image from "components/basics/image";
import mergeDefaults from "utils/merge-defaults";
import MD from "components/basics/md";

const Intro = ({ header, description, image, alt, ...otherProps }) => {
  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      <div className={styles.header}>{header}</div>
      <MD className={styles.description}>{description}</MD>
      <div className={styles.imageContainer}>
        <Image image={image} alt={alt} />
      </div>
    </div>
  );
};

Intro.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  alt: PropTypes.string,
};

export default Intro;
