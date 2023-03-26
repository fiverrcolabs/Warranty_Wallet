import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import LandingPage from './components/pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Claims from './pages/Claims'
import Products from './pages/Products'
import AddProduct from './pages/product/AddProduct'
import Requests from './pages/friend/Requests'
import QRPage from './pages/product/QRPage'
import Retailers from './pages/Retailers'

import Navbar from './components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.css';

import './App.css'

export default function App() {
    return (
        <Router>

            <Navbar />
            <ToastContainer />

            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/claims" element={<Claims />} />

                <Route path="/products" element={<Products />} />
                <Route path="/products/addproduct" element={<AddProduct />} />
                <Route path="/products/qr" element={<QRPage />} />


                <Route path="/retailers" element={<Retailers />} />
                <Route path="/retailers/requests" element={<Requests />} />


            </Routes>




        </Router>
    )
}

