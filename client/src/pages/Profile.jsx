import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'

import { toast } from 'react-toastify'
import { MdLogout } from "react-icons/md";


function AddProduct() {
    const navigate = useNavigate();
    const { axiosFetch, logoutUser, user } = useAppContext();
    const { productid } = useParams()
    // const [image, setImage] = useState(null)
    const [qrCount, setQrCount] = useState(0)
    const [formData, setFormData] = useState({
    });
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedProducts = await axiosFetch.get(`/auth/getProfile`)
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

    const logOut = () => {

        logoutUser()
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
                        <h1 className='px-3'>Profile</h1>
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
                    <div className='col-md-12 col-lg-6 col-xl-6'>
                        <div id="emailHelp" className="form-text mt-5">email</div>
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-0'
                            type='text'
                            name='productId'
                            placeholder={formData.email}
                            aria-label='.form-control-lg example'

                        />

                        <div id="emailHelp" className="form-text mt-5">user Id</div>
                        <input
                            disabled
                            className='form-control form-control-lg border border-info '
                            type='text'
                            name='productName'
                            placeholder={formData.userId}
                            aria-label='.form-control-lg example'

                        />

                    </div>


                    {user.role !== 'CONSUMER' &&
                        <div className='col-md-12 col-lg-6 col-xl-6'>
                            <div id="emailHelp" className="form-text mt-5">Company</div>
                            <input
                                disabled
                                className='form-control form-control-lg border border-info mt-0'
                                type='text'
                                name='productId'
                                placeholder={formData.company}
                                aria-label='.form-control-lg example'

                            />

                            <div id="emailHelp" className="form-text mt-5">Website</div>
                            <input
                                disabled
                                className='form-control form-control-lg border border-info '
                                type='text'
                                name='productName'
                                placeholder={formData.website}
                                aria-label='.form-control-lg example'

                            />


                        </div>}


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
