import { isObject } from "utils/object";

const IMAGE_SRC = "/img/";

export const getFrontmatter = (graphqlData) =>
  graphqlData?.markdownRemark?.frontmatter || graphqlData;

/**
 * Get data for page preview to display in cms
 * Recursively traverses data to find image urls and replace with result of getAsset calls
 */
export const getPreviewDataWithAssets = (entry, getAsset) => {
  const data = entry.getIn(["data"]).toJS();

  const getAssetsInObject = (obj = {}) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (isObject(value)) {
        getAssetsInObject(value);
      } else if (value?.startsWith?.(IMAGE_SRC)) {
        try {
          let image = getAsset(value);
          obj[key] = image;
        } catch (e) {
          console.error(`Error processing possible image ${value} for preview: ${e}`);
        }
      }
    });
  };

  getAssetsInObject(data);
  return data;
};
