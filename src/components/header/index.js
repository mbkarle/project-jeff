import * as styles from "./header.module.scss";

import * as React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import mergeDefaults from "utils/merge-defaults";
import AvailableButton from "components/basics/available-button";
import { getFrontmatter } from "utils/data";

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

  return <Header navData={navigation} siteTitle={siteTitle} {...props} />;
};

const Header = ({ navData, siteTitle }) => (
  <div className={styles.header}>
    {siteTitle && <div className={styles.siteTitle}>{siteTitle}</div>}
    <div className={styles.navContainer}>
      {navData?.map((item) => (
        <AutoActiveNavItem {...item} key={`header-nav-${item.pathname}`} />
      ))}
    </div>
    <AvailableButton />
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

export default HeaderWithData;
