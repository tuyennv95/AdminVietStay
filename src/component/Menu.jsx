import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // height:'100vh'

  },
  paper: {
    marginRight: theme.spacing(2),
    height: '100vh',
    width: '200px'
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
        <Link to="/" style={{ textDecoration: 'none' }}>

          <MenuItem styles={{}}>Dashboard</MenuItem>
          </Link>

          <Link to="/users" style={{ textDecoration: 'none' }}>
            <MenuItem styles={{}}>Users</MenuItem>
          </Link>

          <Link to="/houses" style={{ textDecoration: 'none' }}>
            <MenuItem styles={{}}>Houses
          </MenuItem>
          </Link>
          <Link to="/room-type" style={{ textDecoration: 'none' }}>
            <MenuItem styles={{}}>Type Room
          </MenuItem>

          </Link>
          <Link to="/bills" style={{ textDecoration: 'none' }}>
            <MenuItem styles={{}}>Bills</MenuItem>
          </Link>
          <Link to="/util" style={{ textDecoration: 'none' }}>
            <MenuItem styles={{}}>Utilities</MenuItem>
          </Link>
        <MenuItem styles={{}}>Logout</MenuItem>
        </MenuList>
      </Paper>

    </div>
  );
}