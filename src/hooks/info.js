import React, { createContext, useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getFrontmatter } from "utils/data";

const InfoContext = createContext({});

export const InfoProvider = (props) => {
  let data;
  try {
    data = useStaticQuery(graphql`
      {
        markdownRemark(frontmatter: { dataKey: { eq: "general-info" } }) {
          frontmatter {
            email
            linkedin
            dribbble
          }
        }
      }
    `);
  } catch (e) {
    console.log(e);
    console.log("Static query failed - you may be in preview mode");
  }

  return <InfoContext.Provider value={getFrontmatter(data) ?? {}} {...props} />;
};

export const useGeneralInfo = () => useContext(InfoContext) || {};

export const useEmail = () => useContext(InfoContext)?.email;
