import React, { useContext, useState } from "react"
import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import accountIcon from "../../images/account.svg"
import settingsIcon from "../../images/settings.svg"
import orderHistoryIcon from "../../images/order-history.svg"
import favoritesIcon from "../../images/favorite.svg"
import background from "../../images/toolbar-background.svg"
import subscriptionIcon from "../../images/subscription.svg"
import { UserContext } from "../../contexts"
import { useSprings, animated } from "react-spring"
import useResizeAware from "react-resize-aware"

const useStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.secondary.main,
  },
  dashboard: {
    width: "100%",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "30rem",
    height: "auto",
    borderTop: `0.5rem solid ${theme.palette.primary.main}`,
    borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
    margin: "5rem 0",
  },
  icon: {
    width: "12rem",
    height: "12rem",
  },
}))

const AnimatedButton = animated(Button)

export default function SettingsPortal() {
  const classes = useStyles()
  const { user } = useContext(UserContext)
  const [selectedSettings, setSelectedSettings] = useState(null)
  const [resizesDetect, sizes] = useResizeAware()

  const buttons = [
    { label: "Settings", icon: settingsIcon },
    { label: "Order history", icon: orderHistoryIcon },
    { label: "Favorites", icon: favoritesIcon },
    { label: "Subscriptions", icon: subscriptionIcon },
  ]

  const springs = useSprings(
    buttons.length,
    buttons.map(button => ({
      to: async (next, cancel) => {
        const scale = {
          transform:
            selectedSettings === button.label || selectedSettings === null
              ? "scale(1)"
              : "scale(0)",
          delay: selectedSettings !== null ? 0 : 600,
        }

        const size = {
          width:
            selectedSettings === button.label ? `${sizes.width}px` : "352px",
          height: selectedSettings === button.label ? "60rem" : "22rem",
          borderRadius: selectedSettings === button.label ? 0 : 25,
          delay: selectedSettings !== null ? 600 : 0,
        }

        const hide = {
          display:
            selectedSettings === button.label || selectedSettings === null
              ? "flex"
              : "none",
          delay: 150,
        }
        await next(selectedSettings !== null ? scale : size)
        await next(hide)
        await next(selectedSettings !== null ? size : scale)
      },
    }))
  )

  const handleClick = settings => {
    if (settings === selectedSettings) {
      setSelectedSettings(null)
    } else {
      setSelectedSettings(settings)
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      {resizesDetect}
      <Grid item>
        <img src={accountIcon} alt="setting-account-image" />
      </Grid>
      <Grid item>
        <Typography variant="h4" classes={{ root: classes.name }}>
          Welcome, {user.username}!
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="space-around"
        classes={{ root: classes.dashboard }}
      >
        {springs.map((prop, i) => (
          <Grid item key={i}>
            <AnimatedButton
              variant="contained"
              color="primary"
              style={prop}
              onClick={() => handleClick(buttons[i].label)}
            >
              <Grid container direction="column">
                <Grid item>
                  <img
                    src={buttons[i].icon}
                    alt={buttons[i].label}
                    className={classes.icon}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{buttons[i].label}</Typography>
                </Grid>
              </Grid>
            </AnimatedButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
