import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

import IoTDevicePage from './IoTDevices/IoTDevicePage';
import IoTDevicesPage from './IoTDevices/IoTDevicesPage';

const UserDashboard = () => {
  
  return (<>
    
    <main className="bg-gray-light col px-0">
      <div className='logos flex flex-row justify-between flex-nowrap w-full'>
        <img className='w-24 h-24 m-4' src={`../../../../../images/helwan-logo.png`} alt='Hewlan Logo'/>
        <img className='w-24 h-24 m-4' src={`../../../../../images/owm-logo.jpg`} alt='OWM Logo'/>
      </div>

      <Switch>
        <Route path={`/user/dashboard/IoTDevices/IoTDevice/:id`}>
          <IoTDevicePage />
        </Route>

        <Route path={`/user/dashboard/IoTDevices/all`}>
          <IoTDevicesPage />
        </Route>

        <Redirect to={`/not-found`} />
      </Switch>
    </main>
  </>)
}

export default UserDashboard

