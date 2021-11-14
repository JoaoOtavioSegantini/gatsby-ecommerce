import React, { useRef, useState } from "react"

import { Fab, Grid, makeStyles } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
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
  pagination: {
    alignSelf: "flex-end",
    marginRight: "2%",
    marginTop: "-3rem",
    marginBottom: "4rem",
    [theme.breakpoints.only("md")]: {
      marginTop: "1rem",
    },
  },
  "@global": {
    ".MuiPaginationItem-root": {
      fontFamily: "Montserrat",
      fontSize: "2rem",
      color: theme.palette.primary.main,
      "&.Mui-selected": {
        color: "#fff",
      },
    },
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
  const [page, setPage] = useState(1)

  const scroll = () => {
    scroolRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const productsPerPage = layout === "grid" ? 16 : 6

  let numberItems = 0
  products.map(product => (numberItems += product.node.variants.length))

  const totalPages = Math.ceil(numberItems / productsPerPage)

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
          setPage={setPage}
        />
        <ListOfProducts
          productsPerPage={productsPerPage}
          page={page}
          layout={layout}
          products={products}
        />
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
          classes={{ root: classes.pagination }}
        />
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
          category {
            name
          }
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
