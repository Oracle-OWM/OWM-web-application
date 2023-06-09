import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import AddIoTDevicePage from './AddIoTDevicePage';
import UpdateIoTDevicePage from './UpdateIoTDevicePage';
import AllIoTDevicesPage from './AllIoTDevicesPage';


const IoTDevices = () => {

  return (
    <Switch>
      <Route exact path={`/admin/managementSystem/IoTDevices/all`}  >
        <AllIoTDevicesPage />
      </Route>

      <Route path={`/admin/managementSystem/IoTDevices/addIoTDevice`} >
        <AddIoTDevicePage />
      </Route>

      <Route exact path={`/admin/managementSystem/IoTDevices/editIoTDevice/:id`} >
        <UpdateIoTDevicePage />
      </Route>

      <Redirect to={`/not-found`} />

    </Switch>
  )
}

export default IoTDevices
