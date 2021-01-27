import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BASE_API } from '../constant/index';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  login: {
    width: '20%',
    margin: '0 auto',
    marginTop: '250px'
  },
  input: {
    padding: '5px 0',
    marginBottom: '20px'
  },
  text: {
    display: 'block'
  }
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [info, setInfo] = React.useState({
    user: '',
    pass: '',
  });
  function onChange(e) {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value })
  }
  const dispatch = useDispatch();
  const history = useHistory();
  function setLogin() {
    axios
      .post('http://localhost:1337/auth/local', {
        identifier: info.user,
        password: info.pass,
      })
      .then(response => {
        // console.log(response.data)
        if(response.data.user.role.type === "admin"){
        document.cookie = `${response.data.user.username}=${response.data.jwt}, expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}`;

          dispatch({
            type:"LOGIN_SUCCESS",
            payload:{
             name: response.data.user.username,
             jwt: response.data.jwt,
            }
          })
          history.push("/users");
        }
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  }
  
  return (
    <div className={classes.login}>
      <label className={classes.text}>User</label>
      <input
        type="text"
        className={classes.input}
        name="user"
        value={info.user}
        onChange={onChange}

      />
      <label className={classes.text}>PassWord</label>
      <input
        type="password"
        className={classes.input}
        name="pass"
        onChange={onChange}
        value={info.pass} />
      <Button variant="contained" onClick={setLogin}>Login</Button>
    </div>
  );
}