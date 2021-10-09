import React, { createContext, useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getFrontmatter } from "utils/data";

const InfoContext = createContext({});

export const InfoProvider = (props) => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { dataKey: { eq: "general-info" } }) {
        frontmatter {
          email
        }
      }
    }
  `);

  return <InfoContext.Provider value={getFrontmatter(data) ?? {}} {...props} />;
};

export const useEmail = () => useContext(InfoContext)?.email;
