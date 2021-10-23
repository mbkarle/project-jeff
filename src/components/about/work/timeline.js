import * as styles from "./timeline.module.scss";

import React from "react";
import PropTypes from "prop-types";
import mergeDefaults from "utils/merge-defaults";
import { useIsTabletSize } from "hooks/window-size";

const EVENT_HEIGHT = 80;

const Timeline = ({ timeline, ...otherProps }) => {
  const isTablet = !useIsTabletSize();

  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      {timeline?.map((job, index) => (
        <Event
          key={`${job.company}-${job.dates}`}
          {...job}
          style={
            isTablet
              ? { marginTop: (index * EVENT_HEIGHT) / 2 }
              : { opacity: 0.4 + (0.6 * (index + 1)) / timeline.length }
          }
        />
      ))}
    </div>
  );
};

Timeline.propTypes = {
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      role: PropTypes.string,
      dates: PropTypes.string,
    }),
  ),
};

const maxLen = (str1, str2) => (str1?.length > str2?.length ? str1?.length : str2?.length) || 0;

const Event = ({ company, role, dates, ...otherProps }) => {
  const contentLen = maxLen(company, role) + (dates?.length || 0);
  const flex = contentLen + Math.log2(contentLen + 2);
  return (
    <div {...mergeDefaults({ className: styles.event, style: { flex } }, otherProps)}>
      <div className={styles.roleInfo}>
        <div className={styles.company}>{company}</div>
        <div className={styles.role}>{role}</div>
      </div>
      <div className={styles.dates}>{dates}</div>
    </div>
  );
};

Event.propTypes = {
  company: PropTypes.string,
  role: PropTypes.string,
  dates: PropTypes.string,
};

export default Timeline;
