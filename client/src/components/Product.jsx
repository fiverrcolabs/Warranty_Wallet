import React from 'react';

export default function Product({imageData, productId, productName, warrentyPeriod}) {
  return (
    <div className="card">
    <img src={`${imageData}`} className="card-img-top" alt="Fissure in Sandstone"/>
    <div className="card-body">
        
        <a className='h5 cardName' href="#!">{productName}</a>
    </div>
</div>
  );
}