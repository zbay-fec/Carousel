import React from 'react';
import lineClamp from 'line-clamp';
import ProductName from './ProductName.jsx';

const Image = ({ product }) => (
  <div className="imageBox">
    <img src={product.images[0].imageURL} height="180" width="180"></img>
    <br></br>
    <div className="productName">
      <a href="#"><ProductName product={product} /></a>
    </div>
     
    <div>${product.price}</div>
  </div>
);

export default Image;