import React from "react"
import { Button, Grid, makeStyles } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  swatch: {
    border: "3px solid #fff",
    height: "3rem",
    width: "3rem",
    minWidth: 0,
    borderRadius: 50,
  },
  swatchesContainer: {
    marginTop: "0.5rem",
    "&:not(:first-child)": {
      marginLeft: "-0.5rem",
    },
  },
  selectedColor: {
    borderColor: theme.palette.secondary.main,
  },
}))

export default function Swatches({ colors, selectedColor, setSelectedColor }) {
  const classes = useStyles()

  return (
    <Grid item container>
      {colors.sort().map(color => (
        <Grid item key={color} classes={{ root: classes.swatchesContainer }}>
          <Button
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            classes={{
              root: clsx(classes.swatch, {
                [classes.selectedColor]: selectedColor === color,
              }),
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}
