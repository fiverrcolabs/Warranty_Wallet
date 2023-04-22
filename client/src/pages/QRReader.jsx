import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { QrReader } from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'
import jsQR from "jsqr";



function QRscanner() {
    const navigate = useNavigate();
    const [qrscan, setQrscan] = useState('No result');
    const [selected, setSelected] = useState("environment");
    const [startScan, setStartScan] = useState(false);

    const closeCam = async () => {
        navigate('/warranty')
        // const stream = await navigator.mediaDevices.getUserMedia({
        //     audio: false,
        //     video: true,
        // });
        window.location.reload()
    };

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                const context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                const imageData = context.getImageData(0, 0, image.width, image.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    console.log("QR code detected:", code.data);
                    setQrscan(code.data);
                } else {
                    console.log("No QR code detected.");
                }
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    }

    return (


        <div className="popup container">

            <div className='firstPageProducts container'>
                <div className='row'>

                    <div className='col-8' >
                        <h1 className='px-3'>QR Scanner</h1>
                    </div>

                    <div className='col topBar'>
                        <div className='topBarIcon'>
                            <MdOutlineCancel onClick={() => closeCam()} className='clickable cursor-pointer' size={40} />
                        </div>

                    </div>

                </div>

                <div className='secondPageProducts container' >

                    <div >
                        <div className='mx-auto rounded' style={{ width: 300 }}>
                            {/* <select onChange={(e) => setSelected(e.target.value)}>
                                <option value={"environment"}>Back Camera</option>
                                <option value={"user"}>Front Camera</option>
                            </select> */}
                            <QrReader
                                onResult={(result, error) => {
                                    if (!!result) {
                                        setQrscan(result?.text);
                                    }

                                    if (!!error) {
                                        console.info(error);
                                    }
                                }}
                                style={{ width: "200px" }}
                                constraints={{ facingMode: 'environment' }}

                            />
                        </div>

                        <div className='mx-auto text-center'>
                            <h4>or</h4>
                            <input className="form-control" type="file" id="formFile" onChange={handleFileUpload} />

                        </div>

                    </div>



                    <div class="input-group mb-3 mt-3">
                        <input disabled type="text" class="form-control form-control-lg border border-info " placeholder={qrscan} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        {/* <button onClick={() => navigate({ qrscan })} class="btn btn-outline-info clickable" id="basic-addon2">Add</button> */}

                        <a
                            class="btn btn-outline-info clickable"
                            id="basic-addon2"
                            href={qrscan}
                            target="_blank"
                            rel="noreferrer"
                        >Go..
                        </a>
                    </div>


                </div>




            </div>

        </div>
    );
}

export default QRscanner;
