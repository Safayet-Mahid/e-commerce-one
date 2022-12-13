


import React from 'react'

import "../../styles/product-card.css"

import {motion} from "framer-motion"
import { Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <Col lg="3" md="4" className='mb-2'>
    <div className='product__item'>
        <div className="product__img">
            <motion.img whileHover={{scale:.9}} src={product.imgUrl} alt="" />
        </div>
        <div className='p-2 product__info'>
            <h3 className="product__name">
                <Link to={`/shop/${product.id}`}>{product.productName}</Link>
            </h3>
            <span>{product.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
            <span className="price">${product.price}</span>
            <motion.span whileTap={{scale:1.2}}><i className='ri-add-line'></i></motion.span>
        </div>
         
    </div>
    </Col>
  )
}

export default ProductCard