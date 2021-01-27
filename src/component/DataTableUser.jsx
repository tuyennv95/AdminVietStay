import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



export default function DataTableUser(props) {
  const data = props.data;
  // console.log(data)
  const columns = [
    { field: 'id', headerName: 'ID', width:150,},
    { field: 'Username', headerName: 'Username', width:200,},
    { field: 'Email', headerName: 'Email', width:200,},
    { field: 'Phone', headerName: 'Phone', width:200,},
    {
      field: 'Confirmed',
      headerName: 'Confirmed',
      type: 'boolean',
      width:100,
    },
   
  ];
  
  const rows = data?.map((use)=>{
    var user={};
    user.id = use._id;
    user.Username = use.username;
    user.Email = use.email;
    user.Phone = use.phone;
    user.Confirmed = use.confirmed;
    return user;
  })
  // const [idUser, setIdUser] = React.useState()
  function checkSelectRow(e){
    props.sendData(e.data.id);
}
// console.log(idUser)
  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid 
    rows={rows} 
    columns={columns} 
    pageSize={5}  
   
    // checkboxSelection 
    onRowSelected={checkSelectRow}
    // props={idUser}
    />
  </div>
  );
}
