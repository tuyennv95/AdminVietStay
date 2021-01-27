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
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import  {BASE_API} from '../constant/index';
const useStyles = makeStyles((theme) => ({
    input: {
        display: 'block',
        margin: '20px',
        width: '100%',
    },
    button: {
        width: '100%',
        textAlign: 'center',
    },
    button_confirm: {
        marginRight: '10px'
    },
    form:{
        width: '50%'
    }
}));

export default function FormUtil(props) {
    const classes = useStyles();
    const key = props.location.pathname;
    const [id, setId] = React.useState();
    const keyRepair = queryString.parse(key)
    // console.log(keyRepair.id)
    React.useEffect(()=>{
        setId(keyRepair?.id)
    },[])
    const [text, setText] = React.useState({
        utilities_name:'',
        des:'',
        
    });
    const token = document.cookie;

    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    React.useEffect(()=>{
        if(id){
            axios.get(`${BASE_API}/utilities/${id}`,{
                headers: {
                    Authorization: `Bearer ${token1}`,
                },
            })
                .then(response => {
                    console.log(response.data)
                    if(id){
                        setText({
                            ...text,
                            utilities_name: response.data.utilities_name,
                            des: response.data.des,
                           
                        })
                    }
                    // setData(response.data);
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                });
            }
            
    },[id])

    const changeInput=(e)=>{
        const {name, value} = e.target;
        setText({
            ...text,
            [name]:value,
        });
        // console.log(value)
    }
    const history = useHistory();
    function huy() {
        history.push("/util")
    }
    // console.log(token1)
    function buttonRepair(){
        axios.put(`${BASE_API}/utilities/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token1}`,
            // },
            
            utilities_name: text.utilities_name,
                des:  text.des,
                
            },
           
        )
        .then((response) =>{
            console.log(response)
            history.push("/util")
        })
        .catch((error) =>{
            console.log(error)
        })

        
    }

    function buttonAdd(){
        axios.post('http://localhost:1337/utilities', {
            
            utilities_name: text.utilities_name,
                des:  text.des,
               

            },
           
        )
        .then((response) =>{
            console.log(response)
            history.push("/util")
        })
        .catch((error) =>{
            console.log(error)
        })

        
    }
    
    return (
        <div className={classes.formUser}>
            <h2 className={classes.textAddUser}>{id ? 'Repair Util' : 'Add Util'}</h2>
            <div className={classes.form}>
                <TextField
                    className={classes.input}
                    id="standard-util-input"
                    label="util"
                    type="text"
                    autoComplete="current-util"
                    name="utilities_name"
                    value={text.utilities_name}
                    onChange={changeInput}
                />
                <TextField
                    className={classes.input}
                    id="standard-des-input"
                    label="des"
                    type="text"
                    autoComplete="current-des"
                    name="des"

                    value={text.des}
                    onChange={changeInput}


                />

            </div>
            <div className={classes.button}>
                <Button className={classes.button_confirm} variant="contained" onClick={huy}>
                    Hủy
</Button>
                {!id
                    ?
                    <Button className={classes.button_confirm} variant="contained" color="primary"
                    onClick={buttonAdd}
                    >
                        Add
                    </Button>
                    :
                    <Button className={classes.button_confirm} variant="contained" color="primary"
                    onClick={buttonRepair}
                    >
                        Sửa
            </Button>
                }

            </div>
        </div>
    );
}