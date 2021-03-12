import * as React from 'react';
import { XGrid, useApiRef } from '@material-ui/x-grid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_API } from '../constant/index';
import { DataGrid } from '@material-ui/data-grid';
import thunk from 'redux-thunk';

export default function DataTableHouse(props) {
  // console.log(props.data)
  const columns = [
    { field: 'id', headerName: 'ID', width: 250, },
    { field: 'houseName', headerName: 'House Name', width: 200, },
    { field: 'Status', headerName: 'Status', width: 200, },

    { field: 'price', headerName: 'Price', width: 200, },
    { field: 'PeopleNumber', headerName: 'PeopleNumber', width: 200, },
    { field: 'BedNumber', headerName: 'BedNumber', width: 200, },
    { field: 'Number_of_bedroom', headerName: 'Number_of_bedroom', width: 200, },
    { field: 'Number_of_bathroom', headerName: 'Number_of_bathroom', width: 200, },
    { field: 'People_max', headerName: 'People_max', width: 200, },
    { field: 'Price_1_poeple_exceed', headerName: 'Price_1_poeple_exceed', width: 200, },
    { field: 'Address_ward', headerName: 'Address_ward', width: 200, },
    { field: 'District', headerName: 'District', width: 200, },
    { field: 'Province', headerName: 'Province', width: 200, },
    { field: 'Description', headerName: 'Description', width: 200, },
    { field: 'houseType', headerName: 'House Type', width: 300, },
    { field: 'numberBook', headerName: 'numberBook', width: 300, },


  ];
  const [data, setData] = React.useState([])
  async function getType(id) {
    const res = await axios.get(`${BASE_API}/type-rooms/${id}`)
    return res.data.name;
  }
  async function getNumberBill(id) {
    const res = await axios.get(`${BASE_API}/bills?houseId=${id}`)
    return res.data.length;
  }
  React.useEffect(async () => {
    let data = [];
    for (let i = 0; i < props.data.length; i++) {
      const element = props.data[i];
      console.log(element);

      const numberBill = await getNumberBill(element.id);
      const typeName = await getType(element.id_typehouse)
      data.push({ ...element, numberBill: numberBill, typeName: typeName })
    }
    setData(data);
    console.log(data);


  }, [props.data])
  // console.log('1', props.data);
  const rows = data?.map((room) => {
    var item = {};

    item.id = room._id;
    // console.log(room._id)
    item.houseName = room.house_name;
    item.price = room.price;
    item.PeopleNumber = room.people_number;
    item.BedNumber = room.bed_number;
    item.Number_of_bedroom = room.number_of_bedroom;
    item.Number_of_bathroom = room.number_of_bathroom;
    item.People_max = room.people_max;
    item.Price_1_poeple_exceed = room.price_1_poeple_exceed;
    item.Status = room.status === true ? 'Phòng hiện có người thuê' : 'Phòng trống';
    item.Address_ward = room.address_ward;
    item.District = room.provinces_id;
    item.Province = room.districts_id;
    item.Description = room.description;
    item.houseType = room.typeName;
    item.numberBook = room.numberBill;

    return item;
  })
  // const rows = [
  //   { id: 1, name: 'React' },
  //   { id: 2, name: 'Material-UI' },
  // ]
  // console.log(rows)
  // console.log(data)
  const token = useSelector(state => state.login.jwt);
  // console.log(rows)


  function checkSelectRow(e) {
    props.sendData(e.data.id);
  }




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