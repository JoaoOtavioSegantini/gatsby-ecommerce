import * as React from "react"
import FeaturedProducts from "../components/home/featuredProducts"
import HeroBlock from "../components/home/heroBlock"
import PromotionalProducts from "../components/home/promotionalProducts"
//import { Link } from "gatsby"

import Layout from "../components/ui/layout"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <FeaturedProducts />
  </Layout>
)

export default IndexPage
