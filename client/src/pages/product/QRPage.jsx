import QRComponent from '../../components/QRComponent';
import { GrAddCircle } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import { useNavigate ,useParams} from 'react-router-dom';

import { useAppContext } from '../../context/appContext'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'


function QRPage() {

  const navigate = useNavigate();
  const { productid } = useParams()
  const { axiosFetch } = useAppContext()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await axiosFetch.get(`/item/queryItems?productId=${productid}`)
        console.log(fetchData)
        setProducts(fetchedProducts.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
      }

    }
    fetchData();
  }, [])

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
            <h1 className='px-3'>QR Scanner</h1>
          </div>

          <div className='col topBar'>
            <div className='topBarIcon'>
            <GrAddCircle onClick={() => navigate('/products/addproduct')} className='clickable cursor-pointer' size={40} />            </div>

          </div>

        </div>
        <div className='QRContainer' >
      
          {products.map((product) => (
            <QRComponent key={product._id} {...product} />
          ))}
        </div>
      </div>


    </div>

  )
}

export default QRPage