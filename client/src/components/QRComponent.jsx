import React from 'react';

export default function App({qr ,itemId}) {
    return (
        <div className="qrcard">
            <img src={qr?qr:""} className="card-img-top" alt="QR not valied" />

        </div>
    );
}