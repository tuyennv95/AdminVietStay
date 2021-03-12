import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchInput from '../component/SearchInput';
import DataTableHouse from '../component/DataTableHouse';
import axios from 'axios';
import { BASE_API } from '../constant/index';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: '10px'

    },
    button: {
        margin: '10px',
    },
    button1: {
        width: '100%',
        textAlign: 'right',
    }


}));

export default function House() {
    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = React.useState([]);
    const [idHouse, setIdHouse] = React.useState();
    const token = document.cookie;
    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    React.useEffect(() => {

        // Request API.
        axios.get('http://localhost:1337/house-for-rents')
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log('An error occurred:', error.response);
            });
    },[])
    function addHouse() {
        history.push("houses/add");
    }
    function getData(data) {
        setIdHouse(data)
    }
    function delHouse() {
        // eslint-disable-next-line no-restricted-globals
        const alertConfrm = confirm(`Bạn có muốn xóa phongf só id:${idHouse}`);
        if (alertConfrm === true) {
            axios.delete(`${BASE_API}/house-for-rents/${idHouse}`)
                .then((response) => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    function repairHouse(){
        history.push(`houses/repair&id=${idHouse}`)
    }
    return (
        <div className={classes.search}>
            <h2 className={classes.title}>Houses</h2>
            <div className={classes.button1}>
                <Button className={classes.button} variant="contained" color="primary"
                    onClick={addHouse}
                >Thêm</Button>
                <Button className={classes.button} variant="contained"
                    disabled={idHouse ? false : true}
                    onClick={repairHouse}

                    >Sửa</Button>
                <Button className={classes.button} variant="contained" color="secondary"
                    onClick={delHouse}
                    disabled={idHouse ? false : true}

                >Xóa</Button>
            </div>

            <DataTableHouse data={data} sendData={getData} />
        </div>
    );
}