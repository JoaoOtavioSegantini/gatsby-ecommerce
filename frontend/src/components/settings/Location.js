import React, { useState, useEffect } from "react"
import { Grid, Chip, makeStyles, CircularProgress } from "@material-ui/core"
import axios from "axios"
import PropTypes from "prop-types"
import { IMaskInput } from "react-imask"

import Fields from "../auth/Fields"
import Slots from "./Slots"

import locationIcon from "../../images/location.svg"
import streetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"

const useStyles = makeStyles(theme => ({
  icon: {
    marginBottom: "3rem",
  },
  chipWrapper: {
    marginTop: "2rem",
    marginBottom: "3rem",
  },
  fieldContainer: {
    "& > :not(:first-child)": {
      marginTop: "2rem",
    },
  },
  slotContainer: {
    position: "absolute",
    bottom: 0,
  },
  locationContainer: {
    position: "relative",
  },
}))

export default function Location({
  user,
  edit,
  setChangesMade,
  values,
  setValues,
  slot,
  setSlot,
  errors,
  setErrors,
}) {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)

  const getLocation = () => {
    setLoading(true)

    axios
      // .get(
      //   `https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public-us&rows=1&sort=place_name&facet=country_code&facet=admin_name1&facet=place_name&facet=postal_code&refine.country_code=US&refine.postal_code=${values.zip}`
      // )
      .get(`https://ws.apicep.com/cep/${values.zip.replace(".", "")}.json`)
      .then(response => {
        setLoading(false)
        setValues({
          ...values,
          city: response.data.city,
          state: response.data.state,
        })
      })
      .catch(error => {
        setLoading(false)
        console.error(error)
      })
  }

  useEffect(() => {
    setValues(user.locations[slot])
  }, [slot])

  useEffect(() => {
    const changed = Object.keys(user.locations[slot]).some(
      field => values[field] !== user.locations[slot][field]
    )
    setChangesMade(changed)
    
    if (values.zip.length === 10 && !errors.zip && errors !== {}) {
      if (values.city) return

      getLocation()
    } else if (values.zip.length < 10 && values.city) {
      setValues({ ...values, city: "", state: "" })
    }
  }, [values])

  const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask={"##.###-###"}
        definitions={{
          "#": /[0-9]/,
        }}
        unmask={true}
        inputRef={ref}
        //  onAccept={(value) => onChange({ target: { name: props.name, value } })}
        onBlur={e => setValues({ ...values, zip: e.target.value })}
        overwrite
      />
    )
  })

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  const fields = {
    street: {
      placeholder: "Street",
      helperText: "invalid address",
      startAdornment: <img src={streetAdornment} alt="street" />,
    },
    zip: {
      placeholder: "Zip Code",
      helperText: "invalid zip code",
      startAdornment: <img src={zipAdornment} alt="zip code" />,
      isZipCode: true,
      name: "zip",
      inputComponent: TextMaskCustom,
      //  inputProps: IMaskInput
    },
  }

  return (
    <Grid
      item
      container
      direction="column"
      xs={6}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.locationContainer }}
    >
      <Grid item>
        <img
          src={locationIcon}
          alt="location settings"
          className={classes.icon}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.fieldContainer }}
      >
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          disabled={!edit}
          isWhite
        />
      </Grid>
      <Grid item classes={{ root: classes.chipWrapper }}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Chip
            label={
              values.city ? `${values.city}, ${values.state}` : "City, State"
            }
          />
        )}
      </Grid>
      <Grid item container classes={{ root: classes.slotContainer }}>
        <Slots slot={slot} setSlot={setSlot} name="Location" />
      </Grid>
    </Grid>
  )
}
