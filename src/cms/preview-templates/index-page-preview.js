import React from "react";
import PropTypes from "prop-types";
import IndexPage from "src/templates/index-page";
import PreviewWrapper from "src/components/preview";

const IndexPagePreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();

  console.log(data);

  return data ? (
    <PreviewWrapper pathname="/">
      <IndexPage data={data} isPreview />
    </PreviewWrapper>
  ) : (
    <div>Loading...</div>
  );
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default IndexPagePreview;
