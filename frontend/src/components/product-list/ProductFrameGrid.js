import React, { useState } from "react"
import { Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core"
import clsx from "clsx"

import frame from "../../images/product-frame-grid.svg"
import QuickView from "./QuickView"
import { navigate } from "gatsby"

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
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      width: "20rem",
    },
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "15rem" : undefined),
      width: ({ small }) => (small ? "15rem" : undefined),
    },
  },
  product: {
    width: "20rem",
    height: "20rem",
    [theme.breakpoints.down("xs")]: {
      height: "15rem",
      width: "15rem",
    },
    [theme.breakpoints.up("xs")]: {
      height: ({ small }) => (small ? "12rem" : undefined),
      width: ({ small }) => (small ? "12rem" : undefined),
    },
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    width: "25rem",
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-0.1rem",
    [theme.breakpoints.down("xs")]: {
      width: "20rem",
    },
  },
  invisibility: {
    visibility: "hidden",
  },
}))

export const colorIndex = (product, color, variant) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(
      item => item.color === color && item.style === variant.style
    )[0]
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
  hasStyle,
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  if (matchesMD && open) {
    setOpen(false)
  }

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
      <Grid
        container
        direction="column"
        onClick={() =>
          matchesMD
            ? navigate(
                `/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(" ")[0]
                  .toLowerCase()}${hasStyle ? `?style=${variant.style}` : ""}`
              )
            : setOpen(true)
        }
      >
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
        variant={variant}
        hasStyle={hasStyle}
      />
    </Grid>
  )
}
