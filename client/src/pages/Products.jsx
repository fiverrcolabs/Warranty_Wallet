import { useState, useEffect } from 'react'
import Product from '../components/Product'
import { useAppContext } from '../context/appContext'
import { GrAddCircle } from 'react-icons/gr'

function Products() {
  const { axiosFetch } = useAppContext()
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await axiosFetch.get('/product/allProducts')
      setProducts(fetchedProducts.data)
    }
    fetchData();
  }, [])

  return (
    <div className=' mainContainer container'>
      <div className='firstPageProducts container'>
        <div className='row'>
          <div className='col-8'>
            <h1 className='px-3'>Products</h1>
          </div>

          <div className='col topBar'>
            <div className='topBarIcon'>
              <GrAddCircle size={40} />
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
