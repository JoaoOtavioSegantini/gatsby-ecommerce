import React, { useState } from "react"
import { Grid, Typography, Button, makeStyles } from "@material-ui/core"

import Slots from "./Slots"

import cardIcon from "../../images/card.svg"

const useStyles = makeStyles(theme => ({
  number: {
    color: "#fff",
    marginBottom: "5rem",
  },
  removeCard: {
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: "2rem",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  removeCardText: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
    fontFamily: "Philosopher",
    fontStyle: "italic",
  },
  icon: {
    marginBottom: "3rem",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1rem",
    },
  },
  paymentContainer: {
    borderLeft: "4px solid #fff",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      height: "30rem",
      borderLeft: 0,
    },
  },
  slotContainer: {
    position: "absolute",
    bottom: 0,
  },
}))

export default function Payments({ user }) {
  const classes = useStyles()
  const [slot, setSlot] = useState(0)
  const card = user.paymentMethods[slot]

  return (
    <Grid
      item
      container
      direction="column"
      lg={6}
      xs={12}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.paymentContainer }}
    >
      <Grid item>
        <img src={cardIcon} alt="payment settings" className={classes.icon} />
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Typography
            align="center"
            variant="h3"
            classes={{ root: classes.number }}
          >
            {card.last4
              ? `${card.brand.toUpperCase()} **** **** **** ${card.last4}`
              : "Add A New Card During Checkout"}
          </Typography>
        </Grid>
        {card.last4 && (
          <Grid item>
            <Button variant="contained" classes={{ root: classes.removeCard }}>
              <Typography
                variant="h6"
                classes={{ root: classes.removeCardText }}
              >
                remove card
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container classes={{ root: classes.slotContainer }}>
        <Slots slot={slot} setSlot={setSlot} name="Payment" />
      </Grid>
    </Grid>
  )
}
