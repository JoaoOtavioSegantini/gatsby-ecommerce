import React, { useEffect, useState } from "react"
import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core"
import clsx from "clsx"

import favorite from "../../images/favorite.svg"
import subscribe from "../../images/subscription.svg"

import Rating from "../home/rating"
import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"
import { colorIndex } from "../product-list/ProductFrameGrid"

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.secondary.main,
    height: "45rem",
    width: "35rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "58rem",
    },
  },
  center: {
    backgroundColor: theme.palette.primary.main,
    height: "35rem",
    width: "45rem",
    position: "absolute",
    [theme.breakpoints.down("lg")]: {
      width: "40rem",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "48rem",
    },
  },
  icon: { height: "4rem", width: "4rem", margin: "0.5rem 1rem" },
  sectionContainer: {
    height: "calc(100% / 3)",
  },
  descriptionContainer: {
    backgroundColor: theme.palette.secondary.main,
    overflowY: "auto",
    padding: "0.5rem 1rem",
  },
  name: {
    color: "#fff",
  },
  reviewButton: {
    textTransform: "none",
    marginLeft: "-8px",
  },
  detailsContainer: {
    padding: "0.5rem 1rem",
  },
  chipContainer: {
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      marginBottom: "1rem",
    },
  },
  chipRoot: {
    height: "3rem",
    width: "auto",
    borderRadius: 50,
  },
  chipLabel: {
    fontSize: "2rem",
  },
  stock: {
    color: "#fff",
  },
  sizesAndSwatches: {
    maxWidth: "13rem",
  },
  actionsContainer: {
    padding: "0 1rem",
  },
  "@global": {
    ".MuiButtonGroup-groupedOutlinedVertical:not(:first-child)": {
      marginTop: 0,
    },
  },
}))

export const getStockDisplay = (stock, variant) => {
  switch (stock) {
    case undefined:
    case null:
      return "Loading Inventory..."
    case -1:
      return "Error loading Inventory"
    default:
      if (stock[variant].qty === 0) {
        return "Out of Stock"
      } else {
        return `${stock[variant].qty} Currently in Stock`
      }
  }
}

export default function ProductInfo({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
  product,
}) {
  const classes = useStyles()
  const [selectedSize, setSelectedSize] = useState(
    variants[selectedVariant].size.substring(0, 1)
  )
  const [selectedColor, setSelectedColor] = useState(null)

  const matchesXs = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const imageIndex = colorIndex(
    { node: { variants } },
    selectedColor,
    variants[selectedVariant]
  )

  const sizes = []
  const colors = []
  variants.map(variant => {
    sizes.push(variant.size)

    if (
      !colors.includes(variant.color) &&
      variant.size.substring(0, 1) === selectedSize &&
      variant.style === variants[selectedVariant].style
    ) {
      return colors.push(variant.color)
    }
  })

  useEffect(() => {
    setSelectedColor(null)
    const newVariant = variants.find(
      variant =>
        variant.size.substring(0, 1) === selectedSize &&
        variant.style === variants[selectedVariant].style &&
        variant.color === colors[0]
    )
    setSelectedVariant(variants.indexOf(newVariant))
  }, [selectedSize])

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex)
    }
  }, [imageIndex, setSelectedVariant])

  const stockDisplay = getStockDisplay(stock, selectedVariant)

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="flex-end"
      direction="column"
      lg={6}
    >
      <Grid
        item
        container
        justifyContent="flex-end"
        classes={{ root: classes.background }}
      >
        <Grid item>
          <img
            src={favorite}
            alt="add item to favorites"
            className={classes.icon}
          />
        </Grid>
        <Grid item>
          <img
            src={subscribe}
            alt="add item to subscriptions"
            className={classes.icon}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        classes={{ root: classes.center }}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          direction={matchesXs ? "column" : "row"}
          classes={{
            root: clsx(classes.sectionContainer, classes.detailsContainer),
          }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h1" classes={{ root: classes.name }}>
                  {name.split(" ")[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Rating number={3.5} />
              </Grid>
              <Grid item>
                <Button>
                  <Typography
                    variant="body2"
                    classes={{ root: classes.reviewButton }}
                  >
                    Leave a Review &gt;
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item classes={{ root: classes.chipContainer }}>
            <Chip
              label={`$${variants[selectedVariant].price}`}
              classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          classes={{
            root: clsx(classes.sectionContainer, classes.descriptionContainer),
          }}
        >
          <Grid item>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={matchesXs ? "space-around" : "space-between"}
          alignItems={matchesXs ? "flex-start" : "center"}
          direction={matchesXs ? "column" : "row"}
          classes={{
            root: clsx(classes.sectionContainer, classes.actionsContainer),
          }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item classes={{ root: classes.sizesAndSwatches }}>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" classes={{ root: classes.stock }}>
                  {stockDisplay}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QtyButton
              stock={stock}
              selectedVariant={selectedVariant}
              variants={variants}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
