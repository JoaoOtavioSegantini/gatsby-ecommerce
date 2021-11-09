// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const results = await graphql(
    `
      {
        products: allStrapiProduct {
          edges {
            node {
              name
              strapiId
              category {
                name
              }
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              strapiId
              name
              description
            }
          }
        }
      }
    `
  )
  if (results.errors) {
    throw results.errors
  }
  const products = results.data.products.edges
  const categories = results.data.categories.edges

  products.forEach(product => {
    createPage({
      path: `/${product.node.category.name.toLowerCase()}/${
        product.node.name.split(" ")[0]
      }`,
      component: require.resolve("./src/templates/ProductDetail.js"),
      context: {
        name: product.node.name,
        id: product.node.strapiId,
        category: product.node.category.name,
      },
    })
  })

  categories.forEach(category => {
    createPage({
      path: `/${category.node.name.toLowerCase()}`,
      component: require.resolve("./src/templates/ProductList.js"),
      context: {
        name: category.node.name,
        description: category.node.description,
        id: category.node.strapiId,
      },
    })
  })
}
