import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./theme"
import { ApolloWrapper } from "../../apollo/ApolloWrapper"
import { FeedbackWrapper, UserWrapper } from "../../contexts"

export default ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>
        <UserWrapper>
          <FeedbackWrapper>{element}</FeedbackWrapper>
        </UserWrapper>
      </ApolloWrapper>
    </ThemeProvider>
  )
}
