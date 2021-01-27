import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



export default function DataTableUser(props) {
  const data = props.data;
  // console.log(data)
  const columns = [
    { field: 'id', headerName: 'ID', width:150,},
    { field: 'utilities_name', headerName: 'Utilities Name', width:200,},
    { field: 'des', headerName: 'Des', width:200,},
   
   
  ];
  
  const rows = data?.map((item)=>{
    var util={};
    util.id = item._id;
    util.utilities_name = item.utilities_name;
    util.des = item.des;
    
    return util;
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
