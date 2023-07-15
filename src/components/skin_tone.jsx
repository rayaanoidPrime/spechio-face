import React from 'react';

const SkinToneColor = ({ skinTone }) => {
  const getColorBySkinTone = (skinTone) => {
    switch (skinTone) {
      case '1':
        return '#edd3b4'; // Lightest
      case '2':
        return '#e0b589';
      case '3':
        return '#c78d59';
      case '4':
        return '#a56940';
      case '5':
        return '#8c441d';
      case '6':
        return '#5a2e0d'; // Darkest
      default:
        return '#00000000'; // Default color (black)
    }
  };

  const color = getColorBySkinTone(skinTone);

  return (
    <div className='flex mt-5 gap-5'>
      <div className='text-purple-900 text-xl font-bold mt-2'>
        Skin Tone:
      </div>
      <div style={{backgroundColor:color}} className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl uppercase mt-2 border-2 border-gray-200 shadow-xl`}>
        {skinTone}
      </div>
    </div>
  
  );
};

export default SkinToneColor;
