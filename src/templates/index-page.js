import * as React from "react";

import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Layout from "components/layout";
import Seo from "components/seo";
import Home from "components/home";
import { getFrontmatter } from "utils/data";

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <Home data={getFrontmatter(data)} />
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object, // TODO: formalize via combination of earlier-defined prop types
};

export const query = graphql`
  {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heroContent {
          header
          subheader
          summaries {
            label
            text
          }
        }
        workExamples {
          description
          img {
            childrenImageSharp {
              gatsbyImageData
            }
          }
          tags
          title
        }
      }
    }
  }
`;

export default IndexPage;
