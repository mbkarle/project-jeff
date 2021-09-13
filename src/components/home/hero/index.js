import * as styles from "./hero.module.scss";

import React from "react";
import PropTypes from "prop-types";
import mergeDefaults from "utils/merge-defaults";
import Tabbable from "components/basics/tabbable";

const HERO_TYPES = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  summaries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
};

const Hero = ({ header, subheader, summaries, ...otherProps }) => (
  <div {...mergeDefaults({ className: styles.hero }, otherProps)}>
    <div className={styles.heroHeaderContent}>
      <div className={styles.heroHeader}>{header}</div>
      <div className={styles.heroSubHeader}>{subheader}</div>
    </div>
    <HeroSummaries summaries={summaries} />
  </div>
);

Hero.propTypes = {
  header: HERO_TYPES.header.isRequired,
  subheader: HERO_TYPES.subheader.isRequired,
  summaries: HERO_TYPES.summaries.isRequired,
};

const HeroSummaries = ({ summaries, ...otherProps }) => (
  <div {...mergeDefaults({ className: styles.heroSummaries }, otherProps)}>
    <Tabbable initialValue={summaries?.[0]?.label}>
      <div className={styles.tabContainer}>
        {summaries?.map(({ label }) => (
          <Tabbable.Tab key={`tab-${label}`} eventKey={label} className={styles.tab}>
            {label}
          </Tabbable.Tab>
        ))}
      </div>
      {summaries?.map(({ label, text }) => (
        <Tabbable.View key={`view-${label}`} eventKey={label} className={styles.summaryText}>
          {text}
        </Tabbable.View>
      ))}
    </Tabbable>
  </div>
);

HeroSummaries.defaultProps = {
  summaries: [],
};
HeroSummaries.propTypes = {
  summaries: HERO_TYPES.summaries,
};

export default Hero;
