import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddUserPage from './AddUserPage';
import UpdateUserPage from './UpdateUserPage';
import AllUsersPage from './AllUsersPage';


const Users = () => {

  return (
    <Switch>
      <Route exact path={`/managementSystem/users/addUser`} >
        <AddUserPage />
      </Route>
      <Route exact path={`/managementSystem/users/editUser/:id`} >
        <UpdateUserPage />
      </Route>
      <Route exact path={`/managementSystem/users/all`}  >
        <AllUsersPage />
      </Route>
      
      <Redirect to={`/not-found`} />

    </Switch>
  )
}

export default Users

