import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddServiceProviderPage from './AddServiceProviderPage';
import UpdateServiceProviderPage from './UpdateServiceProviderPage';
import AllServiceProvidersPage from './AllServiceProvidersPage';


const ServiceProviders = ({ current_lang }) => {
  
  return (
    <Switch>


      <Route exact path={`/${current_lang}/managementSystem/serviceProviders/all`}  >
        <AllServiceProvidersPage /> 
      </Route>

      <Route path={`/${current_lang}/managementSystem/serviceProviders/addServiceProvider`} >
        <AddServiceProviderPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/serviceProviders/editServiceProvider/:id`} >
        <UpdateServiceProviderPage />
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default ServiceProviders
