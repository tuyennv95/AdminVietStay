import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


export default function DataTableBills(props) {
  const data = props.data;
  const columns = [
    { field: 'id', headerName: 'ID', width:150,},
    { field: 'customername', headerName: 'Customer Name', width:200,},
    { field: 'userId', headerName: 'userId', width:200,},
    { field: 'email', headerName: 'Email', width:200,},
    { field: 'phoneNumber', headerName: 'phoneNumber', width:200,},
    { field: 'house_name', headerName: 'House Name', width:200,},
    { field: 'house_type', headerName: 'house_type', width:200,},
    { field: 'houseId', headerName: 'houseId', width:200,},
    { field: 'number_people', headerName: 'number_people', width:200,},
    { field: 'price', headerName: 'price', width:200,},
    { field: 'total_cost', headerName: 'total_cost', width:200,},
    { field: 'checkIn', headerName: 'checkIn', width:200,},
    { field: 'checkOut', headerName: 'checkOut', width:200,},
    { field: 'Time_booking', headerName: 'Time_booking', width:200,},
    { field: 'StatusPayment', headerName: 'StatusPayment', width:200,},
   
   
  ];
  
  const rows = data?.map((bill)=>{
    var billItem={};
    billItem.id = bill.id;
    billItem.customername = bill.customer_name;
    billItem.userId = bill.userId;
    billItem.email = bill.email;
    billItem.phoneNumber = bill.phoneNumber;
    billItem.house_name = bill.house_name;
    billItem.house_type = bill.house_type;
    billItem.houseId = bill.houseId;
    billItem.number_people = bill.number_people;
    billItem.price = bill.price;
    billItem.total_cost = bill.total_cost;
    billItem.checkIn = bill.checkIn;
    billItem.checkOut = bill.checkOut;
    billItem.Time_booking = bill.time_booking;
    billItem.StatusPayment = bill.status_payment;
    return billItem;
  })
 
  function checkSelectRow(e){
    props.sendData(e.data.id);
}
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} 
      columns={columns} pageSize={5}  autoPageSize 
      columnBuffer={5}
      onRowSelected={checkSelectRow}/>
    </div>
  );
}
