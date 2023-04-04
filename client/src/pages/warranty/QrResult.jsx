import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '../../context/appContext'
import Loader from '../../components/Loader'
import Product from '../../components/Product'


import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'
import moment from 'moment'


function Claims() {
    const navigate = useNavigate()
    const { itemId } = useParams()
    // const itemId="641fd97a759a32faecb01397"
    const { axiosFetch, user } = useAppContext()
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [retailerButton, setRetailerButton] = useState(true)
    const [retailerAvailable, setRetailerAvailable] = useState(false)
    const USER = {
        MANUFACTURER: "MANUFACTURER",
        RETAILER: "RETAILER",
        CONSUMER: "CONSUMER"
    }
    const [newData, setNewData] = useState({
      
        nickname: '',
     
    });


    useEffect(() => {
        async function fetchData() {
            try {

                const fetchedConnections = await axiosFetch.get(`/warranty/getWarrantyByItemId/?itemId=${itemId}`)
                setData(fetchedConnections.data)

                // const fetchedConnections = await axiosFetch.get(`/warranty/getWarrantyByItemId/?itemId=${itemId}`)
                // setData(fetchedConnections.data)

                console.log(fetchedConnections.data)
                console.log(user.role)
                setIsLoading(false)


            } catch (error) {
                setRetailerButton(false)
                console.log(data)
                toast.error(error.response.data.msg)

            }

        }
        fetchData();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    const onClickRetailer = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await axiosFetch.post(`/warranty/createWarranty`, {
                itemId
            })

            console.log(res)
            toast.success("WARRANTY CREATED")
            setIsLoading(false)
            navigate('/warranty')

        } catch (error) {
            console.log(error.response.data.msg)
            toast.error(error.response.data.msg)
        }
    }

    const onClickConsumer = async (e) => {
        e.preventDefault()
        console.log(data._id)
        setIsLoading(true)
        try {

            const res = await axiosFetch.patch(`/warranty/assignSelf`, {
                warrantyId: data._id,
                nickname:newData.nickname
            })

            console.log(res)
            toast.success("WARRANTY STARTED")
            setIsLoading(false)
            navigate('/warranty')
        } catch (error) {
            console.log(error.response.data.msg)
            toast.error(error.response.data.msg)
        }
    }


    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <div className=" mainContainer container">
            <div className='firstPageProducts container'>
                <div className='row'>

                    <div className='col-8' >
                        <h1 className='px-3'>Warranty Start Page</h1>
                    </div>
                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <BsQrCodeScan onClick={() => navigate('/qrreader')} className='clickable cursor-pointer' size={40} />
                        </div>

                    </div>



                </div>

                <div className='secondPageProducts container' >




                    {user.role === USER.RETAILER &&
                        <div className='row p-3 px-3 mt-5 '>
                            <div className='col-md-6 col-sm-12  mx-auto '>


                                <form>
                                    <div className="form-outline">
                                        <label htmlFor="exampleInputEmail1" className="form-label ">Policies</label>
                                        <textarea disabled type="text" value={data.productId?data.productId.polices:""}  className="form-control form-control border border-info " id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>

                                    <div className="mb-3 mt-2 form-check">
                                        <input onClick={()=>{setRetailerAvailable(!retailerAvailable)}} type="checkbox" className="form-check-input border border-info " id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">I agree on terms and conditions</label>
                                    </div>
                                    <button disabled={!retailerButton || !retailerAvailable} onClick={onClickRetailer} type="submit" className='btn btn-info btn-lg mt-4 mx-auto text-white'>
                                        {retailerButton ? 'Create warrenty' : 'Already started'}
                                    </button>
                                </form>

                            </div>

                        </div>}


                    {user.role === USER.CONSUMER &&
                        <div className='row p-3 px-3 mt-5 '>
                            <div className='col-md-6 col-sm-12  mx-auto '>


                                <form>
                                    <div className="form-outline">
                                        <label htmlFor="exampleInputEmail1" className="form-label ">Email</label>
                                        <input disabled value={user.email?user.email:""} type="text" className="form-control  border border-info " id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>

                                    <div className="form-outline">
                                        <label htmlFor="exampleInputEmail1" className="form-label ">Nick name</label>
                                        <input onChange={handleChange} value={newData.nickname} type="text" className="form-control  border border-info " name="nickname" id="nickname" aria-describedby="emailHelp" />

                                    </div>

                                    <div className="form-outline">
                                        <label htmlFor="exampleInputEmail1" className="form-label ">Purchase date</label>
                                        <input disabled value={data.purchaseDate? moment(data.purchaseDate).format('YYYY-MM-DD') :""} type="text" className="form-control  border border-info " aria-describedby="emailHelp" />

                                    </div>


                                    <div className="form-outline">
                                        <label htmlFor="exampleInputEmail1" className="form-label ">Policies</label>
                                        <textarea disabled value={data.itemId?data.itemId.productId.polices:""} type="text" className="form-control form-control border border-info " id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>

                                    <div className="mb-3 mt-2 form-check">
                                        <input onClick={()=>{setRetailerAvailable(!retailerAvailable)}}  type="checkbox" className="form-check-input border border-info " id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">I agree on terms and conditions</label>
                                    </div>
                                    <button disabled={!retailerButton || !retailerAvailable} onClick={onClickConsumer} type="submit" className='btn btn-info btn-lg mt-4 mx-auto text-white'>
                                        {data.customerId ? 'Already started' : 'Start warrenty'}
                                    </button>
                                </form>

                            </div>

                        </div>}


                </div>
            </div>


        </div>

    )
}

export default Claims