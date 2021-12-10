import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  coloredIndicator: {
    backgroundColor: "#fff",
  },
  logoText: {
    color: theme.palette.common.offBlack,
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 500,
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    height: "3rem",
    width: "3rem",
    [theme.breakpoints.down("xs")]: {
      height: "2rem",
      width: "2rem",
    },
  },
  logoContainer: {
    [theme.breakpoints.down("md")]: {
      marginRight: "auto",
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    color: "#fff",
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
  },
  // "@global": {
  //     '.MuiTypography-h1': {
  //         fontSize: "30rem"
  //     },
  // },
}))
