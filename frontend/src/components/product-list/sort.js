import React from "react"
import {
  Grid,
  makeStyles,
  IconButton,
  Chip,
  useMediaQuery,
} from "@material-ui/core"
import clsx from "clsx"
import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const useStyles = makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down("md")]: {
      margin: "0.5rem",
    },
  },
  notActive: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function Sort({ setOption }) {
  const classes = useStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))
  const sortOptions = [
    { label: "A-Z" },
    { label: "Z-A" },
    { label: "NEWEST" },
    { label: "OLDEST" },
    { label: "PRICE ↑" },
    { label: "PRICE ↓" },
    { label: "REVIEWS" },
  ]

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justifyContent="space-around"
          direction={matchesXS ? "column" : "row"}
          alignItems={matchesXS ? "center" : undefined}
        >
          {sortOptions.map(option => (
            <Grid
              item
              key={option.label}
              classes={{ root: classes.chipContainer }}
            >
              <Chip
                label={option.label}
                classes={{
                  root: clsx({
                    [classes.notActive]: option.active !== true,
                  }),
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
