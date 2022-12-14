


import React from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from "../components/helmet/Helmet"
import { Col,Row, Container } from 'reactstrap'

const Shop = () => {
  return (
   <Helmet title="Shop">

      <CommonSection title={"Products"}/>


      <section>
        <Container>
          <Row>
            <Col lg="3" md="3"></Col>
            <Col lg="3" md="3"></Col>
            <Col lg="6" md="6"></Col>
          </Row>
        </Container>
      </section>

   </Helmet>
  )
}

export default Shop