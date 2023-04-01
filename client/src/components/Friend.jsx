import React from 'react';
import profileImg from '../assets/defaultimg.png';

export default function Friend({sendRequest,company,userId,id,available}) {
    return (
        <div className="container bcontent">
           
            <div className="card m-auto " >
                <div className="row ">
                    <div className="col-5">
                        <img className="card-img" src={profileImg} alt="Card Image"/>
                    </div>
                    <div className="col-7">
                        <div className="card-body">
                            <h6 className="card-title">{company}</h6>
                            <button disabled={available? !available(id):false} id={userId} href="#" onClick={sendRequest} className="btn btn-primary btn-sm">Send request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}