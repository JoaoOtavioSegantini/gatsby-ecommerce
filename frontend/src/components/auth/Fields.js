import React from "react"
import { Grid, InputAdornment, makeStyles, TextField } from "@material-ui/core"
import validate from "../ui/validate"

const useStyles = makeStyles(theme => ({
  textField: {
    width: "20rem",
    display: "flex",
  },
  input: {
    color: ({ isWhite }) => (isWhite ? "#fff" : theme.palette.secondary.main),
  },
}))

export default function Fields({
  fields,
  values,
  errors,
  setErrors,
  setValues,
  isWhite,
  disabled,
}) {
  const classes = useStyles({ isWhite })

  return Object.keys(fields).map(field => {
    const validateHelper = event => {
      return validate({ [field]: event.target.value })
    }
    return !fields[field].hidden ? (
      <Grid item key={field}>
        <TextField
          value={values[field]}
          disabled={disabled}
          onChange={e => {
            const valid = validateHelper(e)

            if (errors[field] || valid[field] === true) {
              setErrors({ ...errors, [field]: !valid[field] })
            }

            setValues({ ...values, [field]: e.target.value })
          }}
          classes={{ root: classes.textField }}
          onBlur={e => {
            const valid = validateHelper(e)
            setErrors({ ...errors, [field]: !valid[field] })
          }}
          error={errors[field]}
          helperText={errors[field] && fields[field].helperText}
          type={fields[field].type}
          placeholder={fields[field].placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {fields[field].startAdornment}
              </InputAdornment>
            ),

            // endAdornment: (
            //   <IconButton
            //     classes={{ root: classes.emailAdornment }}
            //     onClick={() => setVisible(!visible)}
            //   >
            //     {visible ? <ShowPasswordIcon /> : <HidePasswordIcon />}
            //   </IconButton>
            // ),
            classes: { input: classes.input },
          }}
        />
      </Grid>
    ) : null
  })
}
