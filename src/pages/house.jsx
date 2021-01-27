import React from 'react';
import {    makeStyles } from '@material-ui/core/styles';
import SearchInput from '../component/SearchInput';
import DataTableHouse from '../component/DataTableHouse';
import axios from 'axios';
import {BASE_API} from '../constant/index';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    title:{
        paddingTop:'10px'

    },
    button:{
        margin:'10px',
    },
    button1:{
        width:'100%',
        textAlign:'right',
    }


}));

export default function House() {
    const classes = useStyles();
    const history = useHistory();
   
   
    React.useEffect(()=>{
        // axios.(`${BASE_API}`)
    },[])
   function addHouse(){
       history.push("houses/add");
   }
    return (
        <div className={classes.search}>
            <h2 className={classes.title}>Houses</h2>
            <div className={classes.button1}>
                <Button className={classes.button} variant="contained" color="primary"
                onClick={addHouse}
                >Thêm</Button>
                <Button className={classes.button} variant="contained">Sửa</Button>
                <Button className={classes.button} variant="contained" color="secondary">Xóa</Button>
            </div>
            
            <DataTableHouse/>
        </div>
    );
}