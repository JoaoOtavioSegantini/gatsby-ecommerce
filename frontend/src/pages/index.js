import * as React from "react"
import HeroBlock from "../components/home/heroBlock"
import PromotionalProducts from "../components/home/promotionalProducts"
//import { Link } from "gatsby"

import Layout from "../components/ui/layout"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
  </Layout>
)

export default IndexPage
