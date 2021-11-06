import * as React from "react"
import FeaturedProducts from "../components/home/featuredProducts"
import HeroBlock from "../components/home/heroBlock"
import MarketingButtons from "../components/home/marketingButtons"
import PromotionalProducts from "../components/home/promotionalProducts"
//import { Link } from "gatsby"

import Layout from "../components/ui/layout"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <FeaturedProducts />
    <MarketingButtons />
  </Layout>
)

export default IndexPage
