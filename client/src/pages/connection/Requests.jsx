import AddRequest from '../../components/AddRequest';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/appContext'
import Friend from '../../components/Friend';
import Loader from '../../components/Loader'




function Request() {
  var navigate = useNavigate();
  const { axiosFetch, user } = useAppContext()
  const [connections, setConnections] = useState([])
  const [friends, setFriends] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refresh, setRefresh] = useState(true)


  const USER = {
    MANUFACTURER: "MANUFACTURER",
    RETAILER: "RETAILER",
    CONSUMER: "CONSUMER"
  }

  useEffect(() => {
    async function fetchData() {
      try {
        var fetchedConnections;
        var fetchFriends;
        if (user.role === USER.MANUFACTURER) {
          fetchedConnections = await axiosFetch.get('/manufacturer/retailerRequests')
          fetchFriends = await axiosFetch.get('/manufacturer/retailerFriends')
          setFriends(fetchFriends.data.retailerFriends)

        }
        if (user.role === USER.RETAILER) {
          fetchedConnections = await axiosFetch.get('/retailer/manufacturerRequests')
          console.log("=====", fetchedConnections.data)
          fetchFriends = await axiosFetch.get('/retailer/manufacturerFriends')
          setFriends(fetchFriends.data.manufacturerFriends)

        }

        setConnections(fetchedConnections.data)

        console.log(fetchedConnections.data)
        console.log("friends", fetchFriends.data)
        setIsLoading(false)


      } catch (error) {
        console.log(error.response)
        toast.error(error.response.data.msg)
      }

    }
    fetchData();
  }, [refresh])


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
      setRefresh(!refresh)
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
      setRefresh(!refresh)
      toast.info("rejected")

    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)
    }
  }

  function filterCname(connection) {
    // console.log("!! ", connection.manufacturer[0].company)
    if (user.role === USER.RETAILER) {
      return connection.manufacturer[0].company
    }
    return connection.retailer[0].company
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
              <MdOutlineCancel onClick={() => navigate('/connections')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>

        </div>
        <h3 className='mt-5'>Requests</h3>

        <div className='friendsContainer ' >


          {connections.map((connection) => (
            <AddRequest reject={reject} accept={accept} userId={connection._id} key={connection._id} company={filterCname(connection)} />
          ))}
        </div>

        <hr />

        <h3>Approved</h3>
        <div className='friendsContainer' >

          {friends.map((friend) => (
            <Friend hide={true} available={() => { true }} id={friend._id} key={friend._id} userId={friend._id} company={friend.email} />
          ))}
        </div>
      </div>


    </div>

  )
}

export default Request