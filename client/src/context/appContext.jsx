import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

import reducer from './reducer'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,

}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)



  // ----------------login-------------


  const displayAlert = () => {
    dispatch({ type: 'SHOW_ALERT' })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserToLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }

  const loginUser = async (currentUser) => {

    // console.log('a');
    // console.log('waiting...')
    // let delayres = await delay(5000);
    // console.log('b');

    console.log("login user function")

    dispatch({
      type: 'LOGIN_USER_BEGIN'
    })

    const { data } = await axios.post('/api/v1/auth/login', currentUser)
      .catch(function (error) {
        console.log(error.message);
        toast.error(error.message);
        dispatch({
          type: 'LOGIN_USER_ERROR'
        })
      });
    await console.log(data)

    const { user, token } = data
    dispatch({
      type: 'LOGIN_USER_SUCCESS',
      payload: {
        user,
        token,
      },
    })
    toast.success("LOGIN SUCCESS");
    // local storage
    addUserToLocalStorage({
      user,
      token,
    })


    // clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' })
    removeUserToLocalStorage()
  }




  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        logoutUser,

      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }