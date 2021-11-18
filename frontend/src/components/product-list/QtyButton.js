import React, { useEffect, useState } from "react"
import {
  Badge,
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"

import clsx from "clsx"

import Cart from "../../images/Cart"

const useStyles = makeStyles(theme => ({
  qtyText: {
    color: "#fff",
  },
  mainGroup: {
    height: "3rem",
  },
  editButtons: {
    height: "1.525rem",
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    borderLeft: "2px solid #fff",
    borderRight: "2px solid #fff",
    borderBottom: "none",
    borderTop: "none",
  },
  endButtons: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 50,
    border: "none",
  },
  cartButton: {
    marginLeft: "0 !important",
    transition: "background-color 1s ease",
  },
  minus: {
    marginTop: "-0.25rem",
  },
  minusButton: {
    borderTop: `2px solid ${theme.palette.secondary.main}`,
  },
  qtyButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  badge: {
    color: "#fff",
    fontSize: "1.5rem",
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
}))

export default function QtyButton({ stock, selectedVariant }) {
  const classes = useStyles()
  const [qty, setQty] = useState(1)

  const handleChange = direction => {
    if (qty === stock[selectedVariant].qty && direction === "up") return null
    if (qty === 1 && direction === "down") return null

    const newQty = direction === "up" ? qty + 1 : qty - 1
    setQty(newQty)
  }

  useEffect(() => {
    if (stock === null || stock === -1) return undefined
    if (qty > stock[selectedVariant].qty) {
      setQty(stock[selectedVariant].qty)
    }
  }, [stock, selectedVariant])

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button classes={{ root: clsx(classes.endButtons, classes.qtyButton) }}>
          <Typography variant="h3" classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup orientation="vertical">
          <Button
            onClick={() => handleChange("up")}
            classes={{ root: classes.editButtons }}
          >
            <Typography variant="h3" classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button
            onClick={() => handleChange("down")}
            classes={{ root: classes.editButtons }}
          >
            <Typography variant="h3" classes={{ root: classes.qtyText }}>
              -
            </Typography>
          </Button>
        </ButtonGroup>
        <Button classes={{ root: classes.endButtons }}>
          <Badge
            overlap="circular"
            badgeContent="+"
            classes={{ badge: classes.badge }}
          >
            <Cart color="#fff" />
          </Badge>
        </Button>
      </ButtonGroup>
    </Grid>
  )
}
