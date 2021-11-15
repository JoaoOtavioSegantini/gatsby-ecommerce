import React, { useEffect, useRef, useState } from "react"

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
  pageContext: { filterOptions: options, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const [layout, setLayout] = useState("grid")
  const classes = useStyles()
  const scroolRef = useRef(null)
  const [page, setPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState(options)

  const scroll = () => {
    scroolRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
   setPage(1)
  },[filterOptions, layout])

  const productsPerPage = layout === "grid" ? 16 : 6

  let numberItems = 0
  let content = []
  products.map((product, i) =>
    product.node.variants.map(variant => content.push({ product: i, variant }))
  )
  let isFiltered = false
  let filters = {}
  let filteredProducts = []

  Object.keys(filterOptions)
    .filter(option => filterOptions[option] !== null)
    .map(option => {
      filterOptions[option].forEach(value => {
        if (value.checked) {
          isFiltered = true
          if (filters[option] === undefined) {
            filters[option] = []
          }
          if (!filters[option].includes(value)) {
            filters[option].push(value)
          }
          content.forEach(item => {
            if (option === "Color") {
              if (
                item.variant.colorLabel === value.label &&
                !filteredProducts.includes(item)
              ) {
                filteredProducts.push(item)
              }
            } else if (
              item.variant[option.toLocaleLowerCase()] === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item)
            } else if (
              item.variant[option.toLocaleLowerCase()].substring(0, 1) ===
                value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item)
            }
          })
          // if (
          //   item.variant[option.toLowerCase()].substring(0, 1) ===
          //     value.label ||
          //   item.variant[option.toLowerCase()] === value.label
          // ) {
          //   valid = item
          // }
        }
      })
      return null
    })

  Object.keys(filters).forEach(filter => {
    filteredProducts = filteredProducts.filter(item => {
      let valid

      filters[filter].some(value => {
        if (filter === "Color") {
          if (item.variant.colorLabel === value.label) {
            valid = item
          }
        } else if (
          item.variant[filter.toLocaleLowerCase()] === value.label ||
          item.variant[filter.toLocaleLowerCase()].substring(0, 1) ===
            value.label
        ) {
          valid = item
        }
        return null
      })

      return valid
    })
  })

  if (isFiltered) content = filteredProducts


  const totalPages = Math.ceil(content.length / productsPerPage)

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <div ref={scroolRef} />
        <DynamicToolbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts
          productsPerPage={productsPerPage}
          page={page}
          layout={layout}
          products={products}
          filterOptions={filterOptions}
          content={content}
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
            colorLabel
            images {
              url
            }
          }
        }
      }
    }
  }
`
