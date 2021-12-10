import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import clsx from "clsx"
import React, { useState } from "react"

import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import PasswordAdornment from "../../images/PasswordAdornment"
import HidePasswordIcon from "../../images/HidePassword"
import ShowPasswordIcon from "../../images/ShowPassword"
import addUserIcon from "../../images/add-user.svg"
import forgotPasswordIcon from "../../images/forgot.svg"
import close from "../../images/close.svg"
import Fields from "./Fields"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  accountIcon: {
    marginTop: "2rem",
  },
  login: {
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  facebookText: {
    fontSize: "1.5rem",
    fontWeight: 600,
    textTransform: "none",
  },
  facebookButton: {
    marginTop: "-1rem",
  },
  passwordError: {
    marginTop: 0,
  },
  close: {
    paddingTop: 5,
  },
  reset: {
    marginTop: "-4rem",
  },
  buttonText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: "10px",
  },
  login: {
    width: "20rem",
    borderRadius: 50,
    textTransform: "none",
  },
}))

export const EmailPassword = (hideEmail, hidePassword) => ({
  email: {
    helperText: "invalid email",
    placeholder: "Email",
    type: "text",
    hidden: hideEmail,
    startAdornment: (
      <span style={{ height: 17, width: 22, marginBottom: 10 }}>
        <EmailAdornment />
      </span>
    ),
  },
  password: {
    helperText:
      "your password must be at least eight characters and include one uppercase letter, one number, and one special character",
    placeholder: "Password",
    type: "password",
    hidden: hidePassword,
    startAdornment: <PasswordAdornment />,
  },
})

export default function Login({ steps, setSelectedStep }) {
  const classes = useStyles()
  //  const [visible, setVisible] = useState(false)
  const [errors, setErrors] = useState({})
  const [forgot, setForgot] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const fields = EmailPassword(false, forgot)

  const navigateToSignUp = () => {
    const signup = steps.find(step => step.label === "SignUp")

    setSelectedStep(steps.indexOf(signup))
  }

  const handleLogin = () => {
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then(response => console.log(response.data))
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} alt="Login page" />
      </Grid>
      <Fields
        errors={errors}
        fields={fields}
        setErrors={setErrors}
        setValues={setValues}
        values={values}
      />
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          disabled={!forgot && disabled}
          onClick={() => (forgot ? null : handleLogin())}
          classes={{
            root: clsx(classes.login, {
              [classes.reset]: forgot,
            }),
          }}
        >
          <Typography variant="h5">
            {forgot ? "Reset password" : "Login"}
          </Typography>
        </Button>
      </Grid>
      {!forgot && (
        <Grid item>
          <Button classes={{ root: classes.facebookButton }}>
            <Typography variant="h3" classes={{ root: classes.facebookText }}>
              login with Facebook
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={navigateToSignUp}>
            <img src={addUserIcon} alt="add-user-icon" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setForgot(!forgot)}>
            <img
              src={forgot ? close : forgotPasswordIcon}
              alt={forgot ? "back to login page" : "forgot password"}
              className={clsx({
                [classes.close]: forgot,
              })}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
