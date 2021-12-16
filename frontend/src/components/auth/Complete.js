import React, { useEffect } from "react"
import { Grid, Typography, makeStyles, Button } from "@material-ui/core"

import checkmark from "../../images/checkmark-outline.svg"
import forward from "../../images/forward-outline.svg"
import { setUser } from "../../contexts/actions"

const useStyles = makeStyles(theme => ({
  iconText: {
    marginTop: "10rem",
  },
  text: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textTransform: "none",
  },
  shop: {
    marginLeft: "1rem",
  },
  shopContainer: {
    marginRight: "1rem",
    marginBottom: "1rem",
  },
}))

export default function Complete({ user, dispatchUser }) {
  const classes = useStyles()

  useEffect(() => {
    return () => {
      dispatchUser(setUser({ ...user, onboarding: true }))
    }
  }, [])

  return (
    <>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.iconText }}
      >
        <Grid item>
          <img src={checkmark} alt="sign up finished" />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h3" classes={{ root: classes.text }}>
          Account created!
        </Typography>
      </Grid>
      <Grid item container justifyContent="flex-end">
        <Grid item classes={{ root: classes.shopContainer }}>
          <Button>
            <Typography variant="h3" classes={{ root: classes.text }}>
              Shop
            </Typography>
            <img src={forward} alt="go to store" className={classes.shop} />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
