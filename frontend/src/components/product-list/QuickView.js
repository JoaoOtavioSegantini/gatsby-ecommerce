import React from "react"
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"

import frame from "../../images/selected-frame.svg"
import explore from "../../images/explore.svg"
import Rating from "../home/rating"
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./QtyButton"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
  selectedFrame: {
    backgroundImage: `url(${frame})`,
    height: "60.4rem",
    width: "73.4rem",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "0 !important",
  },
  dialog: {
    maxWidth: "100%",
  },
  productImage: {
    height: "40rem",
    width: "40rem",
    marginTop: "5rem",
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    height: "13rem",
    marginTop: "2rem",
    padding: "0.5rem 1rem",
    position: "relative",
  },
  stock: {
    color: "#fff",
  },
  details: {
    color: "#fff",
    textTransform: "none",
    fontSize: "1.5rem",
  },
  exploreIcon: {
    height: "1.5rem",
    width: "2rem",
  },
  detailButton: {
    padding: "0px",
  },
  infoContainer: {
    height: "100%",
  },
  chipRoot: {
    transform: "scale(1.5)",
  },
  chipContainer: {
    display: "flex",
    alignItems: "center",
  },
  qtyContainer: {
    marginTop: "2.25rem",
  },
  infoItem: {
    position: "absolute",
    left: "1rem",
    height: "calc(100% - 1rem)",
  },
  actions: {
    position: "absolute",
    right: "1rem",
  },
}))

export default function QuickView({
  open,
  setOpen,
  url,
  name,
  price,
  product,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedColor,
  setSelectedSize,
}) {
  const classes = useStyles()

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent classes={{ root: classes.selectedFrame }}>
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            component={Link}
            to={`/${product.node.category.name.toLowerCase()}/${
              product.node.name.split(" ")[0]
            }`}
          >
            <img src={url} alt="product" className={classes.productImage} />
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            classes={{ root: classes.toolbar }}
          >
            <Grid item classes={{ root: classes.infoItem }}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                classes={{ root: classes.infoContainer }}
                component={Link}
                to={`/${product.node.category.name.toLowerCase()}/${
                  product.node.name.split(" ")[0]
                }`}
              >
                <Grid item>
                  <Typography variant="h4">{name}</Typography>
                  <Rating number={3.5} />
                </Grid>
                <Grid item>
                  <Typography classes={{ root: classes.stock }} variant="h3">
                    12 Currently in Stock
                  </Typography>
                  <Button classes={{ root: classes.detailButton }}>
                    <Typography
                      variant="h3"
                      classes={{ root: classes.details }}
                    >
                      Details
                    </Typography>
                    <img
                      src={explore}
                      className={classes.exploreIcon}
                      alt="go to product detail page"
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item classes={{ root: classes.chipContainer }}>
              <Chip label={`$${price}`} classes={{ root: classes.chipRoot }} />
            </Grid>
            <Grid item classes={{ root: classes.actions }}>
              <Grid container direction="column">
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
                <span className={classes.qtyContainer}>
                  <QtyButton />
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
