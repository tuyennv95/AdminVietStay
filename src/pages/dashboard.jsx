import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BASE_API } from '../constant/index';
import HouseIcon from '@material-ui/icons/House';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import axios from 'axios';
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DateTime from './Date';
import TextField from '@material-ui/core/TextField';
import { from } from 'rxjs';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  title: {
    paddingTop: '10px'

  },
  button: {
    margin: '10px',
  },
  button1: {
    width: '100%',
    textAlign: 'right',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  numberRoom: {
    width: '30%',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'space-between',


  },
  numberUser: {
    width: '30%',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'space-between',


  },
  numberMoney: {
    width: '30%',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'space-between',


  },
  numberRoomTrong: {
    width: '30%',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px'
  },
  numberRoomCoThue: {
    width: '30%',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px'
  },
  numberDonhang: {
    width: '30%',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px'
  },
  img: {
    width: '20%',
    backgroundColor: 'blue',
    padding: '22px',

  },
  img2: {
    width: '20%',
    backgroundColor: 'red',
    padding: '22px',

  },
  img3: {
    width: '20%',
    backgroundColor: '#6ce26a',
    padding: '22px',

  },
  title: {
    width: '70%',
    textAlign: 'center',
  }

}));
const Dashboard = () => {
  const classes = useStyles();
  const [numberRoom, setNumberRoom] = React.useState(0);
  React.useEffect(() => {
    axios.get(`${BASE_API}/house-for-rents/count`)
      .then((response) => {
        setNumberRoom(response.data)
      })
  }, [])
  const [numberUser, setNumberUser] = React.useState(0);
  const token = document.cookie;

  const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
  // console.log(token1);

  React.useEffect(() => {

    axios.get('http://localhost:1337/users/count', {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    })
      .then(response => {
        setNumberUser(response.data);
      })
      .catch(error => {
        // Handle error.
        // console.log('An error occurred:', error.response);
      });

  }, [])
  const [numberMoney, setNumberMoney] = React.useState(0);
  React.useEffect(() => {
    axios.get(`${BASE_API}/bills?statusPayment=2`)
      .then((response) => {
        setListBill(response.data);
        var tong = 0;
        response?.data?.map((bill) => {
          tong = tong + parseInt(bill.total_cost);
        })
        setNumberMoney(tong)
      })
  }, [])
  const [numberRoomTrong, setRoomTrong] = React.useState(0);
  React.useEffect(() => {
    axios.get(`${BASE_API}/house-for-rents/count?status=false`)
      .then((response) => {
        setRoomTrong(response.data);
        // var tong=0;
        // response?.data?.map((bill)=>{
        //   tong = tong + parseInt(bill.total_cost);
        // })
        // setNumberMoney(tong)
      })
  }, [])
  const [numberBills, setNumberBills] = React.useState(0);
  React.useEffect(() => {
    axios.get(`${BASE_API}/bills/count`)
      .then((response) => {
        setNumberBills(response.data);

      })
  }, [])
const [listBill, setListBill] = React.useState();
// console.log(typeof listBill[0].createdAt);



 function getData(data){
   console.log(data)
 }
    const [fromData, setFrom] = React.useState();
    function onChangeData(e){
        const {name, value} = e.target;
        setFrom({...fromData, 
            [name]: value});
    }
    const[ doanhthu,setDoanhthu]= React.useState(0);

    React.useEffect(()=>{
      var tien = 0;
      var list = [];
      listBill?.map((bill)=>{
        if((moment(bill?.time_booking).isBetween(fromData?.from, fromData?.to, undefined, '[]')) === true){
          list.push(bill.id)
        }
        // else(setDoanhthu(10))
      })
      let filteredX = listBill?.filter(itemX => list?.includes(itemX?.id));
      console.log(filteredX);
      filteredX?.map((item)=>{
        tien = tien + parseInt(item?.total_cost);
      })
      setDoanhthu(tien);
    },[fromData])

    console.log(fromData)


  return (
    <div>
      <h2>DashBoard</h2>

      <div className={classes.header}>

        <div className={classes.numberRoom}>
          <div className={classes.img}>
            <HouseIcon />
          </div>
          <div className={classes.title}>
            <h4 style={{ color: 'gray' }}>Số phòng</h4>
            <h5>{numberRoom}</h5>
          </div>
        </div>
        <div className={classes.numberUser}>
          <div className={classes.img2}>
            <PersonAddIcon />
          </div>
          <div className={classes.title}>
            <h4 style={{ color: 'gray' }}>Số người dùng</h4>
            <h5>{numberUser}</h5>

          </div>

        </div>
        <div className={classes.numberMoney}>
          <div className={classes.img3}>
            <MonetizationOnIcon />
          </div>
          <div className={classes.title}>
            <h4 style={{ color: 'gray' }}>Doanh thu</h4>
            <h5>{new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(numberMoney)}</h5>

          </div>

        </div>
        <div className={classes.numberRoomTrong}>
          <div className={classes.img3}>
            <HomeIcon />
          </div>
          <div className={classes.title}>
            <h4 style={{ color: 'gray' }}>Phòng trống</h4>
            <h5>{numberRoomTrong}</h5>

          </div>

        </div>
        <div className={classes.numberRoomCoThue}>
          <div className={classes.img3}>
            <HomeIcon />
          </div>
          <div className={classes.title}>
            <h4 style={{ color: 'gray' }}>Phòng đang cho thuê</h4>
            <h5>{numberRoom - numberRoomTrong}</h5>

          </div>

        </div>
        <div className={classes.numberDonhang}>
          <div className={classes.img3}>
            <FileCopyIcon />
          </div>
          <div className={classes.title}>
            <h4 style={{ color: 'gray' }}>Tổng số đơn hàng</h4>
            <h5>{numberBills}</h5>

          </div>

        </div>
      </div>
      <h2>Chi tiết doanh thu</h2>
      <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="from"
        type="date"
        defaultValue="2021-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="from"
        value={fromData?.from}
        onChange={onChangeData}
      />
      <TextField
        id="date"
        label="to"
        type="date"
        defaultValue="2021-02-02"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="to"
        value={fromData?.to}
        onChange={onChangeData}
      />
    </form>
    {fromData?.from && fromData?.to ? 
    <h3>Tổng doanh thu từ {fromData.from} đến {fromData.to} la: {new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(doanhthu)}</h3>
    : ''  
  }
  <h2>Hot Booking</h2>
    </div>
  );
};

export default Dashboard;