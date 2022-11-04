import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddCarModelPage from './AddCarModelPage';
import UpdateCarModelPage from './UpdateCarModelPage';
import AllCarModelsPage from './AllCarModelsPage';


const CarModels = ({ current_lang }) => {
  
  return (
    <Switch>

      <Route exact path={`/${current_lang}/managementSystem/carModels/all`}  >
        <AllCarModelsPage /> 
      </Route>

      <Route path={`/${current_lang}/managementSystem/carModels/addCarModel`} >
        <AddCarModelPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/carModels/editCarModel/:id`} >
        <UpdateCarModelPage />
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default CarModels
