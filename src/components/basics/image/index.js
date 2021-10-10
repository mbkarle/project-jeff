import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Image = ({ image, alt, ...otherProps }) => {
  if (image.url) {
    // this is an image coming from Netlify CMS
    return <img src={image.url} style={{ width: "100%" }} {...otherProps} alt={alt} />;
  } else {
    // this should be an image processed by gatsby-plugin-image
    //debugger;
    const imageRef = getImage(image);
    return <GatsbyImage image={imageRef} alt={alt} {...otherProps} />;
  }
};

Image.propTypes = {
  image: PropTypes.object,
  alt: PropTypes.string,
};

export default Image;
