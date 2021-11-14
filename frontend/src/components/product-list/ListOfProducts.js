import React, { useState } from "react"
import { Grid, makeStyles, useMediaQuery } from "@material-ui/core"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./productFrameList"

const useStyles = makeStyles(theme => ({
  productContainer: {
    width: "95%",
    [theme.breakpoints.only("xl")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc((100% - (25rem *4 ))/3)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(4n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("lg")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc((100% - (25rem *3 ))/2)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(3n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("md")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc(100% - (25rem *2 ))" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(2n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        marginBottom: "5rem",
      },
    },
  },
}))

export default function ListOfProducts({
  products,
  layout,
  page,
  productsPerPage,
}) {
  const classes = useStyles({ layout })
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const FrameHelper = ({ Frame, variant, product }) => {
    var sizes = []
    var duplicateColors = []

    product.node.variants.map(variant => {
      sizes.push(variant.size)
      return duplicateColors.push(variant.color)
    })
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const colors = [...new Set(duplicateColors)]

    return (
      <Frame
        sizes={sizes}
        colors={colors}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        variant={variant}
        product={product}
      />
    )
  }

  let content = []
  products.map((product, i) =>
    product.node.variants.map(variant => content.push({ product: i, variant }))
  )

  return (
    <Grid
      item
      container
      classes={{ root: classes.productContainer }}
      direction={matchesSM ? "column" : "row"}
      alignItems={matchesSM ? "center" : undefined}
    >
      {content
        .slice((page - 1) * productsPerPage, page * productsPerPage)
        .map(item => (
          <FrameHelper
            Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList}
            key={item.variant.id}
            variant={item.variant}
            product={products[item.product]}
          />
        ))}
    </Grid>
  )
}
