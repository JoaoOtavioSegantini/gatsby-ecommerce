import React from "react"
import {
  Grid,
  makeStyles,
  IconButton,
  Chip,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"
import filter from "../../images/filter.svg"
import close from "../../images/close-outline.svg"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: "1rem 0",
  },
  checkbox: {
    color: "#fff",
  },
  optionContainer: {
    [theme.breakpoints.down("xs")]: {
      "& > :not(:last-child)": {
        marginBottom: "2rem",
      },
    },
  },
}))

export default function Filter({ setOption, filterOptions }) {
  const classes = useStyles()

  return (
    <Grid
      item
      container
      justifyContent="space-between"
      alignItems="center"
      classes={{ root: classes.mainContainer }}
    >
      <Grid item>
        <IconButton
          onClick={() => setOption(null)}
          onKeyDown={e => {
            if (e.key === 13) setOption(null)
          }}
        >
          <img src={filter} alt="filter" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justifyContent="space-around"
          classes={{ root: classes.optionContainer }}
        >
          {Object.keys(filterOptions)
            .filter(filter => filterOptions[filter] !== null)
            .map(option => (
              <Grid item key={option}>
                <Grid container direction="column">
                  <Grid item>
                    <Chip label={option} />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormGroup>
                        {filterOptions[option].map(({ label, checked }) => (
                          <FormControlLabel
                            key={label}
                            label={label}
                            classes={{ label: classes.checkbox }}
                            control={
                              <Checkbox
                                checked={checked}
                                name={label}
                                classes={{ root: classes.checkbox }}
                              />
                            }
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => setOption(null)}
          onKeyDown={e => {
            if (e.key === 13) setOption(null)
          }}
        >
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
