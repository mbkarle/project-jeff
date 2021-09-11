const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        assert: require.resolve("assert/"),
      },
    },
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 100) {
        edges {
          node {
            id
            frontmatter {
              templateKey
              path
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.frontmatter.path,
        component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
        // additional data can be passed in context
        context: { id },
      });
    });
  });
};
