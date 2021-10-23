import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";

/**
 * Portal children to a node when given, otherwise render children as they are in react tree
 */
const OptionalPortal = ({ nodeId, children }) =>
  nodeId ? (
    <Portal node={document && document.getElementById(nodeId)}>{children}</Portal>
  ) : (
    children
  );

OptionalPortal.propTypes = {
  nodeId: PropTypes.string,
  children: PropTypes.node,
};

export default OptionalPortal;
