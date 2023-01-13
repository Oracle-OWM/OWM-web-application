import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { CMSState } from './Context/CMSContext';

import '../../css/app.css';
import Protected from './MainComponents/Protected';
import NotFound from './MainComponents/NotFound';
import LoginPage from './Pages/Login/LoginPage';
import ManagementSystem from './Pages/ManagementSystem/ManagementSystem';
import Dashboard from './Pages/Dashboard/Dashboard';

import { AlertState } from './Context/AlertContext';
import { SearchState } from './Context/SearchContext';
import { GeneralState } from './Context/GeneralContext';
import { AdminContext, AdminState } from './Context/AdminContext';
import { AccountsState } from './Context/AccountsContext';
import { IoTDeviceState } from './Context/IoTDeviceContext';
import { UserState } from './Context/UserContext';


function App() {
  const {setAuth, auth} = useContext(AdminContext);


  return (
    <>
      <div className='flex flex-col w-full'>
        {/* <Navbar/> */}
        <div className="flex flex-nowrap flex-row w-full mx-0">
          <Switch>
            <Route exact path={`/not-found`}>
              <NotFound />
            </Route>

            <Route path={`/login`} >
              <LoginPage />
            </Route>

            <Route path={`/dashboard`} >
              <Protected > <Dashboard /> </Protected>
            </Route>

            <Route path={`/managementSystem`} >
              <Protected > <ManagementSystem /> </Protected>
            </Route>

            <Redirect path='/' to={`/login`} />
            <Redirect to={`/not-found`} />
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
                    <IoTDeviceState>
                      <App />
                    </IoTDeviceState>
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
