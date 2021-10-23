import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";

/**
 * Portal children to a node when given, otherwise render children as they are in react tree
 */
const OptionalPortal = ({ node, children }) => {
  return node ? <Portal node={node}>{children}</Portal> : children;
};

OptionalPortal.propTypes = {
  node: PropTypes.object,
  children: PropTypes.node,
};

export default OptionalPortal;
