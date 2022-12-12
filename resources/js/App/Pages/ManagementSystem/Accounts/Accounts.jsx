import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddAccountPage from './AddAccountPage';
import UpdateAccountPage from './UpdateAccountPage';
import AllAccountsPage from './AllAccountsPage';


const Accounts = () => {
  
  return (
    <Switch>
      <Route exact path={`/managementSystem/accounts/addAccount`} >
        <AddAccountPage />
      </Route>
      <Route exact path={`/managementSystem/accounts/editAccount/:id`} >
        <UpdateAccountPage />
      </Route>
      <Route exact path={`/managementSystem/accounts/all`}  >
        <AllAccountsPage />
      </Route>
      
      <Redirect to={`/not-found`} />
    </Switch>
  )
}

export default Accounts

