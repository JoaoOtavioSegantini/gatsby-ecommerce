import React, { useState } from "react"
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"

import addUserIcon from "../../images/add-user.svg"
import nameAdornment from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"
import { EmailPassword } from "./Login"
import Fields from "./Fields"
import clsx from "clsx"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  addUserIcon: {
    height: "10rem",
    width: "11rem",
    marginTop: "5rem",
  },
  facebookSignUp: {
    width: "20rem",
    borderRadius: 50,
    marginTop: "-3rem",
    [theme.breakpoints.down("xs")]: {
      width: "15rem",
    },
  },
  facebookText: {
    textTransform: "none",
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.25rem",
    },
  },
  navigation: {
    height: "4rem",
    width: "4rem",
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  removeButtonMargin: {
    marginTop: 0,
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before":
      {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
}))

export default function SignUp({ steps, setSelectedStep }) {
  const classes = useStyles()
  const [info, setInfo] = useState(false)
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleNavigate = direction => {
    if (direction === "forward") {
      setInfo(true)
    } else {
      if (info) {
        setInfo(false)
      } else {
        const login = steps.find(step => step.label === "Login")
        setSelectedStep(steps.indexOf(login))
      }
    }
  }

  const handleComplete = () => {
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local/register", {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then(response => {
        const complete = steps.find(step => step.label === "Complete")
        console.log(response.data.user)
        setSelectedStep(steps.indexOf(complete))
      })
      .catch(err => {
        console.error(err)
      })
  }

  const nameField = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <img src={nameAdornment} alt="name" />,
    },
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  const fields = info ? EmailPassword(false, false) : nameField

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt="new user" className={classes.addUserIcon} />
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
          disabled={info && disabled}
          onClick={info ? handleComplete : null}
          classes={{
            root: clsx(classes.facebookSignUp, {
              [classes.removeButtonMargin]: info,
            }),
          }}
        >
          <Typography variant="h5" classes={{ root: classes.facebookText }}>
            sign up{info ? "" : " with Facebook"}
          </Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <img
              src={backward}
              alt="back to login"
              className={classes.navigation}
            />
          </IconButton>
        </Grid>
        {!info && (
          <Grid item>
            <IconButton onClick={() => handleNavigate("forward")}>
              <img
                src={forward}
                alt="continue registration"
                className={classes.navigation}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}
