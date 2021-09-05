import * as styles from "./tabbable.module.scss";

import React, { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import mergeDefaults from "utils/merge-defaults";
import Button from "components/basics/button";

const TabContext = createContext({});

const Tabbable = ({ children, initialValue }) => {
  const [active, setActive] = useState(initialValue);

  return <TabContext.Provider value={{ active, setActive }}>{children}</TabContext.Provider>;
};

Tabbable.propTypes = {
  children: PropTypes.node.isRequired,
  initialValue: PropTypes.string,
};

const Tab = ({ eventKey, ...otherProps }) => {
  const { active, setActive } = useContext(TabContext);
  const isActive = active === eventKey;

  return (
    <Button
      {...mergeDefaults(
        { className: `${styles.tab} ${isActive ? styles.tabActive : ""}` },
        otherProps,
      )}
      onClick={() => setActive(eventKey)}
    />
  );
};

Tab.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

Tabbable.Tab = Tab;

const View = ({ eventKey, ...otherProps }) => {
  const { active } = useContext(TabContext);
  const isActive = active === eventKey;

  return (
    <div
      {...mergeDefaults(
        { className: isActive ? styles.viewActive : styles.viewInactive },
        otherProps,
      )}
    />
  );
};

View.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

Tabbable.View = View;

export default Tabbable;
