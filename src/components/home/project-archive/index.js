import * as styles from "./project-archive.module.scss";

import React from "react";
import PropTypes from "prop-types";
import mergeDefaults from "utils/merge-defaults";
import Project from "./project";

const ProjectArchive = ({ header, dateDescription, subheader, projects, ...otherProps }) => {
  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      <div className={styles.dateDescription}>{dateDescription}</div>
      <div className={styles.header}>{header}</div>
      <div className={styles.subheader}>{subheader}</div>
      <div className={styles.projectContainer}>
        {projects.map((project, idx) => (
          <Project key={idx} {...project} className={styles.project} />
        ))}
      </div>
    </div>
  );
};

ProjectArchive.propTypes = {
  header: PropTypes.string,
  dateDescription: PropTypes.string,
  subheader: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object),
};

export default ProjectArchive;
