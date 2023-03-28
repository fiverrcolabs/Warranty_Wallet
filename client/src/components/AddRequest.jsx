import React from 'react';
import profileImg from '../assets/defaultimg.png';
import { TbCircleCheckFilled } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";

// RiCloseCircleFill

export default function Friend({company}) {
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
                        
                            <TbCircleCheckFilled size={40} className='clickable cursor-pointer' color={'green'}/>
                            <RiCloseCircleFill size={40}  className='clickable cursor-pointer' color={'red'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}