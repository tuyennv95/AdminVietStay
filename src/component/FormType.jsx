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

export default function FormType(props) {
    const classes = useStyles();
    const key = props.location.pathname;
    const [id, setId] = React.useState();
    const keyRepair = queryString.parse(key)
    console.log(keyRepair.id)
    React.useEffect(()=>{
        setId(keyRepair?.id)
    },[])
    const [text, setText] = React.useState({
        name:'',
        description:'',
    });
    const token = document.cookie;

    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    React.useEffect(()=>{
        if(id){
            axios.get(`${BASE_API}/type-rooms/${id}`)
            .then(response => {
                console.log(response.data)
                        setText({
                            ...text,
                            name: response.data.name,
                            description: response.data.Description,
                            
                        })
                    
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
        history.push("/room-type")
    }
    // console.log(token1)
    function buttonRepair(){
        axios.put(`${BASE_API}/type-rooms/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token1}`,
            // },
            
                name: text.name,
                Description:  text.description,
                
            },
           
        )
        .then((response) =>{
            console.log(response)
            history.push("/room-type")
        })
        .catch((error) =>{
            console.log(error)
        })

        
    }
    console.log(text ,text.email, text.phone)

    function buttonAdd(){
        axios.post(`${BASE_API}/type-rooms`, {
            
                name: text.name,
                Description:  text.description,
               

            },
           
        )
        .then((response) =>{
            console.log(response)
            history.push("/room-type")
        })
        .catch((error) =>{
            console.log(error)
        })

        
    }
    
    return (
        <div className={classes.formUser}>
            <h2 className={classes.textAddUser}>{id ? 'Repair Type Room' : 'Add Type Room'}</h2>
            <div className={classes.form}>
                <TextField
                    className={classes.input}
                    id="standard-name-input"
                    label="name"
                    type="text"
                    autoComplete="current-name"
                    name="name"
                    value={text.name}
                    onChange={changeInput}
                />
                <TextField
                    className={classes.input}
                    id="standard-description-input"
                    label="description"
                    type="text"
                    autoComplete="current-description"
                    name="description"

                    value={text.description}
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