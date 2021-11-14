import React from "react"
import { Chip, Grid, makeStyles, Typography } from "@material-ui/core"
import frame from "../../images/product-frame-list.svg"
import Rating from "../home/rating"
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./QtyButton"

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "28rem",
  },
  info: {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    width: "100%",
    padding: "1rem"
  },
  productImage: {
    height: "20rem",
    width: "20rem",
  },
  stock: {
    color: "#fff",
  },
  sizesAndSwatches: {
    maxWidth: "13.2rem",
  },
}))

export default function ProductFrameList({
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

  return (
    <Grid item container>
      <Grid
        item
        xs={9}
        container
        alignItems="center"
        justifyContent="space-around"
        classes={{ root: classes.frame }}
      >
        {variant.images.map(image => (
          <Grid item key={image.url}>
            <img
              src={process.env.GATSBY_STRAPI_URL + image.url}
              alt={image.url}
              className={classes.productImage}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={3}
        container
        direction="column"
        justifyContent="space-between"
        classes={{ root: classes.info }}
      >
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h4">
              {product.node.name.split(" ")[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Rating number={4} />
          </Grid>
          <Grid item>
            <Chip label={`$${variant.price}`} />
          </Grid>
          <Grid item>
            <Typography variant="h3" classes={{ root: classes.stock }}>
              12 Currently In Stock
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          classes={{ root: classes.sizesAndSwatches }}
        >
          <Sizes
            sizes={sizes}
            setSelectedSize={setSelectedSize}
            selectedSize={selectedSize}
          />
          <Swatches
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </Grid>

        <QtyButton />
      </Grid>
    </Grid>
  )
}
