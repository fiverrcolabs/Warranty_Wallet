import { useNavigate, useLocation } from 'react-router-dom'

import { RxDashboard } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GiRibbonMedal } from "react-icons/gi";
import { RiUserAddLine } from "react-icons/ri";
import { BiCartAlt } from "react-icons/bi";
import { useAppContext } from '../context/appContext'


function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { axiosFetch, user } = useAppContext()


  // const user = {
  //   email: "test@gmail.com",
  //   role: "MANUFACTURER"
  // }

  const pathMatchRoute = (route) => {
    // console.log(location.pathname.slice(0,route.length-1))
    if (route === location.pathname || route === location.pathname.slice(0, route.length)) {
      return true
    }
  }

  if (location.pathname === "/login" || location.pathname === "/register") return null;

  return (


    <div className='navbar'>

      <nav className='navbarNav'>
        <ul className='navbarListItems'>

          <li onClick={() => navigate('/dashboard')} className={
            pathMatchRoute('/dashboard')
              ? 'navbarListItemActive'
              : 'navbarListItem'}>
            <h4 className='navbarListItemName'>
              <span className='mx-2'><RxDashboard /></span>
              Dashboard
            </h4>
          </li>

          {user.role === "MANUFACTURER" && <li onClick={() => navigate('/products')} className={pathMatchRoute('/products') ? 'navbarListItemActive' : 'navbarListItem'}>

            <h4 className='navbarListItemName'>
              <span className='mx-2'><BiCartAlt /></span>
              Products
            </h4>
          </li>}


          <li onClick={() => navigate('/claims')} className={
            pathMatchRoute('/claims')
              ? 'navbarListItemActive'
              : 'navbarListItem'
          }>
            <h4 className='navbarListItemName'>
              <span className='mx-2'><MdProductionQuantityLimits /></span>
              Claims
            </h4>
          </li>


          {(user.role === "MANUFACTURER" || user.role === "RETAILER") && <li onClick={() => navigate('/connections')} className={
            pathMatchRoute('/connections')
              ? 'navbarListItemActive'
              : 'navbarListItem'
          }>
            <h4 className='navbarListItemName'>
              <span className='mx-2'><RiUserAddLine /></span>
              {user.role === "MANUFACTURER" ? 'Retailers' : 'Manufactures'}
            </h4>
          </li>
          }


          {!(user.role === "MANUFACTURER") && <li onClick={() => navigate('/warranty')} className={
            pathMatchRoute('/warranty')
              ? 'navbarListItemActive'
              : 'navbarListItem'
          }>

            <h4 className='navbarListItemName'>
              <span className='mx-2'><GiRibbonMedal /></span>
              Warranty
            </h4>
          </li>}

        </ul>
      </nav>
    </div>



  )
}

export default Navbar