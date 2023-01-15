import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

import Sidebar from '../../MainComponents/Sidebar'
import IoTDevicePage from './IoTDevices/IoTDevicePage';
import IoTDevicesPage from './IoTDevices/IoTDevicesPage';

const Dashboard = () => {
  
  return (<>
    <Sidebar />
    
    <main className="bg-gray-light col px-0">
      <div className='logos flex flex-row justify-between flex-nowrap w-full'>
        <img className='w-28 h-28 m-4 rounded-tl-xl rounded-br-xl' src={`../../../../../images/helwan-logo.jpg`} alt='Hewlan Logo'/>
        <img className='w-32 h-32 m-4' src={`../../../../../images/owm-logo.png`} alt='OWM Logo'/>
      </div>

      <Switch>
        <Route path={`/admin/dashboard/IoTDevices/IoTDevice/:id`}>
          <IoTDevicePage />
        </Route>

        <Route path={`/admin/dashboard/IoTDevices/all`}>
          <IoTDevicesPage />
        </Route>

        <Redirect to={`/not-found`} />
      </Switch>
    </main>
  </>)
}

export default Dashboard

