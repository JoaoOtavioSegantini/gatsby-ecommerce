import React, { useState } from "react"
import axios from "axios"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  makeStyles,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core"

import Fields from "../auth/Fields"
import { EmailPassword } from "../auth/Login"

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.error.main,
  },
  button: {
    fontFamily: "Montserrat",
  },
}))

export default function Confirmation({
  dialogOpen,
  setDialogOpen,
  user,
  dispatchFeedback,
  setFeedBack,
}) {
  const classes = useStyles()
  const [values, setValues] = useState({ password: "", confirmation: "" })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))
  const { password } = EmailPassword(false, false)

  const fields = {
    password: { ...password, placeholder: "Old Password" },
    confirmation: { ...password, placeholder: "New Password" },
  }

  const handleConfirm = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
        identifier: user.email,
        password: values.password,
      })
      .then(response => {
        axios
          .post(
            process.env.GATSBY_STRAPI_URL +
              "/users-permissions/change-password",
            {
              password: values.confirmation,
            },
            { headers: { Authorization: `Bearer ${user.jwt}` } }
          )
          .then(response => {
            setLoading(false)
            setDialogOpen(false)
            dispatchFeedback(
              setFeedBack({
                status: "success",
                message: "Password Changed Successfully",
                open: true,
              })
            )
            setValues({ password: "", confirmation: "" })
          })
          .catch(error => {
            setLoading(false)
            console.error(error)
            dispatchFeedback(
              setFeedBack({
                status: "error",
                open: true,
                message:
                  "There was a problem changing your password, please try again.",
              })
            )
          })
      })
      .catch(error => {
        setLoading(false)
        console.error(error)
        dispatchFeedback(
          setFeedBack({
            status: "error",
            message: "Old Password Invalid.",
            open: true,
          })
        )
      })
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  const handleCancel = () => {
    setDialogOpen(false)
    dispatchFeedback(
      setFeedBack({
        status: "error",
        message: "Your password has NOT been changed.",
        open: true,
      })
    )
  }

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle disableTypography>
        <Typography
          align={matchesXS ? "center" : undefined}
          variant="h3"
          classes={{ root: classes.title }}
        >
          Change Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText align={matchesXS ? "center" : undefined}>
          You are changing your account password. Please confirm old password
          and new password.
        </DialogContentText>
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color="primary"
          disabled={loading}
          classes={{ root: classes.button }}
        >
          Do Not Change Password
        </Button>
        <Button
          onClick={handleConfirm}
          color="secondary"
          disabled={loading || disabled}
          classes={{ root: classes.button }}
        >
          {loading ? <CircularProgress /> : "Yes, Change My Password"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
