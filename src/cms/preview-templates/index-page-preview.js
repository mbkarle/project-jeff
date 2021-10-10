import React from "react";
import PropTypes from "prop-types";
import IndexPage from "src/templates/index-page";
import PreviewWrapper from "src/components/preview";
import { getPreviewDataWithAssets } from "utils/data";

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = getPreviewDataWithAssets(entry, getAsset);

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
  getAsset: PropTypes.func,
};

export default IndexPagePreview;
