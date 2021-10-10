import * as styles from "./layout.module.scss";
import "css/typography.scss";

import * as React from "react";
import PropTypes from "prop-types";

import Header from "components/header";
import Footer from "components/footer";
import { InfoProvider } from "hooks/info";
import { useIsPreview } from "hooks/preview";

const Layout = ({ children }) => {
  const isPreview = useIsPreview();
  return (
    <div className={styles.layout}>
      <InfoProvider>
        {!isPreview && <Header />}
        {children}
        {!isPreview && <Footer />}
      </InfoProvider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
