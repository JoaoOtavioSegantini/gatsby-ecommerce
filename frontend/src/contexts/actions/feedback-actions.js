import { SET_SNACKBAR } from "./feedBack-types"

export const setFeedBack = ({ message, status, open }) => ({
  type: SET_SNACKBAR,
  payload: { status, message, open },
})
