import React from 'react';
import ProductName from './ProductName.jsx';

const Image = ({ product, handleClick }) => (
  <div className="imageBox">
    <img src={product.images[0].imageURL} height="180" width="180"></img>
    <br></br>
    <div className="productName">
      <a onClick={(e) => handleClick(e, product._id)} id={product._id} href="#"><ProductName product={product} /></a>
    </div>
     
    <div className="price">${product.price}</div>
    <div className="shipping">Free Shipping</div>
  </div>
);

export default Image;