import CMS from "netlify-cms-app";
import IndexPagePreview from "./preview-templates/index-page-preview";
import AboutPagePreview from "./preview-templates/about-page-preview";

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
