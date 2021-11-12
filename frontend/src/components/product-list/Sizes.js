import React from "react"
import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  size: {
    color: "#fff",
  },
  button: {
    border: "3px solid #fff",
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
    minWidth: 0,
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}))

export default function Sizes({ sizes, selectedSize, setSelectedSize }) {
  const classes = useStyles()
  const possibleSizes = ["Small", "Medium", "Large"]

  var actualSizes = []
  if (possibleSizes.some(size => sizes.includes(size))) {
    actualSizes = ["S", "M", "L"]
  }
  return (
    <Grid item container justifyContent="space-between">
      {actualSizes.map(size => (
        <Grid item key={size}>
          <Button
            classes={{
              root: clsx(classes.button, {
                [classes.selected]: size === selectedSize,
              }),
            }}
            onClick={() => setSelectedSize(size)}
          >
            <Typography variant="h3" classes={{ root: classes.size }}>
              {size}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
