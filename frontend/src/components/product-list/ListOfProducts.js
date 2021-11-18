import React, { useEffect, useState } from "react"
import { Grid, makeStyles, useMediaQuery } from "@material-ui/core"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./productFrameList"
import { GET_DETAILS } from "../../apollo/queries"
import { useQuery } from "@apollo/client"

const useStyles = makeStyles(theme => ({
  productContainer: {
    width: "95%",
    [theme.breakpoints.only("xl")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc((100% - (25rem *4 ))/3)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(4n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("lg")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc((100% - (25rem *3 ))/2)" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(3n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only("md")]: {
      "& > *": {
        marginRight: ({ layout }) =>
          layout === "grid" ? "calc(100% - (25rem *2 ))" : 0,
        marginBottom: "5rem",
      },
      "& > :nth-child(2n)": {
        marginRight: 0,
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        marginBottom: "5rem",
      },
    },
  },
}))

export default function ListOfProducts({
  products,
  layout,
  page,
  productsPerPage,
  filterOptions,
  content,
}) {
  const classes = useStyles({ layout })
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

  const FrameHelper = ({ Frame, variant, product }) => {
    let sizes = []
    let colors = []
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [stock, setStock] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)

    product.node.variants.map(item => {
      if (
        !colors.includes(item.color) &&
        item.size.substring(0, 1) === (selectedSize || variant.size.substring(0,1)) &&
        item.style === variant.style
      ) {
        return colors.push(item.color)
      }
      return sizes.push(item.size)
    })

    const hasStyle = product.node.variants.some(
      variant => variant.style !== null
    )

    //  const colors = [...new Set(duplicateColors)]

    const { loading, error, data } = useQuery(GET_DETAILS, {
      variables: { id: product.node.strapiId },
    })

    useEffect(() => {
      if (error) {
        setStock(-1)
      } else if (data) {
        setStock(data.product.variants)
      }
    }, [error, data])

    useEffect(() => {
      if (selectedSize === null) return undefined
      setSelectedColor(null)
      const newVariant = product.node.variants.find(
        item =>
          item.size.substring(0, 1) === (selectedSize || variant.size.substring(0,1)) &&
          item.style === variant.style &&
          item.color === colors[0]
      )
      setSelectedVariant(newVariant)
    }, [selectedSize])

    return (
      <Frame
        sizes={sizes}
        colors={colors}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        variant={selectedVariant || variant}
        product={product}
        hasStyle={hasStyle}
        stock={stock}
      />
    )
  }

  return (
    <Grid
      item
      container
      classes={{ root: classes.productContainer }}
      direction={matchesSM ? "column" : "row"}
      alignItems={matchesSM ? "center" : undefined}
    >
      {content
        .slice((page - 1) * productsPerPage, page * productsPerPage)
        .map(item => (
          <FrameHelper
            Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList}
            key={item.variant.id}
            variant={item.variant}
            product={products[item.product]}
          />
        ))}
    </Grid>
  )
}
