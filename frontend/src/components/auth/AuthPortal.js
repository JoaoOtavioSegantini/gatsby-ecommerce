import React, { useContext, useEffect, useState } from "react"
import { Grid, makeStyles, Paper } from "@material-ui/core"
import Login from "./Login"
import SignUp from "./SignUp"
import Complete from "./Complete"
import { UserContext, FeedbackContext } from "../../contexts"
import Reset from "./Reset"
import axios from "axios"
import { setFeedBack, setUser } from "../../contexts/actions"

const useStyles = makeStyles(theme => ({
  paper: {
    border: `2rem solid ${theme.palette.secondary.main}`,
    width: "50rem",
    height: "40rem",
    borderRadius: 0,
    [theme.breakpoints.down("md")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 2rem)",
      borderWidth: "1rem",
    },
  },
  inner: {
    width: "100%",
    height: "40rem",
    border: `2rem solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("xs")]: {
      borderWidth: "1rem",
    },
  },
  container: {
    marginBottom: "8rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "5rem",
    },
  },
}))

export default function AuthPortal() {
  const classes = useStyles()
  const [selectedStep, setSelectedStep] = useState(0)
  const { user, dispatchUser } = useContext(UserContext)
  const { feedback, dispatchFeedback } = useContext(FeedbackContext)

  const steps = [
    { component: Login, label: "Login" },
    { component: SignUp, label: "SignUp" },
    { component: Complete, label: "Complete" },
    { component: Reset, label: "Reset" },
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    const access_token = params.get("access_token")

    if (code) {
      const reset = steps.find(step => step.label === "Reset")
      setSelectedStep(steps.indexOf(reset))
    } else if (access_token) {
      axios
        .get(process.env.GATSBY_STRAPI_URL + "/auth/facebook/callback", {
          params: { access_token },
        })
        .then(response => {
          dispatchUser(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
              onboarding: true,
            })
          )
          window.location.replaceState(null, null, window.location.pathname)
        })
        .catch(err => {
          console.error(err)
          dispatchFeedback(
            setFeedBack({
              message: "Connecting with Facebook failed. Please, try again!",
              status: "error",
              open: true,
            })
          )
        })
    }
  }, [])

  return (
    <Grid
      container
      justifyContent="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <Paper elevation={6} classes={{ root: classes.paper }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            classes={{ root: classes.inner }}
          >
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <Step.component
                  setSelectedStep={setSelectedStep}
                  steps={steps}
                  user={user}
                  feedback={feedback}
                  dispatchFeedback={dispatchFeedback}
                  dispatchUser={dispatchUser}
                  key={Step.label}
                />
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
