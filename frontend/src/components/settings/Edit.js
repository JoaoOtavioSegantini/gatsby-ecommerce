import React, { useContext, useState } from "react"
import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core"

import BackwardsIcon from "../../images/BackwardsOutline"
import editIcon from "../../images/edit.svg"
import saveIcon from "../../images/save.svg"

import { FeedbackContext } from "../../contexts"
import { setFeedBack, setUser } from "../../contexts/actions"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  icon: {
    height: "8rem",
    width: "8rem",
  },
  editContainer: {
    borderLeft: "4px solid #fff",
  },
}))

export default function Edit({
  setSelectedSetting,
  user,
  edit,
  setEdit,
  changesMade,
  details,
  locations,
  detailSlot,
  locationSlot,
  dispatchUser,
}) {
  const classes = useStyles()
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [loading, setLoading] = useState(false)

  const handleEdit = () => {
    setEdit(!edit)

    if (edit && changesMade) {
      setLoading(true)

      const { password, ...newDetails } = details

      axios
        .post(
          process.env.GATSBY_STRAPI_URL + "/users-permissions/set-settings",
          {
            details: newDetails,
            detailSlot,
            location: locations,
            locationSlot,
          },
          { headers: { Authorization: `Bearer ${user.jwt}` } }
        )
        .then(response => {
          setLoading(false)
          dispatchFeedback(
            setFeedBack({
              status: "success",
              message: "Settings Saved Successfully",
              open: true,
            })
          )
          dispatchUser(
            setUser({
              ...response.data,
              jwt: user.jwt,
              onboarding: true
            })
          )
        })
        .catch(error => {
          setLoading(false)
          console.error(error)
          dispatchFeedback(
            setFeedBack({
              status: "error",
              open: true,
              message:
                "There was a problem saving your settings, please try again.",
            })
          )
        })
    }
  }

  return (
    <Grid
      item
      container
      xs={6}
      justifyContent="space-evenly"
      alignItems="center"
      classes={{ root: classes.editContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <span className={classes.icon}>
            <BackwardsIcon color="#fff" />
          </span>
        </IconButton>
      </Grid>
      <Grid item>
        {loading ? (
          <CircularProgress color="secondary" size="8rem" />
        ) : (
          <IconButton onClick={handleEdit} disabled={loading}>
            <img
              src={edit ? saveIcon : editIcon}
              alt={`${edit ? "save" : "edit"} settings`}
              className={classes.icon}
            />
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}
