import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import Sidebar from '../../MainComponents/Sidebar';
import Accounts from './Accounts/Accounts';
import IoTDevices from './IoTDevices/IoTDevices';
import Users from './Users/Users';


const ManagementSystem = () => {

  return (
    <div className="row flex-nowrap w-full mx-0">
      <Sidebar />
      <main className="bg-gray-light col px-0">
          <div className='logos flex flex-row justify-between flex-nowrap w-full'>
            <img className='w-28 h-28 m-4 rounded-tl-xl rounded-br-xl' src={`../../../../../images/helwan-logo.jpg`} alt='Hewlan Logo'/>
            <img className='w-32 h-32 m-4' src={`../../../../../images/owm-logo.png`} alt='OWM Logo'/>
          </div>
          <div className='clear-both'></div>
        <Switch>
          <Route path={`/admin/managementSystem/IoTDevices`} >
            <IoTDevices  />
          </Route>

          <Route path={`/admin/managementSystem/users`} >
            <Users  />
          </Route>

          <Route path={`/admin/managementSystem/accounts`} >
            <Accounts  />
          </Route>

          <Redirect to={`/not-found`} />
        </Switch>
      </main>
    </div>
  )
}

export default ManagementSystem

