import React from 'react';
import Image from './Image.jsx';

const ImageContainer = ({ products }) => (
  <div>
    {products.map(product => <span><Image key={product._id} product={product} /></span>)}
  </div>
);

export default ImageContainer;