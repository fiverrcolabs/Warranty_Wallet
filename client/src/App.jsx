import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/DashBoard'


import Claims from './pages/Claims'
import ViewClaim from './pages/claim/ViewClaim'
import ViewWarranty from './pages/warranty/ViewWarranty'

import Profile from './pages/Profile'

import Warranty from './pages/Warranty'
import QRReader from './pages/QRReader'
import QRResult from './pages/warranty/QrResult'

import Products from './pages/Products'
import AddProduct from './pages/product/AddProduct'
import ViewProduct from './pages/product/ViewProduct'
import QRPage from './pages/product/QRPage'

import Connections from './pages/Connections'
import Requests from './pages/connection/Requests'

import Navbar from './components/Navbar'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.css';

import './App.css'

export default function App() {
    return (
        <Router>
            
            <Navbar/>
            <ToastContainer />

            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path='/' element={<ProtectedRoute/>} >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/claims" element={<Claims />} />
                    <Route path="/claims/:claimId" element={<ViewClaim />} />
             
                    <Route path="/warranty" element={<Warranty />} />
                    <Route path="/warranty/qrreader" element={<QRReader />} />
                    <Route path="/warranty/create/:itemId" element={<QRResult />} />
                    <Route path="/warranty/:warrantyId" element={<ViewWarranty />} />


                    <Route path="/products" element={<Products />} />
                    <Route path="/products/addproduct" element={<AddProduct />} />
                    <Route path="/products/:productid/qr" element={<QRPage />} />
                    <Route path="/products/:productid" element={<ViewProduct />} />


                    <Route path="/connections" element={<Connections />} />
                    <Route path="/connections/requests" element={<Requests />} />

                </Route>




            </Routes>




        </Router>
    )
}

