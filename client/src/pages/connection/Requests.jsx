import AddRequest from '../../components/AddRequest';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/appContext'



function Products() {
  var navigate = useNavigate();
  const { axiosFetch, user } = useAppContext()
  const [connections, setConnections] = useState([])
  const USER = {
    MANUFACTURER: "MANUFACTURER",
    RETAILER: "RETAILER",
    CONSUMER: "CONSUMER"
  }

  useEffect(() => {
    async function fetchData() {
      try {
        var fetchedConnections;
        if (user.role === USER.MANUFACTURER) {
          fetchedConnections = await axiosFetch.get('/manufacturer/retailerRequests')
          setConnections(fetchedConnections.data)
        }
        if (user.role === USER.RETAILER) {
          fetchedConnections = await axiosFetch.get('/retailer/manufacturerRequests')
          console.log("=====",fetchedConnections.data)
          setConnections(fetchedConnections.data)
        }

        console.log(fetchedConnections.data)
        console.log(user.role)


      } catch (error) {
        console.log(error.response)
        toast.error(error.response.data.msg)
      }

    }
    fetchData();
  }, [])


  const accept = async (event) => {
    console.log(event.currentTarget.parentNode.id)
    try {
      var res;
      if (user.role === USER.MANUFACTURER) {
        res = await axiosFetch.get(`/manufacturer/approveRetailerRequest?userId=${event.currentTarget.parentNode.id}`)
      }
      if (user.role === USER.RETAILER) {
        res = await axiosFetch.get(`/retailer/approveManufacturerRequest?userId=${event.currentTarget.parentNode.id}`)
      }
      console.log(res)
      toast.success("accepted")

    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)
    }
  }

  const reject = async (event) => {
    console.log(event.currentTarget.parentNode.id)
    console.log(event.currentTarget)
    try {
      var res;
      if (user.role === USER.MANUFACTURER) {
        res = await axiosFetch.get(`/manufacturer/removeRetailerRequest?userId=${event.currentTarget.parentNode.id}`)
      }
      if (user.role === USER.RETAILER) {
        res = await axiosFetch.get(`/retailer/removeManufacturerRequest?userId=${event.currentTarget.parentNode.id}`)
      }
      console.log(res)
      toast.success("accepted")

    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)
    }
  }






  if (!(user.role === USER.MANUFACTURER || user.role === USER.RETAILER)) {
    return (
      <div className=" mainContainer container">
        <h1>Not Allowed</h1>
      </div>

    )
  }

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>{(user.role === USER.MANUFACTURER) ? 'Retailers' : 'Manufactures'}</h1>
          </div>
          <div className='col topBar'>
            <div className='topBarIcon'>
              <MdOutlineCancel onClick={() => navigate('/connections')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>




        </div>
        <h3 className='mt-5'>Requests</h3>

        <div className='friendsContainer ' >


          {connections.map((connection) => (
            <AddRequest reject={reject} accept={accept} userId={connection._id} key={connection._id} company={connection.company} />
          ))}
        </div>

        <hr />
        {/* //todo */}
        <h3>Friends</h3>
        <div className='friendsContainer' >

          {connections.map((connection) => (
            <AddRequest reject={reject} accept={accept} userId={connection._id} key={connection._id} company={connection.company} />
          ))}
        </div>
      </div>


    </div>

  )
}

export default Products