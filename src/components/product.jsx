import React from 'react';
import Image from 'next/image';

const Product = ({ products }) => {
    return (
      <div>
        <div className='center items-center border-1 shadow-xl border-gray-400 bg-gray-100 bg-opacity-40 rounded-lg p-4 h-3/4 flex flex-col justify-center max-w-3xl'>
          <div className='flex'>
          <div key={products.key} className='mright flex flex-col gap-1'>
            <p className='text-4xl font-bold'> {`${products.productname}`}</p>
            <p className='text-gray-600 font-semibold'>{`Brand: ${products.brand}`}</p>
            {/* About This Item Section */}
            <details className='text-gray-600 pb-5'>
              <summary className='text-sm font-bold mt-2 cursor-pointer'>
                About This Item
              </summary>
              <div className='mt-2 ml-5 whitespace-normal'>
                <p className='text-sm'>{`Item Form: ${products.itemform}`}</p>
                <p className='text-sm'>{`Scent: ${products.scent}`}</p>
                <p className='text-sm'>{`Product Description: ${products.description}`}</p>
              </div>
            </details>
            <div className='flex gap-2 items=center'>
              <p className='text-3xl font-bold text-green-600'>
                <sup className='text-sm'>₹</sup>
                {products.price}
              </p>
              <a href={products.amazonLink} className='text-blue-600 hover:underline'>
              <button className='px-2 bg-gradient-to-r from-sec to-prim opacity-50 hover:opacity-80 shadow-xl text-white rounded'>
                Buy Now
              </button>
            </a>
            </div>
          </div>
          <Image
              src={'/'+products.productimg}
              alt="Image Description"
              width={200}
              height={200}
           />
          </div>
        </div>
      </div>
    );
  };
  
  export default Product;
  