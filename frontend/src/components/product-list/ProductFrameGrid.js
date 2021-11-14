import React, { useState } from "react"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"

import frame from "../../images/product-frame-grid.svg"
import QuickView from "./QuickView"

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    width: "25rem",
    height: "25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  product: {
    width: "20rem",
    height: "20rem",
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    width: "25rem",
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-0.1rem",
  },
  invisibility: {
    visibility: "hidden",
  },
}))

export const colorIndex = (product, color, variant) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(item => item.color === color && item.style === variant.style)[0]
  )
}

export default function ProductFrameGrid({
  product,
  variant,
  sizes,
  colors,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const imageIndex = colorIndex(product, selectedColor, variant) 
  const imgUrl =
    process.env.GATSBY_STRAPI_URL +
    (imageIndex !== -1
      ? product.node.variants[imageIndex].images[0].url
      : variant.images[0].url)

  const productName = product.node.name.split(" ")[0]

  return (
    <Grid
      item
      classes={{
        root: clsx({
          [classes.invisibility]: open === true,
        }),
      }}
    >
      <Grid container direction="column" onClick={() => setOpen(true)}>
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={imgUrl}
            alt={product.node.name}
            className={classes.product}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" classes={{ root: classes.title }}>
            {productName}
          </Typography>
        </Grid>
      </Grid>
      <QuickView
        open={open}
        setOpen={setOpen}
        url={imgUrl}
        name={productName}
        price={variant.price}
        product={product}
        sizes={sizes}
        colors={colors}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
      />
    </Grid>
  )
}
