import React from "react"

import { Grid } from "@material-ui/core"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import Layout from "../components/ui/layout"

export default function ProductList({ pageContext }) {
  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar
          filterOptions={pageContext.filterOptions}
          name={pageContext.name}
          description={pageContext.description}
        />
      </Grid>
    </Layout>
  )
}
