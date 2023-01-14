import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { AdminContext } from '../../Context/AdminContext'

import LoginForm from './Components/LoginForm'
import Cookies from 'js-cookie'


const LoginPage = () => {
  const {admin} = useContext(AdminContext);
  const history = useHistory();
  useEffect(() => {
    // await getAdmin();
    if(Cookies.get('admin')) {
      history.replace(`/dashboard/IoTDevices/all`);
    }
  }, [])

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-nowrap md:flex-row flex-col h-screen mr-5'>
          <img src='../../../../../images/login-background.jpeg' className='md:w-3/5 w-full min-vh-100 my-auto block' />
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default LoginPage

