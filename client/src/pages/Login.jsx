import React, { useState } from 'react';
// import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import loginImage from '../assets/loginpic.png';
import logo from '../assets/Logog_03.png';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBCol, MDBRow 
}
  from 'mdb-react-ui-kit';

function App() {

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer fluid className="p-3 my-5 width:100%">

      <MDBRow className='mx-3 mb-5' >
        <img src={logo} className='imageLogo' alt="Sample image" />
        <h1 className='topic h1'>Warranty Wallet ($)</h1>


      </MDBRow>

      <MDBRow className='mx-3'>


        <MDBCol col='10' md='6'>
          <div>
            <img src={loginImage} className='img-fluid imageLogin' alt="Sample image" />
            <h3 className='text-center mt-3' >All your warranties in one place</h3>

          </div>

        </MDBCol>

        <MDBCol col='10' md='6' >

          <MDBContainer className="p-0 my-5 d-flex flex-column w-75 rounded-bottom boxShadow">

            <MDBTabs pills justify className='mb-0 d-flex flex-row justify-content-between'>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0  colorBlue' onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                  customer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0  colorBlue' onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                  retailer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0   colorBlue' onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
                  seller
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent className='bg-gradient text-white rounded-bottom colorBlue '>

              <MDBTabsPane className='p-5 pt-5' show={justifyActive === 'tab1'}>


                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' size="lg" />
            

                <button className=" btn mb-4 w-100 loginButton">Sign in</button>
                <p className="text-center">Not a member? <a href="#!" className='text-white' >Register</a></p>

              </MDBTabsPane>

              <MDBTabsPane className='p-5 pt-5' show={justifyActive === 'tab2'}>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' size="lg" />

   

                <button className=" btn mb-4 w-100 loginButton">Sign in</button>
                <p className="text-center">Not a member? <a href="#!" className='text-white' >Register</a></p>


              </MDBTabsPane>

              <MDBTabsPane className='p-5 pt-5' show={justifyActive === 'tab3'}>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' size="lg" />

                <button className=" btn mb-4 w-100 loginButton">Sign in</button>
                <p className="text-center">Not a member? <a href="#!" className='text-white' >Register</a></p>


              </MDBTabsPane>

            </MDBTabsContent>

          </MDBContainer>


        </MDBCol>

      </MDBRow>



    </MDBContainer>
  );
}

export default App;