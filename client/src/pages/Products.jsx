import Product from '../components/Product';
import { GrAddCircle } from "react-icons/gr";


function Products() {

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Products</h1>
          </div>



          <div className='col topBar'>
            <div className='topBarIcon'>
              <GrAddCircle size={40} />
            </div>

          </div>




        </div>

        <div className='productContainer' >
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>


    </div>

  )
}

export default Products