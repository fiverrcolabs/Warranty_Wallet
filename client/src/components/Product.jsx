import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({imageData, _id, productName, warrentyPeriod}) {
  const navigate=useNavigate()
  return (
    <div className="card productcard ">
    <img src={imageData?imageData: "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"} className="card-img-top fixCard" alt="Fissure in Sandstone"/>
    <div className="card-body">
        
        <a className='h5 cardName clickable'  onClick={() => navigate(`/products/${_id}`)}>{productName}</a>
    </div>
</div>
  );
}