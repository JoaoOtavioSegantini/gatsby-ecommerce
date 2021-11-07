import React, { useState } from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { Link } from "gatsby"
import clsx from "clsx"

import address from "../images/address.svg"
import phone from "../images/phone-adornment.svg"
import Email from "../images/EmailAdornment"
import send from "../images/send.svg"
import nameAdornment from "../images/name-adornment.svg"
import PhoneAdornment from "../images/PhoneAdornment"

import Layout from "../components/ui/layout"
import validate from "../components/ui/validate"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: "45rem",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "8rem",
      height: "90rem",
    },
  },
  formWrapper: {
    height: "100%",
    [theme.breakpoints.down("md")]: {
      height: "50%",
      marginTop: "-8rem",
    },
  },
  formContainer: {
    height: "100%",
  },
  blockContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: "8rem",
    width: "40rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  titleContainer: {
    marginTop: "-4rem",
  },
  buttonContainer: {
    marginBottom: "-4rem",
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  sendIcon: {
    marginLeft: "2rem",
  },
  contactInfo: {
    fontSize: "1.5rem",
    marginLeft: "1rem",
  },
  contactIcon: {
    height: "3rem",
    width: "3rem",
  },
  contactEmailIcon: {
    height: "2.25rem",
    width: "3rem",
  },
  infoContainer: {
    height: "21.25rem",
    [theme.breakpoints.down("xs")]: {
      height: "15.25rem",
    },
  },
  middleInfo: {
    borderTop: "2px solid #fff",
    borderBottom: "2px solid #fff",
  },
  iconContainer: {
    borderRight: "2px solid #fff",
    height: "7rem",
    width: "8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      height: "5rem",
      width: "6rem",
    },
  },
  textField: {
    width: "30rem",
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
    },
  },
  multiline: {
    border: "2px solid #fff",
    borderRadius: 10,
    padding: "1rem",
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main}`,
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disable):before":
      {
        borderBottom: "2px solid #fff",
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  input: {
    color: "#fff",
  },
  fieldContainer: {
    marginBottom: "1rem",
  },
  multilineContainer: {
    marginTop: "1rem",
  },
  EmailAdornment: {
    height: 17,
    width: 22,
  },
  PhoneAdornment: {
    height: 25.122,
    width: 25.173,
  },
  buttonDisabled: {
    backgroundColor: theme.palette.grey[500],
  },
  sendMessage: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5rem",
    },
  },
}))

const ContactPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})
  const matchsMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchsXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  return (
    <Layout>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        classes={{ root: classes.mainContainer }}
        direction={matchsMD ? "column" : "row"}
      >
        {/* Contact form*/}
        <Grid item classes={{ root: classes.formWrapper }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            classes={{ root: classes.formContainer }}
            alignItems="center"
          >
            <Grid
              item
              classes={{
                root: clsx(classes.titleContainer, classes.blockContainer),
              }}
            >
              <Typography variant="h4">Contact us</Typography>
            </Grid>
            <Grid item>
              <Grid direction="column">
                <Grid container direction="column">
                  <Grid item classes={{ root: classes.fieldContainer }}>
                    <TextField
                      placeholder="Name"
                      value={name}
                      onChange={e => {
                        if (errors.name) {
                          const valid = validate({ name: e.target.value })
                          setErrors({ ...errors, name: !valid.name })
                        }
                        setName(e.target.value)
                      }}
                      classes={{ root: classes.textField }}
                      onBlur={e => {
                        const valid = validate({ name: name })
                        setErrors({ ...errors, name: !valid.name })
                      }}
                      error={errors.name}
                      helperText={errors.name && "you must enter a name"}
                      InputProps={{
                        classes: { input: classes.input },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={nameAdornment} alt="name" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item classes={{ root: classes.fieldContainer }}>
                    <TextField
                      placeholder="Email"
                      value={email}
                      onChange={e => {
                        if (errors.email) {
                          const valid = validate({ email: e.target.value })
                          setErrors({ ...errors, email: !valid.email })
                        }
                        setEmail(e.target.value)
                      }}
                      classes={{ root: classes.textField }}
                      onBlur={e => {
                        const valid = validate({ email })
                        setErrors({ ...errors, email: !valid.email })
                      }}
                      error={errors.email}
                      helperText={errors.email && "invalid email"}
                      InputProps={{
                        classes: { input: classes.input },
                        startAdornment: (
                          <InputAdornment position="start">
                            <div className={classes.EmailAdornment}>
                              <Email
                                color={theme.palette.secondary.main}
                                alt="email"
                              />
                            </div>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item classes={{ root: classes.fieldContainer }}>
                    <TextField
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={e => {
                        if (errors.phone) {
                          const valid = validate({ phone: e.target.value })
                          setErrors({ ...errors, phone: !valid.phone })
                        }
                        setPhone(e.target.value)
                      }}
                      classes={{ root: classes.textField }}
                      onBlur={e => {
                        const valid = validate({ phone: phoneNumber })
                        setErrors({ ...errors, phone: !valid.phone })
                      }}
                      error={errors.phone}
                      helperText={errors.phone && "invalid phone number"}
                      InputProps={{
                        classes: { input: classes.input },
                        startAdornment: (
                          <InputAdornment position="start">
                            <div className={classes.PhoneAdornment}>
                              <PhoneAdornment
                                color={theme.palette.secondary.main}
                                alt="phone"
                              />
                            </div>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item classes={{ root: classes.multilineContainer }}>
                    <TextField
                      rows={8}
                      multiline
                      placeholder="Message"
                      value={message}
                      onChange={e => {
                        if (errors.message) {
                          const valid = validate({ message: e.target.value })
                          setErrors({ ...errors, message: !valid.message })
                        }
                        setMessage(e.target.value)
                      }}
                      classes={{ root: classes.textField }}
                      onBlur={e => {
                        const valid = validate({ message })
                        setErrors({ ...errors, message: !valid.message })
                      }}
                      error={errors.message}
                      helperText={errors.message && "you must enter a message"}
                      InputProps={{
                        disableUnderline: true,
                        classes: {
                          input: classes.input,
                          multiline: classes.multiline,
                          error: classes.multilineError,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              component={Button}
              disabled={
                Object.keys(errors).some(error => errors[error] === true) ||
                Object.keys(errors).length !== 4
              }
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer, {
                  [classes.buttonDisabled]:
                    Object.keys(errors).some(error => errors[error] === true) ||
                    Object.keys(errors).length !== 4,
                }),
              }}
            >
              <Typography variant="h4" classes={{ root: classes.sendMessage }}>send message</Typography>
              <img src={send} alt="send message" className={classes.sendIcon} />
            </Grid>
          </Grid>
        </Grid>
        {/* Contact info*/}
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            classes={{ root: classes.infoContainer }}
          >
            <Grid item container alignItems="center">
              <Grid item classes={{ root: classes.iconContainer }}>
                <img
                  src={address}
                  alt="address"
                  className={classes.contactIcon}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h2"
                  classes={{ root: classes.contactInfo }}
                >
                  1234 S Example St {matchsXS ? <br /> : null}Wichita, KS 67111
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              classes={{ root: classes.middleInfo }}
            >
              <Grid item classes={{ root: classes.iconContainer }}>
                <img src={phone} alt="phone" className={classes.contactIcon} />
              </Grid>
              <Grid item>
                <Typography
                  variant="h2"
                  classes={{ root: classes.contactInfo }}
                >
                  (555) 555-555
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center">
              <Grid item classes={{ root: classes.iconContainer }}>
                <div className={classes.contactEmailIcon}>
                  <Email color="#fff" />
                </div>
              </Grid>
              <Grid item>
                <Typography
                  variant="h2"
                  classes={{ root: classes.contactInfo }}
                >
                  joaossmp@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
