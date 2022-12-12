import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import AddIoTDevicePage from './AddIoTDevicePage';
import UpdateIoTDevicePage from './UpdateIoTDevicePage';
import AllIoTDevicesPage from './AllIoTDevicesPage';
import ShowIoTDeviceReadings from './ShowIoTDeviceReadings';


const IoTDevices = () => {

  return (
    <Switch>
      <Route exact path={`/managementSystem/IoTDevices/all`}  >
        <AllIoTDevicesPage />
      </Route>

      <Route exact path={`/managementSystem/IoTDevices/showIoTDeviceReadings/:id`} >
        <ShowIoTDeviceReadings />
      </Route>

      <Route path={`/managementSystem/IoTDevices/addIoTDevice`} >
        <AddIoTDevicePage />
      </Route>

      <Route exact path={`/managementSystem/IoTDevices/editIoTDevice/:id`} >
        <UpdateIoTDevicePage />
      </Route>

      <Redirect to={`/not-found`} />

    </Switch>
  )
}

export default IoTDevices
