import React from "react"
import { Grid, makeStyles } from "@material-ui/core"
import Details from "./Details"
import Payments from "./Payments"
import Location from "./Location"
import Edit from "./Edit"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  bottomRow: {
    borderTop: "4px solid #fff",
  },
  sectionContainer: {
    height: "50%",
  },
}))

export default function Settings({ setSelectedSetting, user }) {
  const classes = useStyles()

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details user={user} />
        <Payments user={user} />
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Location user={user} />
        <Edit user={user} setSelectedSetting={setSelectedSetting} />
      </Grid>
    </>
  )
}
