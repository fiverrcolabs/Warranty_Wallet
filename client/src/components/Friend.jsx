import React from 'react';
import profileImg from '../assets/defaultimg.png';

export default function Friend({sendRequest,company,userId,id,available,hide,email}) {
    return (
        <div className="container bcontent">
           
            <div className="card m-auto " >
                <div className="row ">
                    <div className="col-5">
                        <img className="card-img" src={profileImg} alt="Card Image"/>
                    </div>
                    <div className="col-7">
                        <div className="card-body">
                            <h6 className="card-title"><strong>Email: </strong>{email}</h6>
                            <h6 className="card-title"><strong>Company: </strong>{company}</h6>
                            <button hidden={hide} disabled={available? !available(userId):false} id={userId} href="#" onClick={sendRequest} className="btn btn-primary btn-sm">Send request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}