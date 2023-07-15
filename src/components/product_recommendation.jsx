import React from 'react';
import Image from 'next/image';
import productsData from '../products.json';

const ProductRecommendation = ({ skinType, skinTone }) => {
  let products;

  if (skinType.toLowerCase() === 'dry') {
    products = productsData.dry[skinTone];
  } else if (skinType.toLowerCase() === 'oily') {
    products = productsData.oily[skinTone];
  } else {
    return <div>Invalid skin type. Please choose 'dry' or 'oily'.</div>;
  }

  return (
    <div>
      <h2>Recommended Product Details:</h2>
        <div className='center'>
            <div key={products.key} className='mright'>
            <h3>Product ID: {products.key}</h3>
            <p>Product Name: {products.productname}</p>
            <p>Brand: {products.brand}</p>
            <p>Price: {products.price}</p>
            <p>Item Form: {products.itemform}</p>
            <p>Scent: {products.scent}</p>
            <hr />
          </div>
          <Image
            src={'/'+products.productimg}
            alt="Image Description"
            width={200}
            height={200}
          />
        </div>
    </div>
  );
};

export default ProductRecommendation;
