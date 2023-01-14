import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import { UserContext } from '../Context/UserContext';

const UserProtected = ({children}) => {
  const { getUser, } = useContext(UserContext);

  const history = useHistory();
  useEffect(async() => {
    if(Cookies.get('user')) {
      await getUser();
      console.log('protected');
      console.log(JSON.parse(Cookies.get('user')).email);
    } else {
      history.replace(`/login`);
    }
  }, [])

  return (
    <>
      { Cookies.get('user') && (
        <>{children}</>
      )} 
    </>
  )
}

export default UserProtected
