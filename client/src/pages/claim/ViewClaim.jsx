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
    const navigate = useNavigate();
    const { axiosFetch, user } = useAppContext();
    const { claimId } = useParams()

    // const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [editable, setEditable] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newData, setNewData] = useState({
        state: '',
        asigneer: '',
        tasktime: '',
      });
    



    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedProducts = await axiosFetch.get(`/claim/${claimId}`)
                console.log(fetchedProducts.data);
                setFormData(fetchedProducts.data[0])
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdProduct = await axiosFetch.post('/product/addProduct', {
        ...formData,
        imageData: image
      })
      console.log(createdProduct);
      toast.success("Product Created Successfully")

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
                        <h1 className='px-3'>Claim Item</h1>
                    </div>
                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <MdOutlineCancel onClick={() => navigate('/claims')} className='clickable cursor-pointer' size={40} />
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
                        <select  onChange={handleChange} name='state' disabled={!editable} className='form-control form-control-lg border border-info mt-4' aria-label="Default select example">
                            <option value="1">New</option>
                            <option value="2">InProgress</option>
                            <option value="3">Completed</option>
                            <option value="4">Rejected</option>
                        </select>
                        <input onChange={handleChange}
                            disabled={!editable}
                            className='form-control form-control-lg border border-info mt-3'
                            type='text'
                            name='asigneer'
                            placeholder={!editable?(formData.asigneer):"add asigneer"}
                            aria-label='.form-control-lg example'

                        />
                        <input onChange={handleChange}
                             disabled={!editable}
                            className='form-control form-control-lg border border-info mt-3'
                            type='number'
                            name='tasktime'
                            placeholder={!editable?(formData.tasktime):"add tasktime"}
                            min={1}
                            aria-label='.form-control-lg example'

                        />
                        <button disabled={!editable}  className='btn btn-info btn-lg mt-3  text-white' >Save</button>
                        <button onClick={()=>{setEditable(!editable)}} className='btn btn-info btn-lg mt-3 mx-4  text-white' >Edit</button>


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
                            Discription:
                        </label>
                        <textarea
                            disabled
                            className='form-control border border-info mt-1'
                            id='exampleFormControlTextarea1'
                            rows='3'
                            name='polices'
                            placeholder={formData.description}

                        ></textarea>
                    </div>


                    {user.role === "RETAILER" && <button onClick={handleShow} type="submit" className='btn btn-info btn-lg  text-white'>
                        Transfer to Manufacturer
                    </button>}

                </div>

            </div>
        </div>

    )
}

export default ClaimItem
