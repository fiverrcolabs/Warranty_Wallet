import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import ChatMSG from '../components/ChatMSG'
import ChatLI from '../components/ChatLI'
import { TbCircleCheckFilled } from "react-icons/tb";

export default function App() {
  return (
    <div className='mainContainer container'>
      <div className='row'>

        <div className='col-8' >
          <h1 className='px-3'>Chat</h1>
        </div>
        <div className='col topBar'>
          <div className='topBarIcon'>
            {/* <MdLogout onClick={() => logOut()} className='clickable cursor-pointer' color={'red'} size={50} /> */}
          </div>
        </div>

      </div>



      <div class="row mt-3">

        <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
          <div class="card">
            <div class="card-body">

              <ul class="list-unstyled mb-0">
                <li class="p-2 border-bottom" style={{ backgroundColor: '#eee' }}>
                  <a href="#!" class="d-flex justify-content-between">
                    <div class="d-flex flex-row">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar"
                        class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                      <div class="pt-1">
                        <p class="fw-bold mb-0">John Doe</p>
                        <p class="small text-muted">Hello, Are you there?</p>
                      </div>
                    </div>
                    <div class="pt-1">
                      <p class="small text-muted mb-1">Just now</p>
                      <span class="badge bg-danger float-end">1</span>
                    </div>
                  </a>
                </li>

                <ChatLI />
                <ChatLI />

              </ul>

            </div>
          </div>

        </div>

        <div class="col-md-6 col-lg-7 col-xl-8 px-5">

          <ul class="list-unstyled">

            <ChatMSG />
            <ChatMSG />
            <ChatMSG />
            <ChatMSG />


            <li class="bg-white mb-3">
              <div class="form-outline">
                <textarea class="form-control" id="textAreaExample2" rows="4"></textarea>
                <label class="form-label" for="textAreaExample2">Message</label>
              </div>
            </li>
            <button type="button" class="btn btn-info btn-rounded float-end">Send</button>
          </ul>

        </div>

      </div>



    </div>
  );
}