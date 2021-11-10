import React from "react"
import { Dialog, DialogContent, Grid, makeStyles } from "@material-ui/core"

import frame from "../../images/selected-frame.svg"
const useStyles = makeStyles(theme => ({
  selectedFrame: {
    backgroundImage: `url(${frame})`,
    height: "60.4rem",
    width: "73.4rem",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "0 !important",
  },
  dialog: {
    maxWidth: "100%",
  },
  productImage: {
      height: "40rem",
      width: "40rem",
      marginTop: "5rem"

  }
}))

export default function QuickView({ open, setOpen, url }) {
  const classes = useStyles()

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent classes={{ root: classes.selectedFrame }}>
          <Grid container direction="column" alignItems="center">
              <Grid item>
                  <img src={url} alt="product image" className={classes.productImage} />
              </Grid>
          </Grid>
      </DialogContent>
    </Dialog>
  )
}
