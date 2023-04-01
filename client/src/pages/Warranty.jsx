import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'
import Product from '../components/Product'

import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'



function Warranty() {
  const navigate = useNavigate()
  const { axiosFetch, addWarrantyStatus } = useAppContext()
  const [warranties, setWarranties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await axiosFetch.get('/warranty/getAllWarranties')
        addWarrantyStatus(fetchedProducts.data)
        setWarranties(fetchedProducts.data)
        console.log(fetchedProducts.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
      }

    }
    fetchData();
  }, [])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Warranty</h1>
          </div>
          <div className='col topBar'>
            <div className='topBarIcon'>
              <BsQrCodeScan onClick={() => navigate('/warranty/qrreader')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>



        </div>

        <div className='secondPageProducts container' >
          <table className="table table-bordered table-hover shadow ">
            <thead>
              <tr>
                <th scope="col">WarrantyId</th>
                <th scope="col">CustomerId</th>
                <th scope="col">Purchase date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {warranties.map((warranty) => (

                <tr key={warranty._id} className="clickable" onClick={() => navigate(`/warranty/${warranty._id}`)}>
                  <th scope="row">{warranty._id}</th>
                  <td>{warranty.assignee}</td>
                  <td>{warranty.tasktime}</td>
                  <td>{warranty.state}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>


    </div>

  )
}

export default Warranty