import Product from '../components/Product';


function Products() {

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>

        <h1 className='px-3'>Products</h1>

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