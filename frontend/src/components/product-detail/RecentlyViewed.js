import React from "react"
import { Grid, makeStyles } from "@material-ui/core"
import ProductFrameGrid from "../product-list/ProductFrameGrid"

const useStyles = makeStyles(theme => ({}))

export default function RecentlyViewed({ products }) {
  const classes = useStyles()

  return (
    <Grid item container>
      {products.map(product => {
        const hasStyle = product.node.variants.some(
          variant => variant.style !== null
        )
        return (
          <ProductFrameGrid
            key={product.node.strapiId}
            product={product}
            variant={product.node.variants[product.selectedVariant]}
            disableQuickView
            hasStyle={hasStyle}
          />
        )
      })}
    </Grid>
  )
}
