import * as styles from "./timeline.module.scss";

import React from "react";
import mergeDefaults from "utils/merge-defaults";

const EVENT_HEIGHT = 80;

const Timeline = ({ timeline, ...otherProps }) => {
  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      {timeline?.map((job, index) => (
        <Event
          key={`${job.company}-${job.dates}`}
          {...job}
          style={{ marginTop: (index * EVENT_HEIGHT) / 2 }}
        />
      ))}
    </div>
  );
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

export default Timeline;
