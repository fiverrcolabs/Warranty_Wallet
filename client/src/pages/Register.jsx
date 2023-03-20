import React, { useState } from 'react';
// import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
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
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow >
        <h1 className='mx-5 mb-5'>Warranty Wallet ($)</h1>

        <MDBCol col='10' md='6' >
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className='img-fluid' alt="Sample image" />
        </MDBCol>

        <MDBCol col='10' md='6'>

          <MDBContainer className="p-0 my-5 d-flex flex-column w-75 h-75">

            <MDBTabs pills justify className='mb-0 d-flex flex-row justify-content-between'>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0 border border-primary ' onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                  customer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0 border border-primary' onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                  retailer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0 border border-primary' onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
                  seller
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent className='bg-primary bg-gradient text-white rounded-bottom'>

              <MDBTabsPane className='p-3 pt-5' show={justifyActive === 'tab1'}>


                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

                {/* <div className="d-flex justify-content-between mx-4 mb-4">
                                 
                                </div> */}

                <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                <p className="text-center">Not a member? <a href="#!" className='text-white' >Register</a></p>

              </MDBTabsPane>

              <MDBTabsPane className='p-3 pt-5' show={justifyActive === 'tab2'}>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

                {/* <div className="d-flex justify-content-between mx-4 mb-4">
                                 
                                </div> */}

                <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                <p className="text-center">Not a member? <a href="#!" className='text-white' >Register</a></p>


              </MDBTabsPane>

              <MDBTabsPane className='p-3 pt-5' show={justifyActive === 'tab3'}>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />


                <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
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