import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import AddProductPage from './AddProductPage';
import UpdateProductPage from './UpdateProductPage';
import AllProductsPage from './AllProductsPage';


const Products = ({ current_lang }) => {

  return (
    <Switch>
      <Route exact path={`/${current_lang}/managementSystem/products/all`}  >
        <AllProductsPage />
      </Route>

      <Route path={`/${current_lang}/managementSystem/products/addProduct`} >
        <AddProductPage />
      </Route>

      <Route exact path={`/${current_lang}/managementSystem/products/editProduct/:id`} >
        <UpdateProductPage />
      </Route>

      <Redirect to={`/${current_lang}/not-found`} />

    </Switch>
  )
}

export default Products
