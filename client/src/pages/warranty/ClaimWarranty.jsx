import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '../../context/appContext'
import Loader from '../../components/Loader'

import { toast } from 'react-toastify'
import { MdOutlineCancel } from "react-icons/md";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



function ClaimItem() {
    const USER = {
        MANUFACTURER: "MANUFACTURER",
        RETAILER: "RETAILER",
        CONSUMER: "CONSUMER"
    }
    const navigate = useNavigate();
    const { axiosFetch, user } = useAppContext();
    const { warrantyId } = useParams()
    const [qrCount, setQrCount] = useState(0)
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [newData, setNewData] = useState({
        warrantyId: warrantyId,
        description: "",
        serviceProviderType: ""

    });


    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);




    useEffect(() => {
        async function fetchData() {
            try {

                const fetchedProducts = await axiosFetch.get(`/warranty/${warrantyId}`)
                console.log(fetchedProducts.data);
                setFormData(fetchedProducts.data)


                setIsLoading(false)

            } catch (error) {
                console.log(error.response.data.msg)
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

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target)
        try {
            const createdProduct = await axiosFetch.post('/claim/createClaim', newData)
            console.log(createdProduct);
            toast.success("Claim Created Successfully")

        } catch (error) {
            console.log(error.response.data.msg)
            toast.error(error.response.data.msg)

        }

    };

    if (isLoading) {
        return (
            <Loader />
        )
    }



    return (

        <div className=' mainContainer container'>
            <div className='secondPageProducts container'>

                <div className='row'>

                    <div className='col-8' >
                        <h1 className='px-3'>Claim Item Warranty</h1>
                    </div>
                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <MdOutlineCancel onClick={() => navigate('/warranty')} className='clickable cursor-pointer' size={40} />
                        </div>
                    </div>

                </div>

                <div className='row p-3 px-3 '>




                    <div className='col-6 mx-auto'>
                        <div>
                            <div className="mb-4 mt-4 d-flex justify-content-center">
                                <img src={formData.imageData ? formData.imageData : "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"}
                                    alt="example placeholder" className='rounded' style={{ width: "280px" }} />
                            </div>

                        </div>

                    </div>


                    <div className='col-md-6 col-sm-12 '>

                        <select required onChange={handleChange} name='serviceProviderType' defaultValue={"RETAILER"} className='form-control form-control-lg border border-info mt-4' aria-label="Default select example">
                        <option value="RETAILER" disabled >Choose service provider</option>
                            <option value="RETAILER">Retailer</option>
                            <option value="MANUFACTURER">Manufacturer</option>

                        </select>
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-3'
                            type='number'
                            name='warrentyPeriod'
                            placeholder='NEW'
                            aria-label='.form-control-lg example'

                        />

                        {/* <div className="input-group mb-3 mt-3">
                            <input disabled type="text" className="form-control form-control-lg border border-info " placeholder={`${qrCount}`} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <button onClick={() => navigate(`/products/${productid}/qr`)} className="btn btn-outline-info clickable" id="basic-addon2">Add QR</button>
                        </div> */}

                    </div>

                </div>

                <div className='row  p-3 mt-3'>
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleFormControlTextarea1'
                            className='form-label'
                        >
                            Claim details:
                        </label>
                        <textarea

                            className='form-control border border-info mt-1'
                            id='exampleFormControlTextarea1'
                            rows='3'
                            name='description'
                            placeholder='add claim details here'
                            onChange={handleChange}

                        ></textarea>
                    </div>


                    {user.role === USER.CONSUMER && <button type="submit" onClick={handleSubmit} className='btn btn-info btn-lg text-white'>
                        Claim Warranty
                    </button>}

                </div>

            </div>
        </div>

    )
}

export default ClaimItem
