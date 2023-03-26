import { useNavigate, useLocation } from 'react-router-dom'

import { RxDashboard } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";





function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const user={
    email:"test@gmail.com",
    type:"MANUFACTURER"
  }

  const pathMatchRoute = (route) => {
    // console.log(location.pathname.slice(0,route.length-1))
    if (route === location.pathname || route===location.pathname.slice(0,route.length)) {
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

            <li onClick={() => navigate('/products')} className={pathMatchRoute('/products') ? 'navbarListItemActive' : 'navbarListItem'}>

              <h4 className='navbarListItemName'>
                <span className='mx-2'><MdProductionQuantityLimits /></span>
                Products
              </h4>
            </li>

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

            <li onClick={() => navigate('/connections')} className={
              pathMatchRoute('/connections')
                ? 'navbarListItemActive'
                : 'navbarListItem'
            }>

              <h4 className='navbarListItemName'>
                <span className='mx-2'><RxDashboard /></span>
                {user.type==="MANUFACTURER"? 'Retailers' : 'Not allow'}
              </h4>
            </li>

          </ul>
        </nav>
      </div>



  )
}

export default Navbar