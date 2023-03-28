import React from 'react';
import ReactLoading from 'react-loading';

const Loader = ({ type, color, height, width }) => (

    <div className='mainContainer'>

        <ReactLoading className='loader' height={60} width={300} type={"cylon"} color={"#19A7CE"} />

    </div>
);

export default Loader;