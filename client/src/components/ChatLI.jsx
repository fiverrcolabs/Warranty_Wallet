


import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({id}) {
    const navigate = useNavigate()
    return (

        <li id={id} class="p-2 border-bottom">
            <a href="#!" class="d-flex justify-content-between">
                <div class="d-flex flex-row">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" alt="avatar"
                        class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                    <div class="pt-1">
                        <p class="fw-bold mb-0">Ashley Olsen</p>
                        <p class="small text-muted">Lorem ipsum dolor sit.</p>
                    </div>
                </div>
                <div class="pt-1">
                    <p class="small text-muted mb-1">Yesterday</p>
                </div>
            </a>
        </li>




    );
}