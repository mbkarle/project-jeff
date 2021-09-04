import * as styles from "./header.module.scss";

import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import Button from "./basics/button";
import mergeDefaults from "../utils/merge-defaults";
import AvailableIcon from "../svg/available-icon";
import CopyIcon from "../svg/copy-icon";
import copyToClipboard from "../utils/copy-to-clipboard";

const Header = ({ navData, siteTitle }) => (
  <div className={styles.header}>
    {siteTitle && <div className={styles.siteTitle}>{siteTitle}</div>}
    <div className={styles.navContainer}>
      {navData?.map((item) => (
        <AutoActiveNavItem {...item} key={`header-nav-${item.pathname}`} />
      ))}
    </div>
    <AvailableCTA />
  </div>
);

Header.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }),
  ),
  siteTitle: PropTypes.string,
};

const CopiedText = (props) => (
  <div {...mergeDefaults({ className: styles.copied }, props)}>
    <CopyIcon />
    <div>Email Copied!</div>
  </div>
);

const EMAIL = "jeff@monthly.com";

const AvailableCTA = (props) => (
  <Button
    {...mergeDefaults({ className: styles.availableCtaButton }, props)}
    clickContent={<CopiedText />}
    onClick={() => copyToClipboard(EMAIL)}
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

const AutoActiveNavItem = (props) => {
  const { pathname } = useLocation();
  return <HeaderNavItem isActive={props.pathname === pathname} {...props} />;
};

const HeaderNavItem = ({ label, pathname, isActive, ...otherProps }) => (
  <Link
    to={pathname}
    {...mergeDefaults(
      { className: `${styles.navItem} ${isActive ? styles.active : ""}` },
      otherProps,
    )}
  >
    {label}
  </Link>
);

HeaderNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

AutoActiveNavItem.propTypes = {
  ...HeaderNavItem.propTypes,
};

export default Header;
