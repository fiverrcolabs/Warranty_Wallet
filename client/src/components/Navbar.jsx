import { useNavigate, useLocation } from 'react-router-dom'

import { RxDashboard } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";



function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  if (location.pathname === "/login") return null;

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>

          <li onClick={() => navigate('/dashboard')} className={
            pathMatchRoute('/dashboard')
              ? 'navbarListItemActive'
              : 'navbarListItem'}>
            <h4 className='navbarListItemName'>
              <span className='mx-2'><RxDashboard/></span>
              Dashboard
            </h4>
          </li>

          <li onClick={() => navigate('/products')} className={pathMatchRoute('/products') ? 'navbarListItemActive' : 'navbarListItem'}>

            <h4 className='navbarListItemName'>
            <span className='mx-2'><MdProductionQuantityLimits/></span>
              Products
            </h4>
          </li>

          <li onClick={() => navigate('/claims')} className={
            pathMatchRoute('/claims')
              ? 'navbarListItemActive'
              : 'navbarListItem'
          }>

            <h4 className='navbarListItemName'>
            <span className='mx-2'><MdProductionQuantityLimits/></span>
              Claims
            </h4>
          </li>

          <li onClick={() => navigate('/retailers')} className={
            pathMatchRoute('/retailers')
              ? 'navbarListItemActive'
              : 'navbarListItem'
          }>

            <h4 className='navbarListItemName'>
            <span className='mx-2'><RxDashboard/></span>
              Retailers
            </h4>
          </li>

        </ul>
      </nav>
    </footer>
  )
}

export default Navbar