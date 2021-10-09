import * as styles from "./available-button.module.scss";

import React from "react";
import Button from "components/basics/button";
import mergeDefaults from "utils/merge-defaults";
import AvailableIcon from "svg/available-icon";
import CopyIcon from "svg/copy-icon";
import copyToClipboard from "utils/copy-to-clipboard";
import { useEmail } from "hooks/info";

const CopiedText = (props) => (
  <div {...mergeDefaults({ className: styles.copied }, props)}>
    <CopyIcon />
    <div>Email Copied!</div>
  </div>
);

const AvailableButton = (props) => {
  const email = useEmail();
  return (
    <Button
      {...mergeDefaults({ className: styles.availableCtaButton }, props)}
      clickContent={<CopiedText />}
      onClick={() => copyToClipboard(email)}
    >
      <div className={styles.availableCta}>
        <AvailableIcon />
        <div className={styles.availableCtaText}>Available for select projects</div>
      </div>
      <Button.HoverContent className={styles.availableHover}>
        <CopyIcon />
        <div>Copy Email Address</div>
      </Button.HoverContent>
    </Button>
  );
};

export default AvailableButton;
