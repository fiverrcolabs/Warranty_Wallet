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
  const [warranties, setWarranties] = useState([])
  const [friends, setFriends] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [receivedRequests, setReceivedRequests] = useState([])
  const [frienddata, setFrienddata] = useState({
    friendsCount: "-",
    sentRequestsCount: "-",
    receivedRequestsCount: "-",
  })

  const [data1, setData1] = useState({
    labels: [
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',

      ],
      hoverOffset: 4
    }]
  })
  const [data3, setData3] = useState({
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
    ],
  })

  const [data4, setData4] = useState({
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
    ],
  })

  const USER = {
    MANUFACTURER: "MANUFACTURER",
    RETAILER: "RETAILER",
    CONSUMER: "CONSUMER"
  }



  useEffect(() => {
    async function fetchData() {
      try {
        const claimsData = await axiosFetch.get('/claim/getAllClaims')
        setClaims(claimsData.data)
        const warrantyData = await axiosFetch.get('/warranty/getAllWarranties')
        setWarranties(warrantyData.data)
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



  useEffect(() => {
    async function fetchData() {
      try {
        const claimStatesdata1 = {
          labels: [
            'NEW',
            'COMPLETED',
            'IN PROGRESS'
          ],
          datasets: [{
            label: '',
            data: [getClaimsAndCompletionRate().NEW ? getClaimsAndCompletionRate().NEW : 0, getClaimsAndCompletionRate().COMPLETED ? getClaimsAndCompletionRate().COMPLETED : 0, getClaimsAndCompletionRate().IN_PROGRESS ? getClaimsAndCompletionRate().IN_PROGRESS : 0],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',

            ],
            hoverOffset: 4
          }]
        };

        const highestClaim = {
          labels: getHighestClaimProducts().claimProductIdNames,
          datasets: [
            {
              label: "Highest Claim Products",
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              borderColor: "rgb(255, 99, 132)",
              data: getHighestClaimProducts().claimProductIdCounts,
            },
          ],
        };

        const linechartdata = {
          labels: customerWarrantyRegistrationCountByMonthBackN(6).labels,
          datasets: [
            {
              label: "",
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              borderColor: "rgb(255, 99, 132)",
              data: customerWarrantyRegistrationCountByMonthBackN(6).data,
            },
          ],
        };

        setData4(linechartdata)
        setData3(highestClaim)
        setData1(claimStatesdata1)
        setFrienddata(friendsSummary())

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [claims, friends, sentRequests, receivedRequests, warranties])

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

  const customerWarrantyRegistrationCountByMonthBackN = (n) => {
    const now = new Date();
    const interval = 1; // interval in months
    const warrantyRegistrationCount = {};
    for (let i = 0; i < n; i += interval) {
      const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const endDate = new Date(now.getFullYear(), now.getMonth() - i + interval, 0);
      warrantyRegistrationCount[startDate.toISOString().split('T')[0]] = warranties.filter((warranty) => {
        const purchaseDate = new Date(warranty.purchaseDate);
        return purchaseDate >= startDate && purchaseDate <= endDate && warranty.issuerId;
      }).length;
    }
    // return warrantyRegistrationCount;

    return {
      //get kesy inside object
      labels: Object.keys(warrantyRegistrationCount),
      //get values as a array inside object
      data: Object.values(warrantyRegistrationCount)


    }
  }

  return (
    <div className=" mainContainer container">
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
              <Line options={{
                responsive: true, maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Customer Warranty Registration Chart'
                  },
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    ticks: {
                      stepSize: 10,
                      beginAtZero: true,
                    },
                  },
                }
              }} data={data4} />
            </div>

            <div className='col-md-4 col-sm-12 ms-auto p-3 chartBox shadow '>
              <Doughnut options={{
                responsive: true, maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Claims Status Overview'
                  }
                }
              }} data={data1} />
            </div>

          </div>
          <div className='row mt-3 chartBox'>

            <div className='col-md-5 col-sm-12 p-3 shadow chartBox'>
              <Pie options={{
                responsive: true, maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Highest Claim Products'
                  }
                }
              }} data={data3} />
            </div>

            <div className='col-md-6 col-sm-12 p-3 ms-auto shadow' >
              <h6 className="mt-4">Connection Status</h6>
              <div className="input-group mt-3 mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Approved    :</span>
                </div>
                <input disabled type="text" className="form-control border border-info" placeholder={frienddata.friendsCount} aria-label="Username" aria-describedby="basic-addon1" />

              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Received Requests</span>
                </div>
                <input disabled type="text" className="form-control  border border-info" placeholder={frienddata.receivedRequestsCount} aria-label="Username" aria-describedby="basic-addon1" />

              </div>


              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Sent Requests</span>
                </div>
                <input disabled type="text" className="form-control border border-info" placeholder={frienddata.sentRequestsCount} aria-label="Username" aria-describedby="basic-addon1" />

              </div>


            </div>


          </div>

        </div>


      </div>
    </div>

  )
}

export default DashBoard