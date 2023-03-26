import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({imageData, productId, productName, warrentyPeriod}) {
  const navigate=useNavigate()
  return (
    <div className="card ">
    <img src={`${imageData}`} className="card-img-top fixCard" alt="Fissure in Sandstone"/>
    <div className="card-body">
        
        <a className='h5 cardName clickable'  onClick={() => navigate(`/products/${productId}`)}>{productName}</a>
    </div>
</div>
  );
}