import React from 'react';
import productsData from '../products.json';
import ProductPage from '@/components/productpage';

const landingscreen = () => {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-4 text-quad self-start webcam-col' style={{marginBottom: '20px', marginTop: '20px'}}>Products</h1>
      <a className='text-xl font-bold mb-4  self-start webcam-col' href='./webcam'> Check your skin condition and get customised recommendations </a>
      <ProductPage products={productsData.dry} />
      <ProductPage products={productsData.oily} />
    </div>
  );
};

export default landingscreen;
