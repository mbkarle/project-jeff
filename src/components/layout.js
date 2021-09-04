/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";

import Header from "./header";
import * as styles from "./layout.module.scss";

const NAV_DATA = [
  {
    label: "Home",
    pathname: "/",
  },
  {
    label: "About",
    pathname: "/about",
  },
];

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header navData={NAV_DATA} siteTitle="Jeff Wang" />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
