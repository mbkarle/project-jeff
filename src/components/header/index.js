import * as styles from "./header.module.scss";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import mergeDefaults, { mergeClassName } from "utils/merge-defaults";
import AvailableButton from "components/basics/available-button";
import { getFrontmatter } from "utils/data";
import HamburgerIcon from "svg/hamburger-icon";
import XIcon from "svg/x-icon";
import Button from "components/basics/button";
import { useIsMobileSize } from "hooks/window-size";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { useGeneralInfo } from "hooks/info";
import GlobalOrLocalLink from "components/basics/global-or-local-link";
import LinkedinIcon from "svg/linkedin-icon";
import DribbbleIcon from "svg/dribbble-icon";

const HeaderWithData = (props) => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { dataKey: { eq: "header" } }) {
        frontmatter {
          siteTitle
          navigation {
            label
            pathname
          }
        }
      }
    }
  `);

  const { navigation, siteTitle } = getFrontmatter(data) || {};

  const { linkedin, dribbble } = useGeneralInfo();

  return (
    <Header
      navData={navigation}
      siteTitle={siteTitle}
      linkedin={linkedin}
      dribbble={dribbble}
      {...props}
    />
  );
};

const Header = ({ navData, siteTitle, linkedin, dribbble }) => {
  const [isOpen, setOpen] = useState(false);
  const [inUse, setInUse] = useState(false);
  const isMobile = useIsMobileSize();

  useEffect(() => {
    setOpen(false);
    setInUse(false);
  }, [isMobile]);

  const toggleOpen = () => {
    setInUse(true);
    setOpen((current) => !current);
  };

  return (
    <div
      className={mergeClassName(styles.header, isOpen && styles.open, inUse && styles.mobileActive)}
    >
      {siteTitle && <div className={styles.siteTitle}>{siteTitle}</div>}
      <Button className={styles.menuButton} onClick={toggleOpen}>
        <div className={styles.menuButtonContent}>{isOpen ? <XIcon /> : <HamburgerIcon />}</div>
      </Button>
      <div className={styles.navContainer}>
        {navData?.map((item) => (
          <AutoActiveNavItem {...item} key={`header-nav-${item.pathname}`} />
        ))}
        <div className={styles.mobileLinks}>
          <GlobalOrLocalLink href={dribbble}>
            <DribbbleIcon />
          </GlobalOrLocalLink>
          <GlobalOrLocalLink href={linkedin}>
            <LinkedinIcon />
          </GlobalOrLocalLink>
        </div>
      </div>
      <AvailableButton className={styles.availableButton} />
      {isMobile && isOpen && <RemoveScrollBar />}
    </div>
  );
};

Header.propTypes = {
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }),
  ),
  siteTitle: PropTypes.string,
  linkedin: PropTypes.string,
  dribbble: PropTypes.string,
};

const useIsPathMatch = (targetPath) => {
  const { pathname } = useLocation();

  const process = (s) => s.toLowerCase()?.replaceAll?.("/", "");

  return process(pathname) === process(targetPath);
};

const AutoActiveNavItem = (props) => {
  const isActive = useIsPathMatch(props.pathname);
  return <HeaderNavItem isActive={isActive} {...props} />;
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

export default HeaderWithData;
