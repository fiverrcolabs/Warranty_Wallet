import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import LandingPage from './components/pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
// import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
// import HomePage from './components/pages/HomePage'
import 'bootstrap/dist/css/bootstrap.css';

import './App.css'

export default function App() {
    return (
        <Router>
            
            <Routes>
                    {/* <Route exact path="/" component={ LandingPage } /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={ <Register /> } />

                    {/*<Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/home" component={ HomePage } /> */}
                </Routes>
              
         
        </Router>
    )
}

