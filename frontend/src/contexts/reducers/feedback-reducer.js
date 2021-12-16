import { SET_SNACKBAR } from "../actions/feedBack-types"

export default function feedbackReducer(state, action) {
  const { status, message, open } = action.payload

  switch (action.type) {
    case SET_SNACKBAR:
      if (!open) return { ...state, open }

      return {
        backgroundColor: status === "error" ? "#FF3232" : "#4BB543",
        message,
        open: true,
      }

    default:
      return state
  }
}
