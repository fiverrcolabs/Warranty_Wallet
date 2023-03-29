
function DashBoard() {

  return (
    <div className=" mainContainer container">
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Dashboard</h1>
          </div>



          <div className='col topBar'>
            <div className='topBarIcon'>
              {/* <GrAddCircle onClick={() => navigate('/products/addproduct')} className='clickable cursor-pointer' size={40} /> */}
            </div>

          </div>




        </div>

        <div className='secondPageProducts container' >
     
        </div>
      </div>


    </div>

  )
}

export default DashBoard