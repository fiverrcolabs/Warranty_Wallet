import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../../context/appContext'
import { toast } from 'react-toastify'
import { MdOutlineCancel } from "react-icons/md"



function AddProduct() {
  const navigate = useNavigate();
  const { axiosFetch } = useAppContext()
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    polices: '',
    warrentyPeriod: 0,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
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
      navigate('/products')

    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)

    }

  };

  return (
    <form onSubmit={handleSubmit}>
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
            <div className='col-md-12 col-lg-6 col-xl-6 mx-auto'>


              <div>
                <div className="mb-4 d-flex justify-content-center">
                  <img src={image ? image : "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"}
                    alt="example placeholder" className='rounded' style={{ width: "300px" }} />
                </div>
                <div className="d-flex justify-content-center">
                  <div className="btn btn-info ">
                    <label className="form-label text-white m-1" htmlFor="customFile1">Choose file</label>
                    <input onChange={handleImageChange} type="file" className="form-control d-none" id="customFile1" />
                  </div>
                </div>
              </div>
            </div>



            <div className='col-md-12 col-lg-6 col-xl-6 '>
              <input
                className='form-control form-control-lg border border-info mt-3'
                type='text'
                name='productId'
                placeholder='Product Id'
                aria-label='.form-control-lg example'
                onChange={handleChange}
              />
              <input
                className='form-control form-control-lg border border-info mt-3'
                type='text'
                name='productName'
                placeholder='Product Name'
                aria-label='.form-control-lg example'
                onChange={handleChange}
              />
              <input
                className='form-control form-control-lg border border-info mt-3'
                type='number'
                min={0}
                name='warrentyPeriod'
                placeholder='Warranty Period'
                aria-label='.form-control-lg example'
                onChange={handleChange}
              />
              {/* <input
              className='form-control form-control-lg border border-info mt-3'
              type='text'
              placeholder='No of QR codes'
              aria-label='.form-control-lg example'
            /> */}
            </div>

          </div>

          <div className='row  p-3 mt-3'>
            <div className='mb-3'>
              <label
                htmlFor='exampleFormControlTextarea1'
                className='form-label'
              >
                Add Polices
              </label>
              <textarea
                className='form-control border border-info mt-1'
                id='exampleFormControlTextarea1'
                rows='3'
                name='polices'
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className='btn btn-info btn-lg  text-white'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddProduct
