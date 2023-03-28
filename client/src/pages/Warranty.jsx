import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'
import Product from '../components/Product'

import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'



function Claims() {
  const navigate=useNavigate()

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Warranty</h1>
          </div>
          <div className='col topBar'>
            <div className='topBarIcon'>
              <BsQrCodeScan onClick={() => navigate('/qrreader')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>



        </div>

        <div className='secondPageProducts container' >
          <table class="table table-bordered table-hover shadow ">
            <thead>
              <tr>
                <th scope="col">WarrantyId</th>
                <th scope="col">CustomerId</th>
                <th scope="col">Purchase date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Thornton</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </div>

  )
}

export default Claims