import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from '../../../MainComponents/Footer';
import Navbar from '../../../MainComponents/Navbar';

import IoTDevicesPage from './IoTDevices/IoTDevicesPage';

const UserDashboard = () => {
  
  return (<>
    <main className="bg-gray-light mt- col px-0">
      <Navbar />

      <div className='logos flex flex-row justify-between flex-nowrap w-full'>
      </div>

      <Switch>
        <Route path={`/dashboard/IoTDevices/all`}>
          <IoTDevicesPage />
        </Route>

        <Redirect to={`/not-found`} />
      </Switch>

      <Footer />
    </main>
  </>)
}

export default UserDashboard

