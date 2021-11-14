import React, { useRef, useState } from "react"

import { Fab, Grid, makeStyles } from "@material-ui/core"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import Layout from "../components/ui/layout"
import { graphql } from "gatsby"
import ListOfProducts from "../components/product-list/ListOfProducts"

const useStyles = makeStyles(theme => ({
  fab: {
    fontSize: "5rem",
    marginBottom: "2rem",
    marginRight: "2rem",
    fontFamily: "Montserrat",
    width: "5rem",
    height: "5rem",
    alignSelf: "flex-end",
    color: "#fff",
  },
}))

export default function ProductList({
  pageContext,
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const [layout, setLayout] = useState("grid")
  const classes = useStyles()
  const scroolRef = useRef(null)

  const scroll = () => {
    scroolRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <div ref={scroolRef} />
        <DynamicToolbar
          filterOptions={pageContext.filterOptions}
          name={pageContext.name}
          description={pageContext.description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts layout={layout} products={products} />
        <Fab onClick={scroll} color="primary" classes={{ root: classes.fab }}>
          ^
        </Fab>
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
