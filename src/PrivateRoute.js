import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {isLogin} from './utils/index'
function PrivateRoute ({component: Component, ...rest}) {
  
    return (
      <Route
        {...rest}
        render={(props) => isLogin() === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }


export default PrivateRoute;