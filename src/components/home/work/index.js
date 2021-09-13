import * as styles from "./work.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";
import MD from "components/basics/md";
import { getImage } from "utils/data";

const EXAMPLE_TYPE = PropTypes.shape({
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.object.isRequired,
});

const Work = ({ examples }) => {
  return (
    <>
      <Separator />
      {examples.map(({ tags, title, description, img }, idx) => {
        const image = getImage(img);
        return (
          <div
            key={`example-${title}`}
            className={styles.exampleContainer + (idx % 2 === 1 ? " " + styles.left : "")}
          >
            <div className={styles.exampleContent}>
              <div className={styles.tagsContainer}>
                {tags.map((tag) => (
                  <Tag tag={tag} key={`tag-${tag}`} />
                ))}
              </div>
              <MD className={styles.exampleTitle}>{title}</MD>
              <MD className={styles.exampleDescription}>{description}</MD>
            </div>
            <div className={styles.imageContainer}>
              <GatsbyImage image={image} alt={`Picture of: ${title}`} />
            </div>
          </div>
        );
      })}
    </>
  );
};

Work.defaultProps = {
  examples: [],
};

Work.propTypes = {
  examples: PropTypes.arrayOf(EXAMPLE_TYPE),
};

const Separator = () => (
  <div className={styles.separatorContainer}>
    <div>Select Work</div>
    <div className={styles.separator} />
  </div>
);

const Tag = ({ tag }) => <MD className={styles.workTag}>{tag}</MD>;

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Work;
