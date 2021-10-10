import { useContext } from "react";
import { PreviewContext } from "components/preview";

export const useIsPreview = () => {
  return !!useContext(PreviewContext)?.isPreview;
};
