import React from 'react';
import productsData from '../products.json';
import ProductPage from '@/components/productpage';
import { Layout } from '@/components/layout';

const landingscreen = () => {
  return (
  <Layout>
    <div className='flex flex-col w-full h-screen items-center justify-center z-10'>
      <div className='text-5xl bg-clip-text bg-gradient-to-r from-prim via-sec to-quad text-transparent font-extrabold '>
        Spechio Face AI
      </div>
      <div className='text-purple-900 text-lg font-bold mt-2'>
        Facial Feature extracter and Beauty Product recommendation engine
      </div>
      <div className='flex gap-1 self-start'>
        <h1 className='text-4xl font-bold mb-4 text-quad self-start' style={{marginBottom: '20px', marginTop: '20px'}}>Beauty Products</h1>
        <div className='relative flex items-center'>
          <a className='text-4xl font-bold z-10 bg-gradient-to-tr from-prim to-sec rounded-3xl px-2 w-25 h-25 self-center' href='./webcam'>
            <svg fill="#FFFFFF" width="24px" height="38px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.52.55l-5,5h0L.55,12.51l3,3,12-12Zm-4,6,4-4,1,1-4,4.05ZM2.77,3.18A3.85,3.85,0,0,1,5.32,5.73h0A3.85,3.85,0,0,1,7.87,3.18h0A3.82,3.82,0,0,1,5.32.64h0A3.82,3.82,0,0,1,2.77,3.18ZM8.5,2.55h0A2,2,0,0,1,9.78,1.27h0A1.92,1.92,0,0,1,8.5,0h0A1.88,1.88,0,0,1,7.23,1.27h0A1.92,1.92,0,0,1,8.5,2.55Zm-6.36,0h0A1.92,1.92,0,0,1,3.41,1.27h0A1.88,1.88,0,0,1,2.14,0h0A1.92,1.92,0,0,1,.86,1.27h0A2,2,0,0,1,2.14,2.55ZM14.73,6.22h0a1.94,1.94,0,0,1-1.28,1.27h0a1.94,1.94,0,0,1,1.28,1.27h0A1.9,1.9,0,0,1,16,7.49h0A1.9,1.9,0,0,1,14.73,6.22Z"/>
            </svg>
          </a>
          <div className='tooltip ml-2 whitespace-nowrap absolute left-full z-10 top-1/2 transform -translate-y-1/2  text-white text-sm px-2 py-1 w-auto rounded pointer-events-none opacity-0 transition-opacity duration-200'>
            Scan your face and get customized product recommendations for your skin type!
          </div>
        </div>
      </div>
      <div className='h-3/4 overflow-auto z-10 mb-10 custom-scrollbar'>
      <ProductPage products={productsData.dry} />
      <ProductPage products={productsData.oily} />
      </div>
    </div>
  </Layout>
  );
};

export default landingscreen;
