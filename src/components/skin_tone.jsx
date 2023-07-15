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
    <div className='center'>
    <div className='text-purple-900 text-lg font-bold mt-2'>
        Skin Tone : 
    </div>
    <div
      style={{
        backgroundColor: color,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'uppercase',
        margin: '12px',
      }}
    >
      {skinTone}
    </div>
    </div>
  );
};

export default SkinToneColor;
