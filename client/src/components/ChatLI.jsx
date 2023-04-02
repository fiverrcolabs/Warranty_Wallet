


import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({ id, currentListItem,clickListItem  }) {
    const navigate = useNavigate()
    // console.log(id,currentListItem)
    return (

        <li id={id} onClick={clickListItem} className="p-2 border-bottom"
            style={{
                backgroundColor: id===currentListItem ? '#eee' : '#FFFFFF'
            }}>
            <a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row">
                    <img src="https://www.seekpng.com/png/small/966-9665493_my-profile-icon-blank-profile-image-circle.png" alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                    <div className="pt-1">
                        <p className="fw-bold mb-0 cardName">{id}</p>
                        <p className="small text-muted cardName">claim id</p>
                    </div>
                </div>
           
            </a>
        </li>




    );
}