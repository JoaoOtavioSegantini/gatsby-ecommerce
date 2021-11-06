import * as React from "react"
import CallToAction from "../components/home/callToAction"
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
    <CallToAction />
  </Layout>
)

export default IndexPage
