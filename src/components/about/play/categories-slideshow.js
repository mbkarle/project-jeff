import * as styles from "./categories-slideshow.module.scss";

import React, { useState, useRef } from "react";
import Slideshow from "components/basics/slideshow";
import Image from "components/basics/image";
import mergeDefaults, { mergeClassName } from "utils/merge-defaults";
import Button from "components/basics/button";
import OptionalPortal from "components/basics/optional-portal";
import { useIsTabletSize } from "hooks/window-size";
import { useSlideDown } from "hooks/animation";

const extractKey = (category, index) => `${category}-${index}`;

const CategoriesSlideshow = ({ id, categories, ...otherProps }) => {
  const imageContainerId = `${id}-image-container`;

  // force re-render when container is rendered to ensure portaling works
  const updateImageContainer = useState(null)[1];
  return (
    <Slideshow initialSlide={extractKey(categories?.[0]?.category, 0)}>
      <div {...mergeDefaults({ className: styles.container }, otherProps)}>
        <div className={styles.tabsContainer}>
          {categories?.map((categoryDetails, idx) => (
            <Category
              key={`${categoryDetails.category}-${idx}`}
              categoryDetails={categoryDetails}
              eventKey={extractKey(categoryDetails.category, idx)}
              imageContainerId={imageContainerId}
            />
          ))}
        </div>
        <div id={imageContainerId} className={styles.imageContainer} ref={updateImageContainer} />
      </div>
    </Slideshow>
  );
};

const Category = ({ categoryDetails, eventKey, imageContainerId }) => {
  const isTablet = useIsTabletSize();
  const { category, image, ...rest } = categoryDetails;

  return (
    <>
      <CategoryTab key={category} category={category} {...rest} eventKey={eventKey} />
      <OptionalPortal nodeId={!isTablet && imageContainerId}>
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

const ACTIVITY_DELIMITER = " · ";

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

const AnimatedImage = ({ isActive, isTablet, ...imageProps }) => {
  const imageRef = useRef();

  useSlideDown(imageRef, isTablet ? isActive : true, ANIMATION_DURATION_SEC);

  return (
    <div className={mergeClassName(styles.image, !isActive && styles.hiddenImage)} ref={imageRef}>
      <Image {...imageProps} />
    </div>
  );
};

export default CategoriesSlideshow;
