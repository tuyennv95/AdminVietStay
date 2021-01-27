import logo from './logo.svg';
import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './component/Header';
import Menu from './component/Menu';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import User from './pages/user';
import House from './pages/house';
import Bill from './pages/bill';
import Dashboard from './pages/dashboard';
import { Provider } from 'react-redux';
import { store } from './setup-redux/store';
import Login from '../src/component/Login';
import PrivateRoute from './PrivateRoute';
import Administrative from './pages/Administarive';
import TypeRoom from './pages/typeRoom';
import FormUser from './component/FormUser';
import FormType from './component/FormType';
import FormHouse from './component/FormHouse';
import Utilities from './pages/utilities';
import FormUtil from './component/FormUtil';
import FormUpdateBill from './component/FormUpdateBill';
function App() {
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        
        <Header />

        <div className="main">
          <div className="menu">
            <Menu />
          </div>
          <div className="views">
            <Switch>
              <Route path="/login" component={Login} />
              

              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/users" component={User} />
              <PrivateRoute exact path="/houses" component={House} />
              <PrivateRoute exact path="/bills" component={Bill} />
              <PrivateRoute path="/bills/update&id=:id" component={FormUpdateBill} />
              <PrivateRoute exact path="/room-type" component={TypeRoom} />
              <PrivateRoute path="/add-user" component={FormUser} />
              <PrivateRoute path="/repair-user&id=:id" component={FormUser} />
              <PrivateRoute path="/room-type/add" component={FormType} />
              <PrivateRoute path="/room-type/repair&id=:id" component={FormType} />
              <PrivateRoute path="/houses/add" component={FormHouse} />
              <PrivateRoute exact path="/util" component={Utilities} />
              <PrivateRoute path="/util/add" component={FormUtil} />
              <PrivateRoute path="/util/repair-util&id=:id" component={FormUtil} />
              {/* <PrivateRoute path="/administrative-units" component={Administrative} /> */}

              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
