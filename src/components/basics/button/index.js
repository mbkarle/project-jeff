import * as styles from "./button.module.scss";

import React, { useEffect, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import mergeDefaults, { mergeClassName } from "utils/merge-defaults";
import ButtonHoverContent from "./button-hover-content";

const useAfterClick = (delay) => {
  const [isClicked, setClicked] = useState(false);

  const onClick = () => setClicked(true);

  useEffect(() => {
    if (isClicked) {
      const timeout = setTimeout(() => setClicked(false), delay);

      return () => clearTimeout(timeout);
    }
  }, [isClicked, delay]);

  return [isClicked, onClick];
};

const Button = forwardRef(({ children, clickContent, onClick, ...otherProps }, ref) => {
  const [isClicked, setClicked] = useAfterClick(2000);
  return (
    <button
      {...mergeDefaults({ className: styles.button }, otherProps)}
      onClick={() => {
        clickContent && setClicked();
        onClick && onClick();
      }}
      ref={ref}
    >
      <div className={styles.mainContent}>{children}</div>
      <div className={mergeClassName(styles.clickContent, isClicked && styles.clicked)}>
        {clickContent}
      </div>
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  clickContent: PropTypes.node,
  onClick: PropTypes.func,
};

Button.HoverContent = ButtonHoverContent;

export default Button;
