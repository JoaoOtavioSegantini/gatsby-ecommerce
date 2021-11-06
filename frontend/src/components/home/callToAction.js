import React from "react"
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core"
import { Link } from "gatsby"

import cta from "../../images/cta.svg"

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: "15rem",
  },
  icon: {
    [theme.breakpoints.down("xs")]: {
      height: "18rem",
      width: "20rem",
    },
  },
  headingContainer: {
    [theme.breakpoints.down("md")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  body: {
    maxWidth: "45rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  buttonContainer: {
    marginTop: "3rem",
  },
  account: {
    color: "#fff",
    marginLeft: "2rem",
  },
}))

export default function CallToAction() {
  const classes = useStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      direction={matchesMD ? "column" : "row"}
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img src={cta} alt="quality committed" className={classes.icon} />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item classes={{ root: classes.headingContainer }}>
            <Typography align={matchesMD ? "center" : undefined} variant="h1">
              Committed To Quality
            </Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
            >
              At VAR X our mission is to provide comfortable, durable, premium,
              designer clothing and clothing accessories to developers and
              technology enthusiasts
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={matchesMD ? "center" : undefined}
            classes={{ root: classes.buttonContainer }}
          >
            <Grid item>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                color="primary"
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/account"
                classes={{ root: classes.account }}
              >
                Create account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
