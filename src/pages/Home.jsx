


import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../components/helmet/Helmet'
import "../styles/home.css"

import heroImg from "../assets/images/hero-img.png"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' 
import Services from '../components/services/Services'
import ProductList from '../components/UI/ProductList'



const Home = () => {

  const year = new Date().getFullYear()

  return (
    <Helmet title="Home">
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">
                  Trending product in {year}
                </p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, ab laboriosam at sapiente qui natus debitis perspiciatis a placeat cumque?</p>

                <Link to="/shop"><motion.button whileTap={{scale:1.2}} className="buy__btn">SHOP NOW</motion.button ></Link>

              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                  <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services/>
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className='text-center'>
              <h2 className='section__title'>Trending Products</h2>
            </Col>
            <ProductList/>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home