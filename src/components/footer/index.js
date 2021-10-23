import * as styles from "./footer.module.scss";

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import mergeDefaults from "utils/merge-defaults";
import { getFrontmatter } from "utils/data";
import GlobalOrLocalLink from "components/basics/global-or-local-link";

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

Footer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  linkGroups: PropTypes.arrayOf(PropTypes.object),
};

const LinkGroup = ({ category, links }) => {
  return (
    <div className={styles.linkGroup}>
      <div className={styles.linkCategory}>{category}</div>
      <div className={styles.linksContainer}>
        {links.map(({ label, url }) => (
          <GlobalOrLocalLink key={`${label}-${url}`} className={styles.link} href={url}>
            {label}
          </GlobalOrLocalLink>
        ))}
      </div>
    </div>
  );
};

LinkGroup.propTypes = {
  category: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
};

export default FooterWithData;
