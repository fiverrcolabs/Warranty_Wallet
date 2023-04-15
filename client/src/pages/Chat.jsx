import React from "react";
import { FaUserCircle } from "react-icons/fa";
import ChatMSG from '../components/ChatMSG'
import ChatLI from '../components/ChatLI'
import { TbCircleCheckFilled } from "react-icons/tb";
import Loader from '../components/Loader'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify'

export default function App() {

  const navigate = useNavigate()
  const { axiosFetch, user } = useAppContext()
  const [claims, setClaims] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentListItem, setCurrentListItem] = useState()
  const [claimArray, setClaimArray] = useState([])
  const [msgArray, setMsgArray] = useState([])
  const [formData, setFormData] = useState({
    claimId: '',
    userId: user._id,
    msg: ''
  });



  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await axiosFetch.get('/claim/getAllClaims')
        setClaimArray(fetchedProducts.data)
        console.log(fetchedProducts.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg)
      }

    }
    fetchData();
  }, [msgArray])

  const sendMsg = async (event) => {
    event.preventDefault();
    console.log(formData)
    try {
      const createdProduct = await axiosFetch.post('/chat/saveChat', {
        ...formData,
      })
      console.log(createdProduct);
      const chatData = await axiosFetch.get(`/chat/getChatByClaimId?claimId=${formData.claimId}`)
      console.log(chatData.data);
      setMsgArray(chatData.data ? chatData.data.chats : [])
      toast.success("msg sent Successfully")

    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)

    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const clickListItem = async (e) => {
    const claimId = e.currentTarget.id

    e.preventDefault();
    setCurrentListItem(claimId)
    setFormData((prevState) => ({
      ...prevState,
      claimId: claimId
    }))
    try {
      const chatData = await axiosFetch.get(`/chat/getChatByClaimId?claimId=${claimId}`)
      console.log(chatData.data);
      setMsgArray(chatData.data ? chatData.data.chats : [])


    } catch (error) {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)

    }
  }

  if (isLoading) {
    return (
        <Loader />
    )
}

  return (
    <div className='mainContainer container'>
      <div className='row'>

        <div className='col-8' >
          <h1 className='px-3'>Chat</h1>
        </div>
        <div className='col topBar'>
          <div className='topBarIcon'>
            <FaUserCircle onClick={() => navigate('/profile')} className='clickable cursor-pointer'  size={50} />
          </div>
        </div>

      </div>

      <div className="row mt-3">

        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
          <div className="card">
            <div className="card-body">

              <ul className="list-unstyled mb-0">
                {claimArray.map((claim) => (

                  <ChatLI key={claim._id} id={claim._id} currentListItem={currentListItem} clickListItem={clickListItem} />

                ))}
              </ul>

            </div>
          </div>

        </div>

        <div className="col-md-6 col-lg-7 col-xl-8 px-5">

          <ul className="list-unstyled">

            {msgArray.map((msg) => (
              <ChatMSG key={msg._id} userId={msg.userId} me={msg.userId === user._id} msg={msg.msg} id={msg._id} />
            ))}

            <li className="bg-white ">
              <div className="form-outline">
                <textarea name="msg" onChange={handleChange} className="form-control" id="textAreaExample2" rows="3"></textarea>
                <label className="form-label" htmlFor="textAreaExample2">Message</label>
              </div>
            </li>
            <button onClick={sendMsg} type="button" className="btn btn-info btn-rounded float-end">Send</button>
          </ul>

        </div>

      </div>



    </div>
  );
}