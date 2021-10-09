import * as styles from "./contact.module.scss";

import React from "react";
import PropTypes from "prop-types";
import mergeDefaults from "utils/merge-defaults";
import MD from "components/basics/md";
import AvailableButton from "components/basics/available-button";
import Button from "components/basics/button";
import { useEmail } from "hooks/info";
import copyToClipboard from "utils/copy-to-clipboard";

const Contact = ({ cta, description, copyEmailText, ...otherProps }) => {
  const email = useEmail();
  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      <div className={styles.ctaSection}>
        <AvailableButton className={styles.availableButton} />
        <div className={styles.cta}>{cta}</div>
      </div>
      <div className={styles.descriptionContainer}>
        <MD className={styles.description}>{description}</MD>
        <div className={styles.copyEmailContainer}>
          <div className={styles.copyEmailText}>{copyEmailText}</div>
          <Button
            className={styles.copyEmailButton}
            onClick={() => copyToClipboard(email)}
            clickContent="Email Copied!"
          >
            <div>Copy Email Address</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  cta: PropTypes.string,
  description: PropTypes.string,
  copyEmailText: PropTypes.string,
};

export default Contact;
