import React from "react"
import { Grid, makeStyles, IconButton } from "@material-ui/core"

import filter from "../../images/filter.svg"
import sort from "../../images/sort.svg"
import Sort from "./sort"
import Filter from "./filter"

const useStyles = makeStyles(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "6rem",
    height: "auto",
    borderRadius: ({ option }) =>
      option !== null ? "10px" : "10px 10px 0px 0px",
  },
}))

export default function FunctionContainer({
  filterOptions,
  setFilterOptions,
  option,
  setOption,
}) {
  const classes = useStyles({ option })

  const content = () => {
    switch (option) {
      case "sort":
        return <Sort setOption={setOption} />
      case "filter":
        return (
          <Filter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            setOption={setOption}
          />
        )
      default:
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
                <IconButton
                  onClick={() => setOption(item.alt)}
                  onKeyDown={e => {
                    if (e.key === 13) setOption(item.alt)
                  }}
                >
                  <img src={item.icon} alt={item.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
    }
  }

  return (
    <Grid item container classes={{ root: classes.functionContainer }}>
      {content()}
    </Grid>
  )
}
