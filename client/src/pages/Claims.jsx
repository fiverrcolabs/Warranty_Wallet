
function Claims() {

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Claims</h1>
          </div>



          <div className='col topBar'>
            <div className='topBarIcon'>
              {/* <GrAddCircle onClick={() => navigate('/products/addproduct')} className='clickable cursor-pointer' size={40} /> */}
            </div>

          </div>




        </div>

        <div className='secondPageProducts container' >
          <table class="table table-bordered table-hover shadow ">
            <thead>
              <tr>
                <th scope="col">ClaimId</th>
                <th scope="col">Assignee</th>
                <th scope="col">TaskTime</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Thornton</td>
            
              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </div>

  )
}

export default Claims