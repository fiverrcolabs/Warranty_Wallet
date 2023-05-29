import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'

import { toast } from 'react-toastify'
import { MdLogout } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import mainProfileIcon from '../assets/main-profile-icon.avif';


function AddProduct() {
    const navigate = useNavigate();
    const { axiosFetch, logoutUser, user } = useAppContext();
    const { productid } = useParams()
    // const [image, setImage] = useState(null)
    const [qrCount, setQrCount] = useState(0)
    const [formData, setFormData] = useState({
    });
    const [isLoading, setIsLoading] = useState(true)

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
                            <BiChat onClick={() => navigate('/chat')} className='clickable cursor-pointer'   size={50} />
                         
                        </div>
                    </div>
                    {/* <div className='col topBar'>
                        <div className='topBarIcon'>
                            <MdLogout onClick={() => logOut()} className='clickable cursor-pointer' color={'red'} size={50} />
                         
                        </div>
                    </div> */}
                 

                </div>


                <div className='row  pt-0 '>
                    <div className=''>
                        <div className="mb-4  d-flex justify-content-center">
                            <img src={mainProfileIcon}
                                alt="example placeholder" className='rounded-circle' style={{ width: "280px" }} />
                        </div>

                    </div>


                </div>


                <div className='row  px-3 '>
                    <div className={ user.role !== 'CONSUMER'? 'col-md-12 col-lg-6 col-xl-6':'col-md-12 p-5'}>
                        <div id="emailHelp" className="form-text mt-1">email</div>
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
                            placeholder={formData._id}
                            aria-label='.form-control-lg example'

                        />

                    </div>


                    {user.role !== 'CONSUMER' &&
                        <div className='col-md-12 col-lg-6 col-xl-6'>
                            <div id="emailHelp" className="form-text mt-1">Company</div>
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

                <div className='row p-3 px-3 '>


                    <button type="submit" onClick={() => logOut()} className='btn btn-danger btn-lg mt-4 mx-auto text-white'>
                        Logout
                    </button>
                </div>



            </div>
        </div>


    )
}

export default AddProduct
