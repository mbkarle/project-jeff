import * as styles from "./work.module.scss";

import React from "react";
import PropTypes from "prop-types";
import MD from "components/basics/md";
import Timeline from "./timeline";
import mergeDefaults from "utils/merge-defaults";

const Work = ({ title, description, recognition, timeline, ...otherProps }) => {
  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      <MD className={styles.title}>{title}</MD>
      <div className={styles.details}>
        <MD className={styles.description}>{description}</MD>
        <div className={styles.recognitionContainer}>
          <MD className={styles.recognitionTitle}>{recognition?.title}</MD>
          {recognition?.recognitions?.map(({ award }) => (
            <MD key={award} className={styles.award}>
              {award}
            </MD>
          ))}
        </div>
      </div>
      <Timeline timeline={timeline} />
    </div>
  );
};

Work.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  recognition: PropTypes.shape({
    title: PropTypes.string,
    recognitions: PropTypes.arrayOf(PropTypes.string),
  }),
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      role: PropTypes.string,
      dates: PropTypes.string,
    }),
  ),
};

export default Work;
