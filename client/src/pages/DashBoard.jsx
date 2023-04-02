import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import React from 'react';
import Chart from "chart.js/auto";
import { useAppContext } from '../context/appContext'
import { Line, Pie, Doughnut } from "react-chartjs-2";
// import {faker} from 'faker';


function DashBoard() {
  const navigate = useNavigate()
  const { axiosFetch, user } = useAppContext()

  const [claims, setClaims] = useState([])
  const [friends, setFriends] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [receivedRequests, setReceivedRequests] = useState([])

  const USER = {
    MANUFACTURER: "MANUFACTURER",
    RETAILER: "RETAILER",
    CONSUMER: "CONSUMER"
  }

  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  const data2 = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const claimsData = await axiosFetch.get('/claim/getAllClaims')
        setClaims(claimsData.data)
        if (user.role === USER.RETAILER) {
          const manufacturerFriendsData = await axiosFetch.get('/retailer/manufacturerFriends')
          setFriends(manufacturerFriendsData.data.manufacturerFriends)
          const manufacturerRequestsData = await axiosFetch.get('/retailer/manufacturerRequests')
          setReceivedRequests(manufacturerRequestsData.data)
          const retailerSentRequestsData = await axiosFetch.get('/retailer/getRetailerSentRequests')
          setSentRequests(retailerSentRequestsData.data)
        } else if (user.role === USER.MANUFACTURER) {
          const retailerFriendsData = await axiosFetch.get('/manufacturer/retailerFriends')
          setFriends(retailerFriendsData.data.retailerFriends)
          const retailerRequestsData = await axiosFetch.get('/manufacturer/retailerRequests')
          setReceivedRequests(retailerRequestsData.data)
          const manufacturerSentRequestsData = await axiosFetch.get('/manufacturer/getManufacturerSentRequests')
          setSentRequests(manufacturerSentRequestsData.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const getHighestClaimProducts = () => {
    const productIdCounts = {};
    const productIdNames = {};

    claims.forEach(claim => {
      const productId = claim.warrantyId.itemId.productId._id;
      const productName = claim.warrantyId.itemId.productId.productName;

      if (!productIdCounts[productId]) {
        productIdCounts[productId] = 1;
        productIdNames[productId] = productName;
      } else {
        productIdCounts[productId]++;
      }
    });

    return { claimProductIdNames: Object.values(productIdNames), claimProductIdCounts: Object.values(productIdCounts) }
  }

  const getClaimsAndCompletionRate = () => {
    const statusCounts = {};

    claims.forEach(claim => {
      if (!statusCounts[claim.status]) {
        statusCounts[claim.status] = 1;
      } else {
        statusCounts[claim.status]++;
      }
    });

    return statusCounts
  }

  const friendsSummary = () => {
    
    return {
      friendsCount: friends.length,
      sentRequestsCount: sentRequests.length,
      receivedRequestsCount: receivedRequests.length,
    }
  }

  return (
    <div className=" mainContainer container">
      {console.log(friendsSummary())}
      <div className='firstPageProducts container'>
        <div className='row'>

          <div className='col-8' >
            <h1 className='px-3'>Dashboard</h1>
          </div>



          <div className='col topBar'>
            <div className='topBarIcon'>
              <FaUserCircle onClick={() => navigate('/profile')} className='clickable cursor-pointer' size={40} />
            </div>

          </div>



        </div>

        <div className='secondPageProducts container px-5' >

          <div className='row pb-3 chartBox'>

            <div className='col-md-7 col-sm-12 shadow' >

              <Line options={{ responsive: true, maintainAspectRatio: false }} data={data} />
            </div>



            <div className='col-md-4 col-sm-12 ms-auto p-3 chartBox shadow '>
              {/* <div className=''> */}
              <Doughnut options={{ responsive: true, maintainAspectRatio: false }} data={data2} />
              {/* </div> */}

            </div>





          </div>
          <div className='row mt-3 chartBox'>

            <div className='col-md-5 col-sm-12 p-3 shadow chartBox'>
              {/* <div className=''> */}
              <Pie options={{ responsive: true, maintainAspectRatio: false }} data={data} />
              {/* </div> */}

            </div>

            <div className='col-md-6 col-sm-12 p-3 ms-auto shadow' >

              <Line options={{ responsive: true, maintainAspectRatio: false }} data={data} />
            </div>


          </div>

        </div>


      </div>
    </div>

  )
}

export default DashBoard