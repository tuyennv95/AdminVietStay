import * as React from 'react';
import { XGrid ,useApiRef} from '@material-ui/x-grid';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import thunk from 'redux-thunk';

export default function XGridDemo() {
    const columns = [
        { field: 'id', headerName: 'ID', width:250,},
        { field: 'houseName', headerName: 'House Name', width:200,},
        { field: 'houseType', headerName: 'House Type', width:200,},
        { field: 'price', headerName: 'Price', width:200,},
        { field: 'PeopleNumber', headerName: 'PeopleNumber', width:200,},
        { field: 'BedNumber', headerName: 'BedNumber', width:200,},
        { field: 'Number_of_bedroom', headerName: 'Number_of_bedroom', width:200,},
        { field: 'Number_of_bathroom', headerName: 'Number_of_bathroom', width:200,},
        { field: 'People_max', headerName: 'People_max', width:200,},
        { field: 'Price_1_poeple_exceed', headerName: 'Price_1_poeple_exceed', width:200,},
        { field: 'Status', headerName: 'Status', width:200,  type: 'boolean',},
        { field: 'Address_ward', headerName: 'Address_ward', width:200,},
        { field: 'District', headerName: 'District', width:200,},
        { field: 'Province', headerName: 'Province', width:200,},
        { field: 'Description', headerName: 'Description', width:200,},
       
      ];
      const [data, setData] = React.useState([])

      const rows = data.map((room)=>{
          var item ={};
          item.id = room._id;
          item.houseName = room.house_name;
          item.houseType = room.house_type;
          item.price = room.price;
          item.PeopleNumber = room.people_number;
          item.BedNumber = room.bed_number;
          item.Number_of_bedroom = room.number_of_bedroom;
          item.Number_of_bathroom = room.number_of_bathroom;
          item.People_max = room.people_max;
          item.Price_1_poeple_exceed = room.price_1_poeple_exceed;
          item.Status = room.status;
          item.Address_ward = room.address_ward;
          item.District = room.district;
          item.Province = room.province;
          item.Description = room.description;
          return item;
      })
      console.log(data)
      const token = useSelector(state=>state.login.jwt);
      console.log(rows)
      React.useEffect(()=>{

        // Request API.
        axios
          .get('http://localhost:1337/house-for-rents', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            setData(response.data)
            // console.log('Data: ', response.data);
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
          });
      },[])

     

    
    

      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid 
          rows={rows} 
          columns={columns} 
          pageSize={5}  
         
          // checkboxSelection 
          // onRowSelected={checkSelectRow}
          />
        </div>
      );
    }