import React from 'react';
import ProductName from './ProductName.jsx';

const Image = ({ product, handleClick }) => (
  <div className="carouselImageBox">
    <img
      className="carouselProductImage"
      src={product.images[0].imageURL}
      onClick={e => handleClick(e, product._id)}
      height="180"
      width="180"
    ></img>
    <br></br>
    <div className="carouselProductName">
      <a
        className="carouselProductLink"
        onClick={e => handleClick(e, product._id)}
        id={product._id}
        href="#"
      >
        <ProductName product={product} />
      </a>
    </div>

    <div className="carouselPrice">
      ${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
    </div>
    <div className="carouselShipping">Free Shipping</div>
  </div>
);

export default Image;
