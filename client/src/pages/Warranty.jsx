import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'
import Product from '../components/Product'

import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'
import moment from 'moment'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



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

  const sortByName = (value, warranties, setWarranties) => {
    const ar = [...warranties];
    const sortedProducts = ar.sort(
      (a, b) => {
        // move objects with name "aa" to the beginning of the array
        if (a.state === value) {
          return -1;
        } else if (b.state === value) {
          return 1;
        }
        return 0;
      }
    );
    setWarranties(sortedProducts);
  };

  const sortByTaskTime = (value, warranties, setWarranties) => {
    const ar = [...warranties];
    const sortedProducts = ar.sort(
      (a, b) => {
        // move objects with name "aa" to the beginning of the array
        const timeA = new Date(a.purchaseDate);
        const timeB = new Date(b.purchaseDate);
        if (value === 'asc') {
          return timeA - timeB;
        } else if (value === 'desc') {
          return timeB - timeA;
        }
        return 0;
      }
    );
    setWarranties(sortedProducts);
  };

  const handleClick = (e) => {
    console.log(e.target.id);
    sortByName(e.target.id, warranties, setWarranties);
  };

  const handleClick2 = (e) => {
    console.log(e.target.id);
    sortByTaskTime(e.target.id, warranties, setWarranties);
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
            <h1 className='px-3'>Warranty</h1>
          </div>
          <div className='col topBar'>
            <div className='topBarIcon'>
              <BsQrCodeScan onClick={() => navigate('/warranty/qrreader')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>



        </div>

        <div className='secondPageProducts container' >

          <div className="row">

            <DropdownButton id="dropdown-basic-button" className="col-2 my-2" title="Sort Using Status">
              <Dropdown.Item id="ACTIVE" onClick={handleClick}>ACTIVE</Dropdown.Item>
              <Dropdown.Item id="INACTIVE" onClick={handleClick}>INACTIVE</Dropdown.Item>
              <Dropdown.Item id="EXPIRED" onClick={handleClick}>EXPIRED</Dropdown.Item>
            </DropdownButton>

            <DropdownButton id="dropdown-basic-button" className="col-2 my-2" title="Sort Using date">
              <Dropdown.Item id="asc" onClick={handleClick2}>Ascending</Dropdown.Item>
              <Dropdown.Item id="desc" onClick={handleClick2}>Descending</Dropdown.Item>

            </DropdownButton>


          </div>




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
                  <td>{warranty.customerId}</td>
                  <td>{moment(warranty.purchaseDate).format('YYYY-MM-DD')}</td>
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