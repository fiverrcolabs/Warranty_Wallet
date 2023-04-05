import React from 'react';
import profileImg from '../assets/defaultimg.png';
import { TbCircleCheckFilled } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";

// RiCloseCircleFill

export default function Friend({accept,reject, company,userId,email}) {
    return (
        <div className="container bcontent">
           
            <div className="card m-auto " >
                <div className="row ">
                    <div className="col-5">
                        <img className="card-img" src={profileImg} alt="Card Image"/>
                    </div>
                    <div className="col-7">
                        <div className="card-body" id={userId}>
                            <h6 className="card-title"><strong>Email: </strong>{email}</h6>
                            <h6 className="card-title"><strong>Company: </strong>{company}</h6>
                            <TbCircleCheckFilled onClick={accept}   size={40} className='clickable cursor-pointer'  color={'green'}/> 
                            <RiCloseCircleFill onClick={reject}  size={40}  className='clickable cursor-pointer' color={'red'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}