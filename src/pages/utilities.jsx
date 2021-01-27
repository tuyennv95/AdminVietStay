import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchInput from '../component/SearchInput';
import DataFormUtil from '../component/DataFormUtil';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import { BASE_API } from '../constant/index';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: '10px'

    },
    button:{
        margin:'10px',
    },
    button1:{
        width:'100%',
        textAlign:'right',
    }


}));

export default function Utilities(props) {
    const classes = useStyles();
    // console.log(props)
    const [data, setData] = React.useState([]);
    // console.log(token);
    const history = useHistory();
    const token = document.cookie;

    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    // console.log(token1);

    React.useEffect(() => {

        axios.get('http://localhost:1337/utilities', {
            headers: {
                Authorization: `Bearer ${token1}`,
            },
        })
            .then(response => {
                // console.log(response.data)
                setData(response.data);
            })
            .catch(error => {
                // Handle error.
                // console.log('An error occurred:', error.response);
            });

    }, [])
    console.log(data)
    function addUtil(){
        history.push("/util/add")
    }
    
    const [idUtil, setIdUtil] =React.useState();
    function getData(data){
        setIdUtil(data);
    }
    function suaUtil(){
        history.push(`util/repair-util&id=${idUtil}`)
    }
    function test(){
        if(idUtil){
            return true;
        }
        else{
            return false;
        }
    }
    function xoaUtil(){
        // eslint-disable-next-line no-restricted-globals
      const alertConfrm = confirm(`Bạn có muốn xóa người dùng só id:${idUtil}`);
      if(alertConfrm=== true){
          axios.delete(`${BASE_API}/utilities/${idUtil}`,{
            headers: {
                Authorization: `Bearer ${token1}`,
            },
          })
          .then((response)=>{
              console.log(response)
          }).catch((error)=>{
              console.log('a')
          })

      }
    }
   


    return (
        <div className={classes.search}>
            <h2 className={classes.title}>Util</h2>
            <div className={classes.button1}>
                <Button className={classes.button} variant="contained" color="primary" onClick={addUtil}>Thêm</Button>
                <Button className={classes.button} variant="contained" onClick={suaUtil}
                    disabled={test()===true ? false : true}
                >Sửa</Button>
                <Button className={classes.button} variant="contained" color="secondary"
                disabled={test()===true ? false : true}
                onClick={xoaUtil}
                >Xóa</Button>
            </div>

            <DataFormUtil data={data} sendData={getData}/>
        </div>
    );
}