import React from 'react';
import {    makeStyles } from '@material-ui/core/styles';
import SearchInput from '../component/SearchInput';
import DataTableBills from '../component/DataTableBills';
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

export default function Bill() {
    const classes = useStyles();
    const [bills,setBills] = React.useState([]);
    const history= useHistory();
    React.useEffect(()=>{
        axios.get(`${BASE_API}/bills`)
        .then((reponse)=>{
            console.log(reponse.data);
            setBills(reponse?.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    const [id, setId] = React.useState();
    function updateBill(){
        history.push(`/bills/update&id=${id}`)
    }

    function getData(data){
        setId(data);
    }
    console.log(bills)
    return (
        <div className={classes.search}>
            <h2 className={classes.title}>Bills</h2>
            <div className={classes.button1}>
                <Button className={classes.button} variant="contained" color="primary" disabled={true} >Thêm</Button>
                <Button className={classes.button} variant="contained" onClick={updateBill}
                disabled={id ? false : true}
                >Update</Button>
                <Button className={classes.button} variant="contained" color="secondary">Xóa</Button>
            </div>
            
            <DataTableBills data={bills} sendData={getData}/>
        </div>
    );
}