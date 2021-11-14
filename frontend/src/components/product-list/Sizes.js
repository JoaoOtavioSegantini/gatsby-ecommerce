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
  const possibleSizes = ["S", "M", "L"]
  let actualSizes = []
  const formattSize = sizes.map(size => size.substring(0, 1))

  if (possibleSizes.some(size => formattSize.includes(size))) {
    actualSizes = possibleSizes
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
