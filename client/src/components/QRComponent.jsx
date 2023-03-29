import React from 'react';

export default function App({qr ,itemId}) {
    return (
        <div className="qrcard">
            <img src={qr?qr:"https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"} className="card-img-top" alt="Fissure in Sandstone" />

        </div>
    );
}