import React, { useState } from 'react';
// import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import loginImage from '../assets/loginpic.png';
import logo from '../assets/Logog_03.png';
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput as input,
  MDBCheckbox,
  MDBCol, MDBRow
}
  from 'mdb-react-ui-kit';

function Register() {

  const [userType, setJustifyActive] = useState('Manufacturer');
  const { register, isLoading } = useAppContext();

  const handleJustifyClick = (value) => {
    if (value === userType) {
      return;
    }

    setJustifyActive(value);
  };


  const onSubmit = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    console.log(e.target)

    let target   = e.target;
    let formData = {};

    for (let i = 0; i < target.length; i++) {
        formData[target.elements[i].getAttribute("name")] = target.elements[i].value;
    }
    console.log('formData', formData); 

    if (!formData.email || !formData.password || !userType) {
      console.log("all field required")
      toast.warn('all field required')
      return
    }

    register({ formData ,userType })

  }

  return (
    <MDBContainer fluid className="p-3 my-5 width:100%">

      <MDBRow className='mx-3 mb-5' >
        <img src={logo} className='imageLogo' alt="Sample image" />
        <h1 className='topic h1'>Warranty Wallet</h1>


      </MDBRow>

      <MDBRow className='mx-3'>


        <MDBCol col='10' md='6'>
          <div>
            <img src={loginImage} className='img-fluid imageLogin' alt="Sample image" />
            <h3 className='text-center mt-3' >All your warranties in one place</h3>

          </div>

        </MDBCol>

        <MDBCol col='10' md='6' >

          <MDBContainer className="p-0 mt-0 my-5 d-flex flex-column w-75 rounded-bottom boxShadow">

            <MDBTabs pills justify className='mb-0 d-flex flex-row justify-content-between'>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0  colorBlue' onClick={() => handleJustifyClick('Manufacturer')} active={userType === 'Manufacturer'}>
                  Manufacturer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0  colorBlue' onClick={() => handleJustifyClick('Retailer')} active={userType === 'Retailer'}>
                  Retailer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0   colorBlue' onClick={() => handleJustifyClick('Consumer')} active={userType === 'Consumer'}>
                  Consumer
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent className='bg-gradient text-white rounded-bottom colorBlue '>

              <MDBTabsPane className='p-5 pt-5' show={userType === 'Manufacturer'}>
                <form className='form-login' onSubmit={onSubmit}>


                  <input className='form-control mb-3' placeholder='company' type='text' name='company' size="lg" />
                  <input className='form-control mb-3' placeholder='country' type='text' name='country' size="lg" />
                  <input className='form-control mb-3' placeholder='reg.no' type='text' name='reg.no' size="lg" />
                  <input className='form-control mb-3' placeholder='website' type='text' name='website' size="lg" />
                  <select className="form-select mb-3" defaultValue={''} aria-label="Default select example" name='subscription'>
                    <option value="" disabled>subscription</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <input className='form-control mb-3' placeholder='email' type='email' name='email' size="lg" />
                  <input className='form-control mb-3' placeholder='password' type='password' name='password' size="lg" />


                  <button className={isLoading ? "btn mb-4 w-100 loginButton disabled" : "btn mb-4 w-100 loginButton"} > {isLoading ? "Loading..." : "Sign up"} </button>
                  <p className="text-center">Alredy a member? <a href="#!" className='text-white' >Login</a></p>
                </form>

              </MDBTabsPane>

              <MDBTabsPane className='p-5 pt-5' show={userType === 'Retailer'}>

                <form className='form-login' onSubmit={onSubmit}>


                  <input className='form-control mb-3' placeholder='company' type='text' name='company' size="lg" />
                  <input className='form-control mb-3' placeholder='country' type='text' name='country' size="lg" />
                  <input className='form-control mb-3' placeholder='reg.no' type='text' name='reg.no' size="lg" />
                  <input className='form-control mb-3' placeholder='website' type='text' name='website' size="lg" />
                  <input className='form-control mb-3' placeholder='email' type='email' name='email' size="lg" />
                  <input className='form-control mb-3' placeholder='password' type='password' name='password' size="lg" />



                  <button className={isLoading ? "btn mb-4 w-100 loginButton disabled" : "btn mb-4 w-100 loginButton"} > {isLoading ? "Loading..." : "Sign up"} </button>
                  <p className="text-center">Alredy a member? <a href="#!" className='text-white' >Login</a></p>
                </form>

              </MDBTabsPane>

              <MDBTabsPane className='p-5 pt-5' show={userType === 'Consumer'}>

                <form className='form-login' onSubmit={onSubmit}>


                  <input className='form-control mb-3' placeholder='name' type='text' name='name' size="lg" />
                  <input className='form-control mb-3' placeholder='country' type='text' name='country' size="lg" />
                  <input className='form-control mb-3' placeholder='NIC' type='text' name='nic' size="lg" />
                  <input className='form-control mb-3' placeholder='email' type='email' name='email' size="lg" />
                  <input className='form-control mb-3' placeholder='password' type='password' name='password' size="lg" />



                  <button className={isLoading ? "btn mb-4 w-100 loginButton disabled" : "btn mb-4 w-100 loginButton"} > {isLoading ? "Loading..." : "Sign up"} </button>
                  <p className="text-center">Alredy a member? <a href="#!" className='text-white' >Login</a></p>
                </form>

              </MDBTabsPane>

            </MDBTabsContent>

          </MDBContainer>


        </MDBCol>

      </MDBRow>



    </MDBContainer>
  );
}

export default Register;