import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '../../context/appContext'
import Loader from '../../components/Loader'

import { toast } from 'react-toastify'
import { MdOutlineCancel } from "react-icons/md";


function AddProduct() {
    const navigate = useNavigate();
    const { axiosFetch } = useAppContext();
    const { productid } = useParams()
    // const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        polices: '',
        warrentyPeriod: 0,
        imageData:null
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedProducts = await axiosFetch.get(`/product/${productid}`)
                console.log(fetchedProducts);
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
                        <h1 className='px-3'>Add Products</h1>
                    </div>
                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <MdOutlineCancel onClick={() => navigate('/products')} className='clickable cursor-pointer' size={40} />
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
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-3'
                            type='text'
                            name='productId'
                            placeholder={formData.productId}
                            aria-label='.form-control-lg example'
                            onChange={handleChange}
                        />
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-3'
                            type='text'
                            name='productName'
                            placeholder={formData.productName}
                            aria-label='.form-control-lg example'

                        />
                        <input
                            disabled
                            className='form-control form-control-lg border border-info mt-3'
                            type='number'
                            name='warrentyPeriod'
                            placeholder={formData.warrentyPeriod}
                            aria-label='.form-control-lg example'

                        />

                        <div class="input-group mb-3 mt-3">
                            <input disabled type="text" class="form-control form-control-lg border border-info " placeholder="QR count" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <button onClick={() => navigate(`/products/${formData.productId}/qr`)} class="btn btn-outline-info clickable" id="basic-addon2">Add QR</button>
                        </div>

                    </div>

                </div>

                <div className='row  p-3 mt-3'>
                    <div className='mb-3'>
                        <label
                            htmlFor='exampleFormControlTextarea1'
                            className='form-label'
                        >
                            Polices:
                        </label>
                        <textarea
                            disabled
                            className='form-control border border-info mt-1'
                            id='exampleFormControlTextarea1'
                            rows='3'
                            name='polices'
                            placeholder={formData.polices}

                        ></textarea>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default AddProduct
