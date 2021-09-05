import * as styles from "./layout.module.scss";
import "css/typography.scss";

import * as React from "react";
import PropTypes from "prop-types";

import Header from "components/header";

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
