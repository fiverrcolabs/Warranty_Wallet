import QRComponent from '../../components/QRComponent';
import { GrAddCircle } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function QRPage() {

  const navigate = useNavigate();
  const { productid } = useParams()
  const { axiosFetch } = useAppContext()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [qrCount, setQrCount] = useState(0)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await axiosFetch.get(`/item/queryItems?productId=${productid}`)
        console.log(fetchedProducts)
        setProducts(fetchedProducts.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
      }
      // setProducts([{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }, { _id: "5" }, { _id: "6" }, { _id: "7" }])

    }
    fetchData();
  }, [])

  const handleChange = (event) => {
    if(event.target.value>0){
      setQrCount(event.target.value)
    }
  }
  const generateQR = async () => {
    console.log("-----",qrCount, productid)
    handleClose()
    try {
      const fetchedProducts = await axiosFetch.post(`/qr/generateQR`, {
        productId:productid,
        noOfQRCodes:parseInt(qrCount) 
      })
      console.log(fetchedProducts)
      setProducts([...products, ...fetchedProducts.data])
      toast.success("GENERATE COMPLETED")

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
      <div className='firstContainer container'>

        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>QR Codes</h1>
          </div>

          <div className='col topBar'>
            <div className='topBarIcon'>
              <GrAddCircle onClick={handleShow} className='clickable cursor-pointer' size={40} />


            </div>

          </div>

        </div>
        <div className='QRContainer' >

          <Modal show={show} onHide={handleClose} className='border border-info'>
            <Modal.Header closeButton>
              <Modal.Title>QR generate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
              <Form.Label> Enter number of QR codes</Form.Label>
           
                 <input
                className='form-control form-control-lg border border-info mt-3'
                type='number'
                name='productId'
                placeholder='QR count'
                aria-label='.form-control-lg example'
                onChange={handleChange}
              />


            </Modal.Body>
            <Modal.Footer>

              <Button  variant="primary" onClick={generateQR}>
                generate
              </Button>
            </Modal.Footer>
          </Modal>

          {products.map((product) => (
            <QRComponent key={product._id} {...product} />
          ))}
        </div>
      </div>


    </div>

  )
}

export default QRPage