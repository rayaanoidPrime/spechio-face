import React from 'react';
import Product from '@/components/product';

const ProductList = ({ products }) => {
  return (
    <ul className='webcam-col text-purple-900'>
      {Object.values(products).map((product) => (
        <li key={product.productname} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <Product products={product}/>
        </li>
      ))}
    </ul>
  );
};

const ProductPage = ({ products }) => {
  return (
    <div className=' z-10 '>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
