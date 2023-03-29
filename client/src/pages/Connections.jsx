import Friend from '../components/Friend';
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppContext } from '../context/appContext'



function Products() {
  var navigate = useNavigate();
  const { axiosFetch ,user } = useAppContext()
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
        if (user.role===USER.MANUFACTURER){
          fetchedConnections = await axiosFetch.get('/manufacturer/nonRetailerFriends')
        }
        if (user.role===USER.RETAILER){
          fetchedConnections = await axiosFetch.get('/retailer/nonManufacturerFriends')
        }
        
        console.log(fetchedConnections.data)
        console.log(user.role)
        setConnections(fetchedConnections.data)
      } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
      }

    }
    fetchData();
  }, [])


  const sendRequest=async (event)=>{
    console.log(event.target)
    try {
      var res;
      if (user.role===USER.MANUFACTURER){
        res = await axiosFetch.get(`/manufacturer/sendRetailerRequest?userId=${event.target.id}`)
      }
      if (user.role===USER.RETAILER){
        res = await axiosFetch.get(`/retailer/sendManufacturerRequest?userId=${event.target.id}`)
      }
      console.log(res)
      // toast.error(res)
     
    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)
    }
  }





  if( !(user.role===USER.MANUFACTURER || user.role===USER.RETAILER)){
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
            <h1 className='px-3'>{(user.role===USER.MANUFACTURER)?'Retailers':'Manufactures'}</h1>
          </div>
          <div className='col topBar'>
            <div className='topBarIcon'>
              <FaUserFriends onClick={() => navigate('/connections/requests')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>




        </div>

        <div className='friendsContainer' >
      
          {connections.map((connection) => (
             <Friend sendRequest={sendRequest} key={connection._id} userId={connection.userId} company={connection.company} />
          ))}
        </div>
      </div>


    </div>

  )
}

export default Products