import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  MDBInput,
  MDBCheckbox,
  MDBCol, MDBRow
}
  from 'mdb-react-ui-kit';

function Login() {
  const USER = {
    MANUFACTURER: "MANUFACTURER",
    RETAILER: "RETAILER",
    CONSUMER: "CONSUMER"
  }
  const navigate=useNavigate()
  const [userType, setJustifyActive] = useState(USER.MANUFACTURER);
  const { login, isLoading,user } = useAppContext();
  
  useEffect(() => {
    if (user) {
        navigate('/dashboard')
    }
  }, [user, navigate])

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

    console.log(email, password, userType)

    if (!email || !password || !userType) {
      console.log("all field required")
      toast.warn('all field required')
      return
    }

    login({ email, password, userType })

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

          <MDBContainer className="p-0 my-5 d-flex flex-column w-75 rounded-bottom boxShadow">

            <MDBTabs pills justify className='mb-0 d-flex flex-row justify-content-between'>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0  colorBlue' onClick={() => handleJustifyClick(USER.MANUFACTURER)} active={userType === USER.MANUFACTURER}>
                  Manufacturer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0  colorBlue' onClick={() => handleJustifyClick(USER.RETAILER)} active={userType === USER.RETAILER}>
                  Retailer
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink className='rounded-0   colorBlue' onClick={() => handleJustifyClick(USER.CONSUMER)} active={userType === USER.CONSUMER}>
                  Consumer
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent className='bg-gradient text-white rounded-bottom colorBlue '>

              <MDBTabsPane className='p-5 pt-5' show={userType === USER.MANUFACTURER}>
                <form className='form-login' onSubmit={onSubmit}>


                  <MDBInput wrapperClass='mb-4' label='Email address' id='form11' type='email' name='email' size="lg" />
                  <MDBInput wrapperClass='mb-4' label='Password' id='form22' type='password' name='password' size="lg" />


                  <button className={isLoading ? "btn mb-4 w-100 loginButton disabled" : "btn mb-4 w-100 loginButton"} > {isLoading ? "Loading..." : "Sign in"} </button>
                  <p className="text-center">Not a member? <a href={'/register'} className='text-white' >Register</a></p>
                </form>

              </MDBTabsPane>

              <MDBTabsPane className='p-5 pt-5' show={userType === USER.RETAILER}>

                <form className='form-login' onSubmit={onSubmit}>


                  <MDBInput wrapperClass='mb-4' label='Email address' id='form13' type='email' name='email' size="lg" />
                  <MDBInput wrapperClass='mb-4' label='Password' id='form24' type='password' name='password' size="lg" />


                  <button className={isLoading ? "btn mb-4 w-100 loginButton disabled" : "btn mb-4 w-100 loginButton"} > {isLoading ? "Loading..." : "Sign in"} </button>
                  <p className="text-center">Not a member? <a href={'/register'} className='text-white' >Register</a></p>
                </form>

              </MDBTabsPane>

              <MDBTabsPane className='p-5 pt-5' show={userType === USER.CONSUMER}>

                <form className='form-login' onSubmit={onSubmit}>


                  <MDBInput wrapperClass='mb-4' label='Email address' id='form15' type='email' name='email' size="lg" />
                  <MDBInput wrapperClass='mb-4' label='Password' id='form26' type='password' name='password' size="lg" />


                  <button className={isLoading ? "btn mb-4 w-100 loginButton disabled" : "btn mb-4 w-100 loginButton"} > {isLoading ? "Loading..." : "Sign in"} </button>
                  <p className="text-center">Not a member? <a href={'/register'} className='text-white' >Register</a></p>
                </form>

              </MDBTabsPane>

            </MDBTabsContent>

          </MDBContainer>


        </MDBCol>

      </MDBRow>



    </MDBContainer>
  );
}

export default Login;