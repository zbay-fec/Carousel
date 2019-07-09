import React from 'react';

const Image = ({ product }) => (
  <div id={product._id}>
    <img src={product.images[0].imageURL} height="100" width="100"></img>
    <br></br>
    <a href="#">{product.name.slice(0, 43)}...</a> 
    <div>${product.price}</div>
  </div>
);

export default Image;