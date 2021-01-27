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

export default function MenuListComposition(props) {
    const classes = useStyles();
    const key = props.location.pathname;
    const [id, setId] = React.useState();
    const keyRepair = queryString.parse(key)
    // console.log(keyRepair.id)
    React.useEffect(()=>{
        setId(keyRepair?.id)
    },[])
    const [text, setText] = React.useState({
        name:'',
        email:'',
        phone:'',
        pass:'',
    });
    const token = document.cookie;

    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    React.useEffect(()=>{
        if(id){
            axios.get(`${BASE_API}/users/${id}`,{
                headers: {
                    Authorization: `Bearer ${token1}`,
                },
            })
                .then(response => {
                    console.log(response.data)
                    if(id){
                        setText({
                            ...text,
                            name: response.data.username,
                            email: response.data.email,
                            phone: response.data.phone,
                            pass: response.data.password,
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

    function test() {
        if (key === "/add-user") {
            return true;
        }
        else {
            return false;
        }
    }
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
        history.push("/users")
    }
    // console.log(token1)
    function buttonRepair(){
        axios.put(`${BASE_API}/users/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token1}`,
            // },
            
                username: text.name,
                email:  text.email,
                phone:  text.phone,
                password:   text.pass,
            },
           
        )
        .then((response) =>{
            console.log(response)
            history.push("/users")
        })
        .catch((error) =>{
            console.log(error)
        })

        
    }
    console.log(text ,text.email, text.phone)

    function buttonAdd(){
        console.log(text.name)
        console.log(text.email)
        console.log(text.pass)
        axios.post('http://localhost:1337/auth/local/register', {
            
                username: text.name,
                email:  text.email,
                password:   text.pass,
                phone:  text.phone,

            },
           
        )
        .then((response) =>{
            console.log(response)
            history.push("/users")
        })
        .catch((error) =>{
            console.log(error)
        })

        
    }
    
    return (
        <div className={classes.formUser}>
            <h2 className={classes.textAddUser}>{id ? 'Repair User' : 'Add User'}</h2>
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
                    id="standard-email-input"
                    label="email"
                    type="text"
                    autoComplete="current-email"
                    name="email"

                    value={text.email}
                    onChange={changeInput}


                />
                <TextField
                    className={classes.input}
                    id="standard-phone-input"
                    label="phone"
                    type="text"
                    autoComplete="current-phone"
                    name="phone"

                    value={text.phone}
                    onChange={changeInput}


                />
                <TextField
                    className={classes.input}
                    id="standard-password-input"
                    label="pass"
                    type="text"
                    autoComplete="current-pass"
                    name="pass"

                    value={text.pass}
                    onChange={changeInput}


                />

            </div>
            <div className={classes.button}>
                <Button className={classes.button_confirm} variant="contained" onClick={huy}>
                    Hủy
</Button>
                {test() === true
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