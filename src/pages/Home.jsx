


import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { motion } from 'framer-motion' 

import "../styles/home.css"

import products from '../assets/data/products'
import heroImg from "../assets/images/hero-img.png"
import counterImg from "../assets/images/counter-timer-img.png"

import Helmet from '../components/helmet/Helmet'
import Services from '../components/services/Services'
import ProductList from '../components/UI/ProductList'
import Clock from '../components/UI/Clock'



const Home = () => {

  const [bestSalesProducts,setBestSalesProducts] = useState([])
  const [trendingProducts,setTrendingProducts] = useState([])
  const [mobileProducts,setMobileProducts] = useState([])
  const [wirelessProducts,setWirelessProducts] = useState([])
  const [popularProducts,setPopularProducts] = useState([])
  
  useEffect(()=>{
    const filteredTrendingProducts = products.filter(item=>item.category==="chair")
    setTrendingProducts(filteredTrendingProducts)

    const filteredBestSalesProducts = products.filter(item=>item.category==="sofa")
    setBestSalesProducts(filteredBestSalesProducts)

    const filteredMobileProducts = products.filter(item=>item.category==="mobile")
    setMobileProducts(filteredMobileProducts)

    const filteredWirelessProducts = products.filter(item=>item.category==="wireless")
    setWirelessProducts(filteredWirelessProducts)

    const filteredPopularProducts = products.filter(item=>item.category==="watch")
    setPopularProducts(filteredPopularProducts)
  },[])

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
            <ProductList data={trendingProducts}/>
          </Row>
        </Container>
      </section>


      <section className="best__sales">
      <Container>
          <Row>
            <Col lg="12" className='text-center'>
              <h2 className='section__title'>Best Sales</h2>
            </Col>  

            <ProductList data={bestSalesProducts}/>
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className='count__down-col'>

              <div className="clock__top-content">
                <h4 className='text-white fs-6 mb-2'>Limited Offres</h4>
                <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
              </div>
              <Clock/>
              <motion.button whileTap={{scale:1.2}} className="buy__btn store__btn"><Link to="/shop">Visit Store</Link></motion.button>
            </Col>

            <Col lg="6" md="12" className='text-end counter__img'>
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
            <Row>
              <Col lg="12" className='text-center mb-5'>
                <h2 className='section__title'>New Arrivals</h2>
              </Col>  

              <ProductList data={mobileProducts}/>
              <ProductList data={wirelessProducts}/>
            </Row>
          </Container>
      </section>

      <section className="popular__products">
        <Container>
            <Row>
              <Col lg="12" className='text-center mb-5'>
                <h2 className='section__title'>Popular in Category</h2>
              </Col>  

              <ProductList data={popularProducts}/>
            
            </Row>
          </Container>
      </section>

    </Helmet>
  )
}

export default Home