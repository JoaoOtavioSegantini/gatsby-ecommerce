import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: "2rem",
  },
  "@global": {
    body: {
      margin: 0,
    },
    a: {
      textDecoration: "none",
    },
  },
  linkColumn: {
    width: "20rem",
  },
  link: {
    color: "#fff",
    fontSize: "1.25rem",
  },
  linkContainer: {
    [theme.breakpoints.down("md")]: {
      marginBottom: "3rem",
    },
  },
  icon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}))
