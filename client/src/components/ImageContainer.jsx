import React from 'react';
import Image from './Image.jsx';

const ImageContainer = ({ products, handleClick }) => (
  <div className="imageContainer">
    {products.map(product => <Image 
      key={product._id}
      product={product}
      handleClick={handleClick}
    />)}
  </div>
);

export default ImageContainer;