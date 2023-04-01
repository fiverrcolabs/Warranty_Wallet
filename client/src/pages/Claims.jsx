import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'
import Product from '../components/Product'

import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'



function Claims() {
  const navigate = useNavigate()
  const { axiosFetch } = useAppContext()
  const [claims, setClaims] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await axiosFetch.get('/claim/getAllClaims')
        setClaims(fetchedProducts.data)
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
            <h1 className='px-3'>Claims</h1>
          </div>



          <div className='col topBar'>
            <div className='topBarIcon'>
              {/* <GrAddCircle onClick={() => navigate('/products/addproduct')} className='clickable cursor-pointer' size={40} /> */}
            </div>

          </div>




        </div>

        <div className='secondPageProducts container' >
          <table className="table table-bordered table-hover shadow ">
            <thead>
              <tr>
                <th scope="col">ClaimId</th>
                <th scope="col">Assignee</th>
                <th scope="col">TaskTime</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
               
                <tr key={claim._id} className="clickable" onClick={() => navigate(`/claims/${claim._id}`)}>
                <th scope="row">{claim._id}</th>
                <td>{claim.assignee}</td>
                <td>{claim.taskTime}</td>
                <td>{claim.status}</td>
              </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </div>


    </div >

  )
}

export default Claims