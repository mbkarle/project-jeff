import * as styles from "./categories-slideshow.module.scss";

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Slideshow from "components/basics/slideshow";
import Image from "components/basics/image";
import mergeDefaults, { mergeClassName } from "utils/merge-defaults";
import Button from "components/basics/button";
import OptionalPortal from "components/basics/optional-portal";
import { useIsTabletSize } from "hooks/window-size";
import { useSlideDown } from "hooks/animation";

const extractKey = (category, index) => `${category}-${index}`;

const CategoriesSlideshow = ({ categories, ...otherProps }) => {
  const [imageContainer, updateImageContainer] = useState(null);
  return (
    <Slideshow initialSlide={extractKey(categories?.[0]?.category, 0)}>
      <div {...mergeDefaults({ className: styles.container }, otherProps)}>
        <div className={styles.tabsContainer}>
          {categories?.map((categoryDetails, idx) => (
            <Category
              key={`${categoryDetails.category}-${idx}`}
              categoryDetails={categoryDetails}
              eventKey={extractKey(categoryDetails.category, idx)}
              imageContainer={imageContainer}
            />
          ))}
        </div>
        <div className={styles.imageContainer} ref={updateImageContainer} />
      </div>
    </Slideshow>
  );
};

CategoriesSlideshow.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};

const Category = ({ categoryDetails, eventKey, imageContainer }) => {
  const isTablet = useIsTabletSize();
  const { category, image, ...rest } = categoryDetails;

  return (
    <>
      <CategoryTab key={category} category={category} {...rest} eventKey={eventKey} />
      <OptionalPortal node={!isTablet && imageContainer}>
        <Slideshow.Slide key={`image-${category}`} eventKey={eventKey}>
          {({ isActive }) => (
            <AnimatedImage
              image={image}
              alt={`Collage of ${category} pictures`}
              isActive={isActive}
              isTablet={isTablet}
            />
          )}
        </Slideshow.Slide>
      </OptionalPortal>
    </>
  );
};

Category.propTypes = {
  categoryDetails: PropTypes.shape({
    category: PropTypes.string,
    image: PropTypes.object,
  }),
  eventKey: PropTypes.string,
  imageContainer: PropTypes.object,
};

const ACTIVITY_DELIMITER = " ?? ";

const CategoryTab = ({ eventKey, ...otherProps }) => {
  return (
    <Slideshow.Tab eventKey={eventKey}>
      {({ activate, isActive }) => (
        <AnimatedButton
          isActive={isActive}
          onClick={activate}
          {...mergeDefaults(
            { className: mergeClassName(styles.tabButton, isActive && styles.active) },
            otherProps,
          )}
        />
      )}
    </Slideshow.Tab>
  );
};

CategoryTab.propTypes = {
  eventKey: PropTypes.string,
};

const ANIMATION_DURATION_SEC = 0.5;

const AnimatedButton = ({ isActive, category, activities, description, ...otherProps }) => {
  const ref = useRef();

  useSlideDown(ref, isActive, ANIMATION_DURATION_SEC);

  return (
    <Button {...otherProps}>
      <div className={styles.tab}>
        <div className={styles.category}>{category}</div>
        <div className={styles.activities}>{activities?.join(ACTIVITY_DELIMITER)}</div>
        <div className={styles.description} ref={ref}>
          {description}
        </div>
      </div>
    </Button>
  );
};

AnimatedButton.propTypes = {
  isActive: PropTypes.bool,
  category: PropTypes.string,
  activities: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
};

const AnimatedImage = ({ isActive, isTablet, ...imageProps }) => {
  const imageRef = useRef();

  useSlideDown(imageRef, isTablet ? isActive : true, ANIMATION_DURATION_SEC);

  return (
    <div className={mergeClassName(styles.image, !isActive && styles.hiddenImage)} ref={imageRef}>
      <Image {...imageProps} />
    </div>
  );
};

AnimatedImage.propTypes = {
  isActive: PropTypes.bool,
  isTablet: PropTypes.bool,
};

export default CategoriesSlideshow;
