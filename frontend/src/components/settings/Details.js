import React, { useEffect, useState } from "react"
import { Grid, makeStyles } from "@material-ui/core"

import NameAdornment from "../../images/NameAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import fingerprint from "../../images/fingerprint.svg"
import { EmailPassword } from "../auth/Login"
import Fields from "../auth/Fields"
import Slots from "./Slots"

const useStyles = makeStyles(theme => ({
  phoneAdornment: {
    height: 25.122,
    width: 25.173,
  },
  slotContainer: {
    position: "absolute",
    bottom: 0,
  },
  detailsContainer: {
    position: "relative",
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  icon: {
    marginBottom: "2rem",
  },
  fieldContainer: {
    "& > :not(:first-child)": {
      marginLeft: "5rem",
    },
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before":
      {
        borderBottom: "2px solid #fff",
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}))

export default function Details({ user }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "********",
  })
  const [errors, setErrors] = useState({})
  const [slot, setSlot] = useState(0)

  const email_password = EmailPassword(false, false, true)

  const name_phone = {
    name: {
      helperText: "Please, insert a name",
      placeholder: "Name",
      startAdornment: <NameAdornment color="#fff" />,
    },
    phone: {
      helperText: "Please, insert a valid phone number",
      placeholder: "Phone",
      startAdornment: (
        <div className={classes.phoneAdornment}>
          <PhoneAdornment />
        </div>
      ),
    },
  }

  const fields = [name_phone, email_password]

  useEffect(() => {
    setValues({ ...user.contactInfo[slot], password: "********" })
  }, [slot])

  return (
    <Grid
      item
      container
      direction="column"
      xs={6}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.detailsContainer }}
    >
      <Grid item>
        <img
          src={fingerprint}
          alt="details settings"
          className={classes.icon}
        />
      </Grid>
      {fields.map((pair, i) => (
        <Grid
          container
          justifyContent="center"
          key={i}
          classes={{ root: classes.fieldContainer }}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isWhite
          />
        </Grid>
      ))}
      <Grid item container classes={{ root: classes.slotContainer }}>
        <Slots slot={slot} setSlot={setSlot} name="Details" />
      </Grid>
    </Grid>
  )
}
