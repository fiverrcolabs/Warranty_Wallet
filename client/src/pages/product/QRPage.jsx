import Product from '../../components/Product';


function Products() {

  return (
    <div className=" mainContainer container">
  
      <div className='secondPageProducts container' style={{ top: "-1125px" }}>

        <h1 className='px-3'>Add product</h1>
        
        <div class="row p-3 px-3">
          <div class="col-6"><Product /></div>
          <div class="col-md-6 col-sm-12 ">
            <input class="form-control form-control-lg border border-info mt-3" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example" />
            <input class="form-control form-control-lg border border-info mt-3" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example" />
            <input class="form-control form-control-lg border border-info mt-3" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example" />

          </div>

        </div>


        <div class="row  p-3 ">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea class="form-control border border-info mt-3" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>


          <button type="button" class="btn btn-primary btn-lg">Large button</button>

        </div>



      </div>



    </div>

  )
}

export default Products