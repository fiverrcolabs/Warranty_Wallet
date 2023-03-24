import Product from '../../components/Product';


function Products() {

  return (
    <div className=" mainContainer container">
  
      <div className='secondPageProducts container' >

        <h1 className='px-3'>Add product</h1>
        
        <div className="row p-3 px-3 ">
          <div className="col-6 mx-auto">< Product /></div>
          <div className="col-md-6 col-sm-12 ">
          <input className="form-control form-control-lg border border-info mt-3" type="text" placeholder="Product Id" aria-label=".form-control-lg example" />
            <input className="form-control form-control-lg border border-info mt-3" type="text" placeholder="Product Name" aria-label=".form-control-lg example" />
            <input className="form-control form-control-lg border border-info mt-3" type="text" placeholder="Warranty Period" aria-label=".form-control-lg example" />
            <input className="form-control form-control-lg border border-info mt-3" type="text" placeholder="No of QR codes" aria-label=".form-control-lg example" />

          </div>

        </div>


        <div className="row  p-3 mt-3">
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Polices</label>
            <textarea className="form-control border border-info mt-1" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>


          <button type="button" className="btn btn-info btn-lg">Large button</button>

        </div>



      </div>



    </div>

  )
}

export default Products