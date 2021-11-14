import React, { useState } from "react"
import { Grid, makeStyles } from "@material-ui/core"
import FunctionContainer from "./FunctionContainer"
import DescriptionContainer from "./descriptionContainer"

const useStyles = makeStyles(theme => ({
  toolbar: {
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 25,
    width: "95%",
    height: "auto",
    marginBottom: "5rem",
  },
}))

export default function DynamicToolbar({
  filterOptions,
  name,
  description,
  layout,
  setLayout,
  setPage
}) {
  const classes = useStyles()
  const [option, setOption] = useState(null)

  return (
    <Grid item container direction="column" classes={{ root: classes.toolbar }}>
      <FunctionContainer
        filterOptions={filterOptions}
        option={option}
        setOption={setOption}
      />
      {option === null && (
        <DescriptionContainer
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
          setPage={setPage}
        />
      )}
    </Grid>
  )
}
