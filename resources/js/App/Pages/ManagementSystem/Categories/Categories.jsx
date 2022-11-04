import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddCategoryPage from './AddCategoryPage';
import UpdateCategoryPage from './UpdateCategoryPage';
import AllCategoriesPage from './AllCategoriesPage';


const Categories = ({ current_lang }) => {

  return (
    <Switch>
      <Route exact path={`/${current_lang}/managementSystem/categories/all`}  >
        <AllCategoriesPage />
      </Route>

      <Route path={`/${current_lang}/managementSystem/categories/addCategory`} >
        <AddCategoryPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/categories/editCategory/:id`} >
        <UpdateCategoryPage />
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default Categories
