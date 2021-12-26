import React, { useContext, useEffect, useState } from "react"
import clsx from "clsx"
import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import accountIcon from "../../images/account.svg"
import settingsIcon from "../../images/settings.svg"
import orderHistoryIcon from "../../images/order-history.svg"
import favoritesIcon from "../../images/favorite.svg"
import background from "../../images/toolbar-background.svg"
import subscriptionIcon from "../../images/subscription.svg"
import { UserContext } from "../../contexts"
import { useSprings, animated, useSpring } from "react-spring"
import useResizeAware from "react-resize-aware"
import Settings from "./Settings"
import { setUser } from "../../contexts/actions"

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
    borderTop: ({ showComponent }) =>
      `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
    borderBottom: ({ showComponent }) =>
      `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
    margin: "5rem 0",
  },
  icon: {
    width: "12rem",
    height: "12rem",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
  addHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  logout: {
    color: theme.palette.error.main,
  },
}))

const AnimatedButton = animated(Button)
const AnimatedGrid = animated(Grid)

export default function SettingsPortal() {
  const { user, dispatchUser, defaultUser } = useContext(UserContext)
  const [selectedSettings, setSelectedSettings] = useState(null)
  const [resizesDetect, sizes] = useResizeAware()
  const [showComponent, setShowComponent] = useState(false)
  const classes = useStyles({ showComponent })
  const buttons = [
    { label: "Settings", icon: settingsIcon, component: Settings },
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

  const styles = useSpring({
    opacity: selectedSettings === null || showComponent ? 1 : 0,
    delay: selectedSettings === null || showComponent ? 0 : 1350,
  })

  const handleClick = settings => {
    if (settings === selectedSettings) {
      setSelectedSettings(null)
    } else {
      setSelectedSettings(settings)
    }
  }

  useEffect(() => {
    if (selectedSettings === null) {
      setShowComponent(false)
      return
    }

    const timer = setTimeout(() => setShowComponent(true), 2000)

    return () => clearTimeout(timer)
  }, [selectedSettings])

  const handleLogout = () => {
    dispatchUser(setUser(defaultUser))
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
      <Grid item>
        <Button onClick={handleLogout}>
          <Typography variant="h5" classes={{ root: classes.logout }}>
            logout
          </Typography>
        </Button>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="space-around"
        classes={{ root: classes.dashboard }}
      >
        {springs.map((prop, i) => {
          const button = buttons[i]
          return (
            <Grid item key={i}>
              <AnimatedGrid
                variant="contained"
                color="primary"
                style={prop}
                onClick={() =>
                  showComponent ? null : handleClick(button.label)
                }
                classes={{
                  root: clsx(classes.button, {
                    [classes.addHover]: !showComponent,
                  }),
                }}
              >
                <AnimatedGrid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={styles}
                >
                  {selectedSettings === button.label && showComponent ? (
                    <button.component
                      user={user}
                      dispatchUser={dispatchUser}
                      setSelectedSetting={setSelectedSettings}
                    />
                  ) : (
                    <>
                      <Grid item>
                        <img
                          src={button.icon}
                          alt={button.label}
                          className={classes.icon}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5">{button.label}</Typography>
                      </Grid>
                    </>
                  )}
                </AnimatedGrid>
              </AnimatedGrid>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}
