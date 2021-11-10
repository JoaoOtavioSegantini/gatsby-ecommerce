import React from "react"
import { Grid, makeStyles, Typography } from "@material-ui/core"

import frame from "../../images/product-frame-grid.svg"

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
    marginTop: "-0.1rem"
  },
}))

export default function ProductFrameGrid({ product, variant }) {
  const classes = useStyles()

  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={process.env.GATSBY_STRAPI_URL + variant.images[0].url}
            alt={product.node.name}
            className={classes.product}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" classes={{ root: classes.title }}>
            {product.node.name.split(" ")[0]}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
