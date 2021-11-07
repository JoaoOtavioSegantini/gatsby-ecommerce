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

  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const matchsMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchsXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const disable =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== 4

  const fields = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      adornment: <img src={nameAdornment} alt="name" />,
    },
    email: {
      helperText: "invalid email",
      placeholder: "Email",
      adornment: (
        <div className={classes.EmailAdornment}>
          <Email color={theme.palette.secondary.main} alt="email" />
        </div>
      ),
    },
    phone: {
      helperText: "invalid phone",
      placeholder: "Phone Number",
      adornment: (
        <div className={classes.PhoneAdornment}>
          <PhoneAdornment color={theme.palette.secondary.main} alt="phone" />
        </div>
      ),
    },
    message: {
      helperText: "you must enter a message",
      placeholder: "Message",
      adornment: <div></div>,
      inputClasses: {
        multiline: classes.multiline,
        error: classes.multilineError,
      },
    },
  }

  const info = [
    {
      label: (
        <span>
          1234 S Example St {matchsXS ? <br /> : null}Wichita, KS 67111
        </span>
      ),
      icon: <img className={classes.contactIcon} src={address} alt="address" />,
    },
    {
      label: "(555) 555-5555",
      icon: (
        <div className={classes.contactIcon}>
          <PhoneAdornment />
        </div>
      ),
    },
    {
      label: "joaossmp@gmail.com",
      icon: (
        <div className={classes.contactEmailIcon}>
          <Email color="#fff" />
        </div>
      ),
    },
  ]

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
              <Grid container direction="column">
                {Object.keys(fields).map(field => {
                  const validateHelper = event => {
                    return validate({ [field]: event.target.value })
                  }
                  return (
                    <Grid
                      item
                      key={field}
                      classes={{
                        root:
                          field === "message"
                            ? classes.multilineContainer
                            : classes.fieldContainer,
                      }}
                    >
                      <TextField
                        placeholder={fields[field].placeholder}
                        value={values[field]}
                        onChange={e => {
                          const valid = validateHelper(e)

                          if (errors[field] || valid[field] === true) {
                            setErrors({ ...errors, [field]: !valid[field] })
                          }

                          setValues({ ...values, [field]: e.target.value })
                        }}
                        classes={{ root: classes.textField }}
                        multiline={field === "message"}
                        rows={field === "message" ? 8 : undefined}
                        onBlur={e => {
                          const valid = validateHelper(e)
                          setErrors({ ...errors, [field]: !valid[field] })
                        }}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}
                        InputProps={{
                          classes: {
                            input: classes.input,
                            ...fields[field].inputClasses,
                          },
                          disableUnderline: field === "message",
                          startAdornment: (
                            <InputAdornment position="start">
                              {fields[field].adornment}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid
              item
              component={Button}
              disabled={disable}
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer, {
                  [classes.buttonDisabled]: disable,
                }),
              }}
            >
              <Typography variant="h4" classes={{ root: classes.sendMessage }}>
                send message
              </Typography>
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
            {info.map((section, i) => (
                <Grid
                item
                key={section.label}
                container
                alignItems="center"
                classes={{ root: i === 1 ? classes.middleInfo : undefined }}
              >
                <Grid item classes={{ root: classes.iconContainer }}>
                  {section.icon}
                </Grid>
                <Grid item>
                  <Typography
                    classes={{ root: classes.contactInfo }}
                    variant="h2"
                  >
                    {section.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
           
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
