import * as styles from "./layout.module.scss";
import "css/typography.scss";

import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "components/header";
import Footer from "components/footer";
import { InfoProvider } from "hooks/info";
import { getFrontmatter } from "utils/data";

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
      <InfoProvider>
        <Header />
        {children}
        <Footer />
      </InfoProvider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
