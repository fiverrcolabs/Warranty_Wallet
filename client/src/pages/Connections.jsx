import Friend from '../components/Friend';
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



function Products() {
  var navigate=useNavigate();

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Retailers</h1>
          </div>



          <div className='col topBar'>
            <div className='topBarIcon'>
              <FaUserFriends onClick={() => navigate('/connections/requests')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>




        </div>

        <div className='friendsContainer' >
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </div>
      </div>


    </div>

  )
}

export default Products