import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'
import Product from '../components/Product'
import moment from 'moment'

import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';




function Claims() {
  const navigate = useNavigate()
  const { axiosFetch, user } = useAppContext()
  const [claims, setClaims] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sr, serSr] = useState(true)

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



  const sortByName = (value, claims, setClaims) => {
    const ar = [...claims];
    const sortedProducts = ar.sort(
      (a, b) => {
        // move objects with name "aa" to the beginning of the array
        if (a.status === value) {
          return -1;
        } else if (b.status === value) {
          return 1;
        }
        return 0;
      }
    );
    setClaims(sortedProducts);
  };
  const sortByTaskTime = (value, claims, setClaims) => {
    const ar = [...claims];
    const sortedProducts = ar.sort(

      (a, b) => {
        const timeA = new Date(a.createdAt);
        const timeB = new Date(b.createdAt);
        // move objects with name "aa" to the beginning of the array
        if (value === 'asc') {
          return timeA - timeB;
        } else if (value === 'desc') {
          return timeB - timeA;
        }
        return 0;
      }
    );
    setClaims(sortedProducts);
  };


  const handleClick = (e) => {
    console.log(e.target.id);
    sortByName(e.target.id, claims, setClaims);
  };
  const handleClick2 = (e) => {
    console.log(e.target.id);
    sortByTaskTime(e.target.id, claims, setClaims);
  };


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
          <div className='row'>



            <DropdownButton id="dropdown-basic-button" className="col-2 my-2" title="Sort Using Status">
              <Dropdown.Item id="NEW" onClick={handleClick}>NEW</Dropdown.Item>
              <Dropdown.Item id="IN_PROGRESS" onClick={handleClick}>IN PROGRESS</Dropdown.Item>
              <Dropdown.Item id="COMPLETED" onClick={handleClick}>COMPLETED</Dropdown.Item>
              <Dropdown.Item id="REJECTED" onClick={handleClick}>REJECTED</Dropdown.Item>
            </DropdownButton>

            <DropdownButton id="dropdown-basic-button" className="col-2 my-2" title="Sort Using TaskTime">
              <Dropdown.Item id="asc" onClick={handleClick2}>Ascending</Dropdown.Item>
              <Dropdown.Item id="desc" onClick={handleClick2}>Descending</Dropdown.Item>

            </DropdownButton>

          </div>


          <table className="table table-bordered table-hover shadow ">
            <thead>
              <tr>
                <th scope="col">ClaimId</th>
                {user.role !== 'CONSUMER' && <th scope="col">ProductName</th>}
                {user.role === 'CONSUMER' && <th scope="col">NickName</th>}
                <th scope="col">Assignee</th>
                <th scope="col">TaskTime</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (

                <tr key={claim._id} className="clickable" onClick={() => navigate(`/claims/${claim._id}`)}>
                  <th scope="row">{claim._id}</th>
                  {user.role !== 'CONSUMER' && <td>{claim.warrantyId?claim.warrantyId.itemId.productId.productName:""}</td>}
                  {user.role === 'CONSUMER' &&  <td>{claim.warrantyId?claim.warrantyId[0].nickname:""}</td>}
                  <td>{claim.assignee}</td>
                  <td>{claim.createdAt ? Date.now().diff(moment(claim.createdAt), 'days') : ""}</td>
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