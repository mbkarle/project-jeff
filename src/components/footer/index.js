import * as styles from "./footer.module.scss";

import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import mergeDefaults from "utils/merge-defaults";
import { getFrontmatter } from "utils/data";

const FooterWithData = (props) => {
  const footerData = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { dataKey: { eq: "footer" } }) {
        frontmatter {
          title
          subtitle
          linkGroups {
            category
            links {
              label
              url
            }
          }
        }
      }
    }
  `);

  return <Footer {...getFrontmatter(footerData)} {...props} />;
};

const Footer = ({ title, subtitle, linkGroups, ...otherProps }) => {
  return (
    <div {...mergeDefaults({ className: styles.container }, otherProps)}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <div className={styles.linkGroupsContainer}>
        {linkGroups &&
          linkGroups.map((linkGroup) => <LinkGroup key={linkGroup.category} {...linkGroup} />)}
      </div>
    </div>
  );
};

const LinkGroup = ({ category, links }) => {
  return (
    <div className={styles.linkGroup}>
      <div className={styles.linkCategory}>{category}</div>
      <div className={styles.linksContainer}>
        {links.map(({ label, url }) => (
          <GlobalOrLocalLink key={`${label}-${url}`} className={styles.link} url={url}>
            {label}
          </GlobalOrLocalLink>
        ))}
      </div>
    </div>
  );
};

const GlobalOrLocalLink = ({ url, ...otherProps }) =>
  url?.charAt(0) === "/" ? <Link to={url} {...otherProps} /> : <a href={url} {...otherProps} />;

export default FooterWithData;
