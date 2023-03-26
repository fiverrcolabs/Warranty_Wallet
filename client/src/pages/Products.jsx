import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'
import Product from '../components/Product'

import { toast } from 'react-toastify'
import { GrAddCircle } from 'react-icons/gr'


function Products() {
  var navigate = useNavigate();
  const { axiosFetch } = useAppContext()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await axiosFetch.get('/product/allProducts')
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
    <div className=' mainContainer container'>
      <div className='firstPageProducts container'>
        <div className='row'>
          <div className='col-8'>
            <h1 className='px-3'>Products</h1>
          </div>

          <div className='col topBar'>
            <div className='topBarIcon'>
              <GrAddCircle onClick={() => navigate('/products/addproduct')} className='clickable cursor-pointer' size={40} />
            </div>
          </div>
        </div>

        <div className='productContainer'>
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
