import React, { useState } from "react"
import { Grid, makeStyles } from "@material-ui/core"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./productFrameList"

const useStyles = makeStyles(theme => ({
  productContainer: {
    width: "95%",
    "& > *": {
      marginRight: ({ layout }) =>
        layout === "grid" ? "calc((100% - (25rem *4 ))/3)" : 0,
      marginBottom: "5rem",
    },
    "& > :nth-child(4n)": {
      marginRight: 0,
    },
  },
}))

export default function ListOfProducts({ products, layout }) {
  const classes = useStyles({ layout })

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

  return (
    <Grid item container classes={{ root: classes.productContainer }}>
      {products.map(product =>
        product.node.variants.map(variant => (
          <FrameHelper
            Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList}
            key={variant.id}
            variant={variant}
            product={product}
          />
        ))
      )}
    </Grid>
  )
}
