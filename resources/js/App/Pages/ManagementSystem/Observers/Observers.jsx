import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddObserverPage from './AddObserverPage';
import UpdateObserverPage from './UpdateObserverPage';
import AllObserversPage from './AllObserversPage';


const Observers = () => {
  
  return (
    <Switch>


      <Route exact path={`/managementSystem/observers/all`}  >
        <AllObserversPage /> 
      </Route>

      <Route path={`/managementSystem/observers/addObserver`} >
        <AddObserverPage />
      </Route>

      <Route exact path={`/managementSystem/observers/editObserver/:id`} >
        <UpdateObserverPage />
      </Route>

      <Redirect to={`/not-found`} />

    </Switch>
  )
}

export default Observers
