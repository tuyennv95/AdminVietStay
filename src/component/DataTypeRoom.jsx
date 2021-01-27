import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



export default function DataTableUser(props) {
  const data = props.data;
  // console.log(data)
  const columns = [
    { field: 'id', headerName: 'ID', width:150,},
    { field: 'name', headerName: 'name', width:200,},
    { field: 'description', headerName: 'description', width:200,},
    
   
  ];
  function checkSelectRow(e){
    // console.log(e.data.id)
    props.sendData(e.data.id)
}
  
  const rows = data?.map((type)=>{
    var types={};
    types.id = type._id;
    types.name = type.name;
    types.description = type.Description;
    return types;
  })
  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid 
    rows={rows} 
    columns={columns} 
    pageSize={5}  
   
    // checkboxSelection 
    onRowSelected={checkSelectRow}
    />
  </div>
  );
}
