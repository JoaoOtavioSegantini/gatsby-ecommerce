import React, { useState } from "react"

import { Grid } from "@material-ui/core"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import Layout from "../components/ui/layout"
import { graphql } from "gatsby"
import ListOfProducts from "../components/product-list/ListOfProducts"

export default function ProductList({
  pageContext,
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const [layout, setLayout] = useState("grid")

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar
          filterOptions={pageContext.filterOptions}
          name={pageContext.name}
          description={pageContext.description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts layout={layout} products={products} />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: String!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          name
          variants {
            color
            id
            price
            size
            style
            images {
              url
            }
          }
        }
      }
    }
  }
`
