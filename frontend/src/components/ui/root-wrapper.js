import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./theme"
import { ApolloWrapper } from "../../apollo/ApolloWrapper"

export default ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloWrapper>{element}</ApolloWrapper>
    </ThemeProvider>
  )
}
