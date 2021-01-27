import React from 'react';
import {    makeStyles } from '@material-ui/core/styles';
import SearchInput from '../component/SearchInput';
import DataTableHouse from '../component/DataTableHouse';
import axios from 'axios';
import {BASE_API} from '../constant/index';
import DataTypeRoom from '../component/DataTypeRoom';
import thunk from 'redux-thunk';
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

export default function TypeRoom() {
    const classes = useStyles();
    const [data, setData] = React.useState([])
  const [idType,setIdType] = React.useState()
  const token = document.cookie;

    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    const history = useHistory();
   React.useEffect(()=>{
        axios.get(`${BASE_API}/type-rooms`)
        .then((reponse)=>{
            // console.log(reponse.data)
            console.log('aaa')
            setData(reponse?.data)
        })
        .catch((error)=>{
            console.log(error)
        })
   },[data])
   function getData(data){
    setIdType(data)
    }
    function test(){
        if(idType){
            return true;
        }
        else{
            return false;
        }
    }
    // console.log(idType)
    function addTypeRoom(){
        history.push("/room-type/add")
    }
    function repairTypeRoom(){
        history.push(`/room-type/repair&id=${idType}`)
    }
    function delTypeRoom(){
        // eslint-disable-next-line no-restricted-globals
        const alertConfrm = confirm(`Bạn có muốn xóa loại phòng só id:${idType}`);
        if(alertConfrm=== true){
            axios.delete(`${BASE_API}/type-rooms/${idType}`,{
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
            <h2 className={classes.title}>Type Room</h2>
            <div className={classes.button1}>
                <Button className={classes.button} variant="contained" color="primary"
                onClick={addTypeRoom}
                >Thêm</Button>
                <Button className={classes.button} variant="contained"
                disabled={test()===true ? false : true}
                onClick={repairTypeRoom}

                >Sửa</Button>
                <Button className={classes.button} variant="contained" color="secondary"
              disabled={test()===true ? false : true}
              onClick={delTypeRoom}

                >Xóa</Button>
            </div>
            
            <DataTypeRoom data={data} sendData={getData}/>
        </div>
    );
}