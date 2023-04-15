import { useNavigate, useLocation } from 'react-router-dom'

import { RxDashboard } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GiRibbonMedal } from "react-icons/gi";
import { RiUserAddLine } from "react-icons/ri";
import { BiCartAlt } from "react-icons/bi";
import { useAppContext } from '../context/appContext'
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from 'react'


function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAppContext()
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

//   useEffect(() => {
//     window.addEventListener("resize", () => {
//         const ismobile = window.innerWidth < 600;
//         if (ismobile !== isMobile) setIsMobile(ismobile);
//     }, false);
// }, [isMobile]);

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

  if (!user) {
    return navigate('/login')
  }


  return (


    <div className='navbar'>



      <nav className='navbarNav'>
        {/* {console.log(isMobile)} */}

        <ul className='navbarListItems'>

          {(user.role === "MANUFACTURER" || user.role === "RETAILER") && <li onClick={() => navigate('/dashboard')} className={
            pathMatchRoute('/dashboard')
              ? 'navbarListItemActive'
              : 'navbarListItem'}>
            <h4 className='navbarListItemName'>
              <span className='mx-2'><RxDashboard /></span>
              Dashboard
            </h4>
          </li>}

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


          <li onClick={() => navigate('/profile')} className={
            pathMatchRoute('/profile')
              ? 'navbarListItemActive'
              : 'navbarListItem'}>
            <h4 className='navbarListItemName'>
              <span className='mx-2'><FaUserCircle /></span>
              Profile
            </h4>
          </li>
         

        </ul>
      </nav>
    </div>



  )
}

export default Navbar