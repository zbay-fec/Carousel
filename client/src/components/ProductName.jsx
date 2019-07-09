import React from 'react';
import ClampLines from 'react-clamp-lines';

const ProductName = ({ product }) => {
  return (
    <ClampLines 
      text={product.name}
      id={product._id}
      lines={2}
      ellipsis='...'
    />  
  );
};

export default ProductName;