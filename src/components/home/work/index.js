import * as styles from "./work.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import MD from "components/basics/md";

const EXAMPLE_TYPE = PropTypes.shape({
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
});

export const WORK_DATA = {
  examples: [
    {
      tags: ["UX/UI Design", "Responsive Web"],
      title: "Nudging students to give better feedback",
      description: `I redesigned our feedback mechanics by providing students with better guidance and structure for how to give feedback, increasing the average length of feedback by **56%** and feedback comment submission by **88%**.`,
      img: "../../../images/work/nudge.png",
    },
  ],
};

const Work = ({ examples }) => {
  return (
    <>
      <Separator />
      {examples.map(({ tags, title, description, img }, idx) => (
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
            <StaticImage
              src={"../../../images/work/nudge.png"}
              alt={`Image of ${title}`}
              placeholder="blurred"
              layout="constrained"
            />
          </div>
        </div>
      ))}
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
