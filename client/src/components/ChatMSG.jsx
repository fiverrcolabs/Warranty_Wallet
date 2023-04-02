
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({me,id,msg,userId}) {
    const navigate = useNavigate()
    return (
        <>
           {!me && <li id={id} className="d-flex  mb-4">
                <img src="https://www.seekpng.com/png/small/966-9665493_my-profile-icon-blank-profile-image-circle.png" alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                <div className="card">
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{userId}</p>
                        {/* <p className="text-muted small mb-0"><i className="far fa-clock"></i> 10 mins ago</p> */}
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                            ss{msg}
                        </p>
                    </div>
                </div>
            </li>}

           {me && <li id={id}  className="d-flex justify-content-between mb-4">
                <div className="card w-100">
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{userId}</p>
                        {/* <p className="text-muted small mb-0"><i className="far fa-clock"></i> 13 mins ago</p> */}
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                           {msg}
                        </p>
                    </div>
                </div>
                <img src="https://www.seekpng.com/png/small/966-9665493_my-profile-icon-blank-profile-image-circle.png" alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60" />
            </li>}

            </>
  

    );
}