import QRComponent from '../../components/QRComponent';
import { GrAddCircle } from 'react-icons/gr'
import { MdSaveAlt } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useRef } from 'react';


function QRPage() {

  const navigate = useNavigate();
  const { productid } = useParams()
  const { axiosFetch } = useAppContext()
  const [products, setProducts] = useState([])
  const [qrs, setQrs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [qrCount, setQrCount] = useState(0)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pdfComponent = useRef(null);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await axiosFetch.get(`/item/queryItems?productId=${productid}`)
        console.log(fetchedProducts)
        setProducts(fetchedProducts.data)
        setQrs(fetchedProducts.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
      }
      // setProducts([{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }, { _id: "5" }, { _id: "6" }, { _id: "7" }])

    }
    fetchData();
  }, [refresh])

  const handleChange = (event) => {
    if (event.target.value > 0) {
      setQrCount(event.target.value)
    }
  }
  const handleFromChange = (event) => {
    const date = new Date(event.target.value);
    let ar = [...qrs];

    ar = ar.filter(function (qr) {
      if (qr.createdDate){
        console.log((Date.parse(date) / 1000) , Math.floor(Date.parse(qr.createdDate)/1000));
        return  (Date.parse(date) / 1000) <=  Math.floor(Date.parse(qr.createdDate)/1000) ? qr: null;
      }
       
    })
    setProducts(ar);

  };
  const handleToChange = (event) => {
    const date = new Date(event.target.value);
    let ar = [...qrs];

    ar = ar.filter(function (qr) {
      if (qr.createdDate){
        console.log((Date.parse(date) / 1000) , Math.floor(Date.parse(qr.createdDate)/1000));
        return  (Date.parse(date) / 1000) >=  Math.floor(Date.parse(qr.createdDate)/1000) ? qr: null;
      }
       
    })
    setProducts(ar);

  };

  const generateQR = async () => {
    console.log("-----", qrCount, productid)
    handleClose()
    try {
      const fetchedProducts = await axiosFetch.post(`/qr/generateQR`, {
        productId: productid,
        noOfQRCodes: parseInt(qrCount)
      })
      console.log(fetchedProducts)
      // setProducts([...products, ...fetchedProducts.data])
      setRefresh(!refresh)
      toast.success("GENERATE COMPLETED")

    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)
    }

  }

  const handleExport = (e) => {
    pdfComponent.current.save()
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

          <div className='col-8 col-xl-9' >
            <h1 className='px-3'>QR Codes</h1>
          </div>

          <div className='col topBar'>
            <div className='topBarIcon'>
              <MdSaveAlt variant="primary" className='clickable cursor-pointer' onClick={handleExport} size={45} />
            </div>
          </div>
          <div className='col topBar'>
            <div className='topBarIcon'>
              <GrAddCircle onClick={handleShow} className='clickable cursor-pointer' size={40} />
            </div>

          </div>
         





        </div>
        <div className='row mt-4'>

          <div className="input-group mb-3 mx-3">
            <span className="input-group-text">From</span>
            <input onChange={handleFromChange} className="form-control border border-info" type="date" name="from-time" id="" />

            <span className="input-group-text ms-3">To</span>
            <input onChange={handleToChange} className="form-control border border-info " type="date" name="to-time" id="" />
          </div>






        </div>

        <PDFExport ref={pdfComponent} paperSize="A4">
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

                <Button variant="primary" onClick={generateQR}>
                  generate
                </Button>
              </Modal.Footer>
            </Modal>



            {products.map((product) => (
              <QRComponent key={product._id} {...product} />
            ))}




          </div>
        </PDFExport>






      </div>


    </div >

  )
}

export default QRPage