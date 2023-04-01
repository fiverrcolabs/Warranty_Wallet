import Friend from '../components/Friend';
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'




function Products() {
  var navigate = useNavigate();
  const { axiosFetch, user } = useAppContext()
  const [connections, setConnections] = useState([])
  const [arrayIds, setArrayIds] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const USER = {
    MANUFACTURER: "MANUFACTURER",
    RETAILER: "RETAILER",
    CONSUMER: "CONSUMER"
  }

  useEffect(() => {
    async function fetchData() {
      try {
        var fetchedConnections;
        var fetchedRequests;
        if (user.role === USER.MANUFACTURER) {
          fetchedConnections = await axiosFetch.get('/manufacturer/nonRetailerFriends')
          fetchedRequests = await axiosFetch.get('/manufacturer/getManufacturerSentRequests')
        }
        if (user.role === USER.RETAILER) {
          fetchedConnections = await axiosFetch.get('/retailer/nonManufacturerFriends')
          fetchedRequests = await axiosFetch.get('/retailer/getRetailerSentRequests')
        }

        console.log(fetchedConnections.data)
        console.log("-----", fetchedRequests.data)
        console.log(user.role)

        setConnections(fetchedConnections.data)
        setSentRequests(fetchedRequests.data)

        var ar = [];
        fetchedRequests.data.forEach((request) => {
          ar.push(request._id)
        })
        setArrayIds(ar)
        setIsLoading(false)

      } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
      }



    }
    fetchData();
  }, [])




  function available(id) {
    console.log(arrayIds, "--", id, arrayIds.includes(id))
    if (arrayIds.includes(id)) {
      return false

    }
    return true
  }


  const sendRequest = async (event) => {

    console.log(event.target)
    try {
      var res;
      if (user.role === USER.MANUFACTURER) {
        res = await axiosFetch.get(`/manufacturer/sendRetailerRequest?userId=${event.target.id}`)
      }
      if (user.role === USER.RETAILER) {
        res = await axiosFetch.get(`/retailer/sendManufacturerRequest?userId=${event.target.id}`)
      }
      console.log(res)
      // toast.error(res)

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
            <h1 className='px-3'>{(user.role === USER.MANUFACTURER) ? 'Retailers' : 'Manufactures'}</h1>
          </div>
          <div className='col topBar'>
            <div className='topBarIcon'>
              <FaUserFriends onClick={() => navigate('/connections/requests')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>

        </div>

        <div className='friendsContainer' >

          {connections.map((connection) => (
            <Friend sendRequest={sendRequest} id={connection._id} available={available} key={connection._id} userId={connection.userId._id} company={connection.company} />
          ))}
        </div>

        {/* <hr />
        <div className='friendsContainer' >

          {connections.map((connection) => (
            <Friend sendRequest={sendRequest} id={connection._id} key={connection._id} userId={connection.userId._id} company={connection.company} />
          ))}
        </div> */}

      </div>


    </div>

  )
}

export default Products