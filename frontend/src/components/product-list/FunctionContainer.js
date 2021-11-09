import React, { useState } from "react"
import { Grid, makeStyles, IconButton } from "@material-ui/core"

import filter from "../../images/filter.svg"
import sort from "../../images/sort.svg"
import Sort from "./sort"

const useStyles = makeStyles(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.primary.main,
    height: "6rem",
    borderRadius: "10px 10px 0px 0px",
  },
}))

export default function FunctionContainer() {
  const classes = useStyles()
  const [option, setOption] = useState(null)

  const content = () => {
    switch (option) {
      case null:
        const items = [
          { icon: filter, alt: "filter" },
          { icon: sort, alt: "sort" },
        ]
        return (
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
          >
            {items.map(item => (
              <Grid item key={item.alt}>
                <IconButton>
                  <img
                    src={item.icon}
                    alt={item.alt}
                    onClick={() => setOption(item.alt)}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
      case "sort":
        return <Sort setOption={setOption} />
      default:
        return null
    }
  }

  return (
    <Grid item container classes={{ root: classes.functionContainer }}>
      {content()}
    </Grid>
  )
}
