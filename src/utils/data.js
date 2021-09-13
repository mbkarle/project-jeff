export const getFrontmatter = (graphqlData) =>
  graphqlData?.markdownRemark?.frontmatter || graphqlData;

export const getImage = (graphqlImage) => graphqlImage?.childrenImageSharp[0].gatsbyImageData;
