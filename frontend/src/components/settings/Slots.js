import React from "react"
import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  slot: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: "2.5rem",
    height: "2.5rem",
    minWidth: 0,
    border: `0.15rem solid ${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  slotText: {
    color: theme.palette.secondary.main,
    marginLeft: "-0.25rem",
  },
  slotWrapper: {
    marginLeft: "1rem",
    marginBottom: "1rem",
    "& > :not(:first-child)": {
      marginLeft: "-0.5rem",
    },
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  selectedText: {
    color: "#fff",
  },
}))

export default function Slots({ slot, setSlot, name = "Default" }) {
  const classes = useStyles()
  return (
    <Grid item classes={{ root: classes.slotWrapper }}>
      {[1, 2, 3].map((number, index) => (
        <Button
          key={`${number}_from_${name}`}
          classes={{ root: classes.slot }}
          onClick={() => setSlot(index)}
          classes={{
            root: clsx(classes.slot, {
              [classes.selected]: slot === index,
            }),
          }}
        >
          <Typography
            variant="h5"
            classes={{
              root: clsx(classes.slotText, {
                [classes.selectedText]: slot === index,
              }),
            }}
          >
            {index + 1}
          </Typography>
        </Button>
      ))}
    </Grid>
  )
}
