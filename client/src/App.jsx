import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import LandingPage from './components/pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Claims from './pages/Claims'
import Products from './pages/Products'
import Retailers from './pages/Retailers'
// import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.css';

import './App.css'

export default function App() {
    return (
        <Router>

            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/products" element={<Products />} />
                <Route path="/retailers" element={<Retailers />} />


            </Routes>

            <Navbar />


        </Router>
    )
}

