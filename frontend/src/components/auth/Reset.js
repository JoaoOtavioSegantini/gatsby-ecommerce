import React, { useEffect, useState } from "react"
import { Button, CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core"

import accountIcon from "../../images/account.svg"
import { EmailPassword } from "./Login"
import Fields from "./Fields"
import axios from "axios"
import { setFeedBack } from "../../contexts/actions"

const useStyles = makeStyles(theme => ({
  reset: {
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
    marginBottom: "4rem",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  icon: {
    marginTop: "2rem",
  },
  buttonText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
}))

export default function Reset({ dispatchFeedback, steps, setSelectedStep }) {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    password: "",
    confirmation: "",
  })

  const { password } = EmailPassword(false, false)

  const fields = {
    password,
    confirmation: {
      ...password,
      placeholder: "Confirm your password",
      helperText: "passwords do not match",
    },
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length ||
    values.password !== values.confirmation

  const handleReset = () => {
    setLoading(true)

    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/reset-password", {
        code,
        password: values.password,
        passwordConfirmation: values.confirmation,
      })
      .then(res => {
        setLoading(false)
        setSuccess(true)

        dispatchFeedback(
          setFeedBack({
            status: "success",
            message: "Password Reset Successfully",
            open: true,
          })
        )
      })
      .catch(error => {
        setLoading(false)

        const { message } = error.response.data.message[0].messages[0]
        console.error(error)

        dispatchFeedback(setFeedBack({ status: "error", message, open: true }))
      })
  }

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      window.history.replaceState(null, null, window.location.pathname)
      const login = steps.find(step => step.label === "Login")
      setSelectedStep(steps.indexOf(login))
    }, 6000)
    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <Grid item classes={{ root: classes.icon }}>
        <img src={accountIcon} alt="Login page" />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          classes={{ root: classes.reset }}
          disabled={loading || disabled}
          onClick={handleReset}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" classes={{ root: classes.buttonText }}>
              reset password
            </Typography>
          )}
        </Button>
      </Grid>
    </>
  )
}
