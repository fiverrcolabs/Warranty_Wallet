import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <div className="card">
    <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone"/>
    <div className="card-body">
        
        <a className='h5 cardName' href="#!"  >Name of the product</a>
    </div>
</div>
  );
}