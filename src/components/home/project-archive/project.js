import * as styles from "./project.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";
import MD from "components/basics/md";
import mergeDefaults from "utils/merge-defaults";
import { getImage } from "utils/data";

const Project = ({ tags, title, description, image, ...otherProps }) => {
  const img = getImage(image);
  return (
    <div {...mergeDefaults({ className: styles.project }, otherProps)}>
      <div className={styles.image}>
        <GatsbyImage image={img} alt={`Picture of: ${title}`} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.tagsContainer}>
          {tags &&
            tags.map((tag) => (
              <MD className={styles.projectTag} key={`tag-${tag}`}>
                {tag}
              </MD>
            ))}
        </div>
        <div className={styles.title}>{title}</div>
        <MD className={styles.description}>{description}</MD>
      </div>
    </div>
  );
};

Project.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
};

export default Project;
