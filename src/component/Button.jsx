import React from 'react';
import {    makeStyles } from '@material-ui/core/styles';
import SearchInput from '../component/SearchInput';
import DataTableHouse from '../component/DataTableHouse';
import axios from 'axios';
import {BASE_API} from '../constant/index';
import DataTypeRoom from '../component/DataTypeRoom';
import thunk from 'redux-thunk';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    title:{
        paddingTop:'10px'

    }


}));

export default function TypeRoom() {
    const classes = useStyles();
   
    

    return (
        <div className={classes.button}>
            <Button  variant="contained"></Button>
            <Button variant="contained" color="primary"></Button>
            <Button variant="contained" color="secondary"></Button>
        </div>
    );
}