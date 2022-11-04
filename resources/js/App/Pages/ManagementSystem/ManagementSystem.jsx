import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import Sidebar from '../../MainComponents/Sidebar';
import Accounts from './Accounts/Accounts';
import CarModels from './CarModels/CarModels';
import Categories from './Categories/Categories';
import Products from './Products/Products';
import ServiceProviders from './ServiceProviders/ServiceProviders';
import Users from './Users/Users';


const ManagementSystem = ({ current_lang }) => {

  return (
    <div className="row flex-nowrap w-full mx-0">
      <Sidebar current_lang={current_lang}/>
      <main className="bg-gray-light col px-0">
          <div className='float-right mr-14 w-40 h-44 pt-10 d-inline-block'>
            <img src={`../../../../public/images/fehu-logo.jpg`} className="rounded-2xl d-block" />
          </div>
          <div className='clear-both'></div>
        <Switch>
          <Route path={`/${current_lang}/managementSystem/carModels`} >
            <CarModels current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/categories`} >
            <Categories current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/Products`} >
            <Products current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/serviceProviders`} >
            <ServiceProviders current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/users`} >
            <Users current_lang={ current_lang } />
          </Route>

          <Route path={`/${current_lang}/managementSystem/accounts`} >
            <Accounts current_lang={ current_lang } />
          </Route>

          <Redirect to={`/${current_lang}/not-found`} />
        </Switch>
      </main>
    </div>
  )
}

export default ManagementSystem

