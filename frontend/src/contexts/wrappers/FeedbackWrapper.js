import React, { createContext, useReducer } from "react"
import feedbackReducer from "../reducers/feedback-reducer"
import { Snackbar } from "@material-ui/core"
import { setFeedBack } from "../actions"

export const FeedbackContext = createContext()
const FeedbackProvider = FeedbackContext.Provider

export function FeedbackWrapper({ children }) {
  const [feedback, dispatchFeedback] = useReducer(feedbackReducer, {
    open: false,
    message: "",
    backgroundColor: "",
  })

  return (
    <FeedbackProvider value={{ feedback, dispatchFeedback }}>
      {children}
      <Snackbar
        open={feedback.open}
        message={feedback.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => dispatchFeedback(setFeedBack({ open: false }))}
        ContentProps={{
          style: {
            backgroundColor: feedback.backgroundColor,
            fontSize: "1.25rem",
          },
        }}
      />
    </FeedbackProvider>
  )
}
