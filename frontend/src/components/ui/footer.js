import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { Link } from "gatsby"

import footerStyles from "./footerStyles"

import facebook from "../../images/facebook.svg"
import twitter from "../../images/twitter.svg"
import instagram from "../../images/instagram.svg"

export default function Footer() {
  const classes = footerStyles()

  return (
    <footer className={classes.footer}>
      <Grid container justifyContent="space-between">
        <Grid item classes={{ root: classes.linkContainer }}>
          <Grid container>
            <Grid
              item
              container
              direction="column"
              classes={{ root: classes.linkColumn }}
            >
              <Grid item>
                <Typography variant="h5">Contact us</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" classes={{ body1: classes.link }}>
                  (555) 555-55555
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" classes={{ body1: classes.link }}>
                  zachary@var-x.com
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              classes={{ root: classes.linkColumn }}
            >
              <Grid item>
                <Typography variant="h5">Customer Service</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" classes={{ body1: classes.link }}>
                  Contact us
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" classes={{ body1: classes.link }}>
                  My account
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              classes={{ root: classes.linkColumn }}
            >
              <Grid item>
                <Typography variant="h5">Information</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" classes={{ body1: classes.link }}>
                  Privacy Policy
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" classes={{ body1: classes.link }}>
                  Terms & Conditions
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <img src={facebook} alt="facebook" />
            </Grid>
            <Grid item classes={{ root: classes.spacer }}>
              <img src={instagram} alt="instagram" />
            </Grid>
            <Grid item>
              <img src={twitter} alt="twitter" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}
