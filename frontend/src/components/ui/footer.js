import React from "react"
import { Grid, Typography, IconButton } from "@material-ui/core"
import { Link } from "gatsby"

import footerStyles from "./footerStyles"

import facebook from "../../images/facebook.svg"
import twitter from "../../images/twitter.svg"
import instagram from "../../images/instagram.svg"

export default function Footer() {
  const classes = footerStyles()

  const socialMedia = [
    { icon: facebook, alt: "facebook", link: "https://facebook.com" },
    { icon: instagram, alt: "instagram", link: "https://instagram.com" },
    { icon: twitter, alt: "twitter", link: "https://twitter.com" },
  ]

  const routes = {
    "Contact Us": [
      { label: "(555) 555-5555", href: "tel:(555) 555-5555" },
      { label: "joaossmp@gmail.com", href: "mailto:joaossmp@gmail.com" },
    ],
    "Customer Service": [
      { label: "Contact Us", link: "/contact" },
      { label: "My Account", link: "/account" },
    ],
    Information: [
      { label: "Privacy Policy", link: "/privacy-policy" },
      { label: "Terms and Conditions", link: "/terms-conditions" },
    ],
  }
  return (
    <footer className={classes.footer}>
      <Grid container justifyContent="space-between">
        <Grid item classes={{ root: classes.linkContainer }}>
          <Grid container>
            {Object.keys(routes).map(category => (
              <Grid
                item
                key={category}
                container
                direction="column"
                classes={{ root: classes.linkColumn }}
              >
                <Grid item>
                  <Typography variant="h5">{category}</Typography>
                </Grid>
                {routes[category].map(route => (
                  <Grid item key={route.label}>
                    <Typography
                      component={route.link ? Link : "a"}
                      to={route.link ? route.link : undefined}
                      href={route.href ? route.href : undefined}
                      variant="body1"
                      classes={{ body1: classes.link }}
                    >
                      {route.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {socialMedia.map(platform => (
              <Grid item key={platform.alt}>
                <IconButton
                  component="a"
                  disableRipple
                  href={platform.link}
                  classes={{ root: classes.icon }}
                >
                  <img src={platform.icon} alt={platform.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}
