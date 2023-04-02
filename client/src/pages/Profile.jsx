import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'

import { toast } from 'react-toastify'
import { MdLogout } from "react-icons/md";
import { BiChat } from "react-icons/bi";


function AddProduct() {
    const navigate = useNavigate();
    const { axiosFetch,logoutUser } = useAppContext();
    const { productid } = useParams()
    // const [image, setImage] = useState(null)
    const [qrCount, setQrCount] = useState(0)
    const [formData, setFormData] = useState({
        _id: '',
        productId: '',
        productName: '',
        polices: '',
        warrentyPeriod: 0,
        imageData: null
    });
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            // try {
            //     const fetchedProducts = await axiosFetch.get(`/product/${productid}`)
            //     console.log(fetchedProducts);
            //     setFormData(fetchedProducts.data)

            //     const qrCountForProduct = await axiosFetch.get(`/item/itemCount?productId=${productid}`)
            //     setQrCount(qrCountForProduct.data.count)
            //     setIsLoading(false)

            // } catch (error) {
            //     console.log(error.response.data.msg)
            //     toast.error(error.response.data.msg)

            // }

        }
        fetchData();
    }, [])


    // const handleImageChange = (event) => {
    //     const file = event.target.files[0]
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setImage(reader.result)
    //     }
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const logOut=() => {

        logoutUser()
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const createdProduct = await axiosFetch.post('/product/addProduct', {
    //             ...formData,
    //             imageData: image
    //         })
    //         console.log(createdProduct);
    //         toast.success("Product Created Successfully")

    //     } catch (error) {
    //         console.log(error.response.data.msg)
    //         toast.error(error.response.data.msg)

    //     }

    // };

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
                        <h1 className='px-3'>Profile</h1>
                    </div>
                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <BiChat onClick={() => navigate('/chat')} className='clickable cursor-pointer'  size={50} />
                         
                        </div>
                    </div>
                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <MdLogout onClick={() => logOut()} className='clickable cursor-pointer' color={'red'} size={50} />
                         
                        </div>
                    </div>
                 

                </div>


                <div className='row  p-3 '>
                    <div className=''>
                        <div className="mb-4  d-flex justify-content-center">
                            <img src={formData.imageData ? formData.imageData : "https://img.freepik.com/premium-vector/profile-flat-blue-simple-icon-with-long-shadowxa_159242-10066.jpg"}
                                alt="example placeholder" className='rounded-circle' style={{ width: "280px" }} />
                        </div>

                    </div>


                </div>


                <div className='row p-3 px-3 '>
                    <div className='col-6 '>
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-5'
                            type='text'
                            name='productId'
                            placeholder={formData.productId}
                            aria-label='.form-control-lg example'
                            onChange={handleChange}
                        />
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-5'
                            type='text'
                            name='productName'
                            placeholder={formData.productName}
                            aria-label='.form-control-lg example'

                        />

                    </div>


                    <div className='col-md-6 col-sm-12 '>
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-5'
                            type='text'
                            name='productId'
                            placeholder={formData.productId}
                            aria-label='.form-control-lg example'
                            onChange={handleChange}
                        />
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-5'
                            type='text'
                            name='productName'
                            placeholder={formData.productName}
                            aria-label='.form-control-lg example'

                        />
                        {/* <input
                            disabled
                            className='form-control form-control-lg border border-info mt-3'
                            type='number'
                            name='warrentyPeriod'
                            placeholder={formData.warrentyPeriod}
                            aria-label='.form-control-lg example'

                        />

                        <div className="input-group mb-3 mt-3">
                            <input disabled type="text" className="form-control form-control-lg border border-info " placeholder={`${qrCount}`} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <button onClick={() => navigate(`/products/${productid}/qr`)} className="btn btn-outline-info clickable" id="basic-addon2">Add QR</button>
                        </div> */}

                    </div>


                </div>

                {/* <div className='row p-3 px-3 '>


                    <button type="submit" className='btn btn-danger btn-lg mt-4 mx-3 text-white'>
                        Logout
                    </button>
                </div>
 */}


            </div>
        </div>


    )
}

export default AddProduct
