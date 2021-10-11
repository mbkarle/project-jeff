import * as React from "react";
import { graphql } from "gatsby";

import Layout from "components/layout";
import Seo from "components/seo";
import Intro from "components/about/intro";
import Separator from "components/basics/separator";
import Work from "components/about/work";
import Play from "components/about/play";
import { getFrontmatter } from "utils/data";

const AboutPage = ({ data }) => {
  const { intro, work, play } = getFrontmatter(data) || {};
  return (
    <Layout>
      <Seo title="About" />
      <Intro {...intro} />
      <Separator />
      <Work {...work} />
      <Play {...play} />
    </Layout>
  );
};

export const query = graphql`
  {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      frontmatter {
        intro {
          alt
          description
          header
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        work {
          title
          description
          recognition {
            recognitions {
              award
            }
            title
          }
          timeline {
            company
            role
            dates
          }
        }
        play {
          title
          categories {
            category
            activities
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            description
          }
        }
      }
    }
  }
`;

export default AboutPage;
