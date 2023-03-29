import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../context/appContext'
import Loader from '../../components/Loader'
import Product from '../../components/Product'

import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'



function Claims() {
    const navigate = useNavigate()

    return (
        <div className=" mainContainer container">
            <div className='firstPageProducts container'>
                <div className='row'>

                    <div className='col-8' >
                        <h1 className='px-3'>Warranty Claim Page</h1>
                    </div>
                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <BsQrCodeScan onClick={() => navigate('/qrreader')} className='clickable cursor-pointer' size={40} />
                        </div>

                    </div>



                </div>

                <div className='secondPageProducts container' >

                    <div className='row  p-3 '>
                        <div className=''>
                            <div className="mb-4  d-flex justify-content-center">
                                {/* <img src={formData.imageData ? formData.imageData : "https://img.freepik.com/premium-vector/profile-flat-blue-simple-icon-with-long-shadowxa_159242-10066.jpg"}
                                    alt="example placeholder" className='rounded-circle' style={{ width: "280px" }} /> */}
                            </div>

                        </div>


                    </div>


                    <div className='row p-3 px-3 '>
                        <div className='col-md-6 col-sm-12  mx-auto '>


                            <form>
                                <div className="form-outline">
                                    <label htmlFor="exampleInputEmail1" className="form-label ">Policies</label>
                                    <textarea type="text" className="form-control form-control-lg border border-info " id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                          
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input border border-info " id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">I agree on terms and conditions</label>
                                </div>
                                <button type="submit" className='btn btn-info btn-lg mt-4 mx-auto text-white'>
                                    Create warrenty
                                </button>
                            </form>

                        </div>

                        {/* 
                        <div className='col-md-6 col-sm-12 '>
                            <input
                                disabled
                                className='form-control form-control-lg border border-info mt-5'
                                type='text'
                                name='productId'

                                aria-label='.form-control-lg example'

                            />
                            <input
                                disabled
                                className='form-control form-control-lg border border-info mt-5'
                                type='text'
                                name='productName'

                                aria-label='.form-control-lg example'

                            />

                            <button type="submit" className='btn btn-danger btn-lg mt-4 mx-3 text-white'>
                                Start warrenty
                            </button>

                        </div> */}


                    </div>

                </div>
            </div>


        </div>

    )
}

export default Claims