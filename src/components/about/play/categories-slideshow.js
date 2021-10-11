import * as styles from "./categories-slideshow.module.scss";

import React from "react";
import Slideshow from "components/basics/slideshow";
import Image from "components/basics/image";
import mergeDefaults, { mergeClassName } from "utils/merge-defaults";
import Button from "components/basics/button";

const extractKey = (category, index) => `${category}-${index}`;

const CategoriesSlideshow = ({ categories, ...otherProps }) => {
  return (
    <Slideshow initialSlide={extractKey(categories?.[0]?.category, 0)}>
      <div {...mergeDefaults({ className: styles.container }, otherProps)}>
        <div className={styles.tabsContainer}>
          {categories?.map((category, idx) => (
            <CategoryTab
              key={category.category}
              {...category}
              eventKey={extractKey(category.category, idx)}
            />
          ))}
        </div>
        <div className={styles.imageContainer}>
          {categories?.map(({ image, category }, idx) => (
            <Slideshow.Slide key={`image-${category}`} eventKey={extractKey(category, idx)}>
              <Image image={image} alt={`Collage of ${category} pictures`} />
            </Slideshow.Slide>
          ))}
        </div>
      </div>
    </Slideshow>
  );
};

const ACTIVITY_DELIMITER = " · ";

const CategoryTab = ({ eventKey, category, description, activities, ...otherProps }) => {
  return (
    <Slideshow.Tab eventKey={eventKey}>
      {({ activate, isActive }) => (
        <Button
          onClick={activate}
          {...mergeDefaults(
            { className: mergeClassName(styles.tabButton, isActive && styles.active) },
            otherProps,
          )}
        >
          <div className={styles.tab}>
            <div className={styles.category}>{category}</div>
            <div className={styles.activities}>{activities?.join(ACTIVITY_DELIMITER)}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </Button>
      )}
    </Slideshow.Tab>
  );
};

export default CategoriesSlideshow;
