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
import { BASE_API } from '../constant/index';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
    form: {
        width: '50%'
    },formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: '25px'
      },
}));

export default function FormUpdateBill(props) {
    const classes = useStyles();
    const key = props.location.pathname;
    const [id, setId] = React.useState();
    const keyRepair = queryString.parse(key)
    console.log(keyRepair.id)
    React.useEffect(() => {
        setId(keyRepair?.id)
    }, [])

    const [text, setText] = React.useState({
        customername: '',
        userId: '',
        email: '',
        phoneNumber: '',
        house_name: '',
        house_type: '',
        houseId: '',
        number_people: '',
        price: 0,
        total_cost: 0,
        checkIn: null,
        checkOut: null,
        Time_booking: null,
        // status_payment: false,
        statusPayment: '',

    });
    const token = document.cookie;

    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    React.useEffect(() => {
        if (id) {
            axios.get(`${BASE_API}/bills/${id}`)
                .then(response => {
                    console.log(response.data)
                    setText({
                        ...text,
                        customername: response.data.customer_name,
                        userId: response.data.userId,
                        email: response.data.email,
                        phoneNumber: response.data.phoneNumber,
                        house_name: response.data.house_name,
                        house_type: response.data.house_type,
                        houseId: response.data.houseId,
                        number_people: response.data.number_people,
                        price: response.data.price,
                        total_cost: response.data.total_cost,
                        checkIn: response.data.checkIn,
                        checkOut: response.data.checkOut,
                        Time_booking: response.data.time_booking,
                        // status_payment: response.data.status_payment,
                        statusPayment: response.data.statusPayment,

                    })

                    // setData(response.data);
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                });
        }

    }, [id])


    const changeInput = (e) => {
        const { name, value } = e.target;
        setText({
            ...text,
            [name]: value,
        });
        // console.log(value)
    }
    const history = useHistory();
    function huy() {
        history.push("/bills")
    }
    // console.log(token1)
    function buttonUpdate() {
        axios.put(`${BASE_API}/bills/${id}`, {
            
            statusPayment: text.statusPayment,

        },

        )
            .then((response) => {
                console.log(response)
                history.push("/bills")
            })
            .catch((error) => {
                console.log(error)
            })


    }


    console.log(text)
    return (
        <div className={classes.formUser}>
            <h2 className={classes.textAddUser}>Update Bill</h2>
            <div className={classes.form} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '50%' }}>

                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-customername-input"
                        label="customername"
                        type="text"
                        autoComplete="current-customername"
                        name="customername"
                        value={text.customername}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-userId-input"
                        label="userId"
                        type="text"
                        autoComplete="current-userId"
                        name="userId"

                        value={text.userId}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
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
                        disabled
                        className={classes.input}
                        id="standard-phoneNumber-input"
                        label="phoneNumber"
                        type="text"
                        autoComplete="current-phoneNumber"
                        name="phoneNumber"

                        value={text.phoneNumber}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-house_name-input"
                        label="house_name"
                        type="text"
                        autoComplete="current-house_name"
                        name="house_name"

                        value={text.house_name}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-house_type-input"
                        label="house_type"
                        type="text"
                        autoComplete="current-house_type"
                        name="house_type"

                        value={text.house_type}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-houseId-input"
                        label="houseId"
                        type="text"
                        autoComplete="current-houseId"
                        name="houseId"
                        value={text.houseId}
                        onChange={changeInput}
                    />
                </div>
                <div style={{ width: '50%' }}>
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-number_people-input"
                        label="number_people"
                        type="text"
                        autoComplete="current-number_people"
                        name="number_people"
                        value={text.number_people}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-price-input"
                        label="price"
                        type="text"
                        autoComplete="current-price"
                        name="price"
                        value={text.price}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-total_cost-input"
                        label="total_cost"
                        type="text"
                        autoComplete="current-total_cost"
                        name="total_cost"
                        value={text.total_cost}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-checkIn-input"
                        label="checkIn"
                        type="date"
                        autoComplete="current-checkIn"
                        name="checkIn"
                        value={text.checkIn}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-checkOut-input"
                        label="checkOut"
                        type="date"
                        autoComplete="current-checkOut"
                        name="checkOut"
                        value={text.checkOut}
                        onChange={changeInput}
                    />
                    <TextField
                        disabled
                        className={classes.input}
                        id="standard-Time_booking-input"
                        label="Time booking"
                        type="date"
                        autoComplete="current-Time_booking"
                        name="Time_booking"
                        value={text.Time_booking}
                        onChange={changeInput}
                    />
                    {/* <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Status Payment</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={text.status_payment}
                            // type="boolean"
                            onChange={changeInput}
                            name="status_payment"
                        >
                            <MenuItem value={"true"}>Đã thanh toán</MenuItem>
                            <MenuItem value={false}>Chưa thanh toán</MenuItem>
                            
                        </Select>
                    </FormControl> */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Status-Payment</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={text.statusPayment}
                            // type="boolean"
                            onChange={changeInput}
                            name="statusPayment"
                        >
                            <MenuItem value={2}>Đã thanh toán</MenuItem>
                            <MenuItem value={3}>Chờ Hủy</MenuItem>
                            <MenuItem value={1}>Chưa thanh toán</MenuItem>
                            <MenuItem value={0}>Hủy</MenuItem>
                            
                        </Select>
                    </FormControl>


                </div>




            </div>
            <div className={classes.button}>
                <Button className={classes.button_confirm} variant="contained" onClick={huy}>
                    Hủy
</Button>

                <Button className={classes.button_confirm} variant="contained" color="primary"
                    onClick={buttonUpdate}
                >
                    Update
            </Button>


            </div>
        </div>
    );
}