import React from 'react';
import Image from './Image.jsx';

const ImageContainer = ({ products }) => (
  <div className="imageContainer">
    {products.map(product => <Image key={product._id} product={product} />)}
  </div>
);

export default ImageContainer;