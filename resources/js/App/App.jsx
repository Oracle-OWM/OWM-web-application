import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { CMSState } from './Context/CMSContext';

import '../../css/app.css';
import Protected from './MainComponents/Protected';
import NotFound from './MainComponents/NotFound';
import LoginPage from './Pages/Login/LoginPage';
import ManagementSystem from './Pages/ManagementSystem/ManagementSystem';

import { AlertState } from './Context/AlertContext';
import { SearchState } from './Context/SearchContext';
import { GeneralState } from './Context/GeneralContext';
import { AdminContext, AdminState } from './Context/AdminContext';
import { AccountsState } from './Context/AccountsContext';
import { CarModelState } from './Context/CarModelContext';
import { CategoryState } from './Context/CategoryContext';
import { UserState } from './Context/UserContext';
import { ProductState } from './Context/ProductContext';
import { ServiceProviderState } from './Context/ServiceProviderContext';


function App() {
  const {setAuth, auth} = useContext(AdminContext);


  return (
    <>
      {console.log(JSON.parse($supportedLocales))}
      <div className='flex flex-col w-full'>
        {/* <Navbar/> */}
        <div className="flex flex-nowrap flex-row w-full mx-0">
          <Switch>
            <Route exact path={`/:current_lang/not-found`}>
              <NotFound current_lang={JSON.parse($supportedLocales).current_lang}/>
            </Route>

            <Route path={`/:current_lang/login`} >
              <LoginPage exact current_lang={JSON.parse($supportedLocales).current_lang}/>
            </Route>

            <Route path={`/:current_lang/managementSystem`} >
              <Protected current_lang={JSON.parse($supportedLocales).current_lang}> <ManagementSystem current_lang={JSON.parse($supportedLocales).current_lang}/> </Protected>
            </Route>

            <Redirect to={`/${JSON.parse($supportedLocales).current_lang}/not-found`} />
          </Switch>
        </div>
      </div>
    </>);
}

export default App;

if(document.getElementById('root')) {
  ReactDOM.render(
    <Router>
      <AdminState>
        <CMSState>
          <AlertState>
            <GeneralState>
              <SearchState>
                <AccountsState>
                  <UserState>
                    <ProductState>
                      <ServiceProviderState>
                        <CarModelState>
                          <CategoryState>
                            <App />
                          </CategoryState>
                        </CarModelState>
                      </ServiceProviderState>
                    </ProductState>
                  </UserState>
                </AccountsState>
              </SearchState>
            </GeneralState>
          </AlertState>
        </CMSState>
      </AdminState>
    </Router>
    , document.getElementById('root'))
};
