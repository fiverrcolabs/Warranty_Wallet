import React from 'react';
import profileImg from '../assets/defaultimg.png';

export default function Friend() {
    return (
        <div class="container bcontent">
           
            <div class="card m-auto " >
                <div class="row ">
                    <div class="col-5">
                        <img class="card-img" src={profileImg} alt="Card Image"/>
                    </div>
                    <div class="col-7">
                        <div class="card-body">
                            <h6 class="card-title">Suresh Dasari</h6>
                            <a href="#" class="btn btn-primary btn-sm">Send request</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}