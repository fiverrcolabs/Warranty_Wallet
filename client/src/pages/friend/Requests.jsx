import AddRequest from '../../components/AddRequest';
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



function Products() {
  var navigate=useNavigate();

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Requests</h1>
          </div>



          <div className='col topBar'>
            <div className='topBarIcon'>
              <FaUserFriends onClick={() => navigate('/products/addproduct')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>




        </div>

        <div className='friendsContainer' >
          <AddRequest />
          <AddRequest />
          <AddRequest />
          <AddRequest />
        </div>
      </div>


    </div>

  )
}

export default Products