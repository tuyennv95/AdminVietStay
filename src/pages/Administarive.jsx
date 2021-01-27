import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import { BASE_API } from '../constant/index';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function Administrator() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.get("https://vapi.vnappmob.com/api/province")  //thanh pho
            .then((data) => {
                // console.log(data.data.results);
                setData(data.data.results);
            })
            .catch((err) => {
                console.log(err);
            })


    }, [])

    var list = [];
    for (let i = 0; i < data.length; i++) {
        data.map((item) => {
            list.push(data[i].province_id)
        })

    }

    const [Data2, setData2] = React.useState([]);
    var numberList = [];
    numberList = new Set(list);
    var arrList = [...numberList];

    //    console.log(arrList)
    const [list3, setList3] = React.useState([])
    var data22 = [];
    for (let i = 0; i < arrList.length; i++) {
        axios.get(`https://vapi.vnappmob.com/api/province/district/${arrList[i]}`)
            .then((data) => {
                // console.log(data.data.results);
                setList3(data.data.results);

            })
            .catch((err) => {
                console.log(err);
            })
        for (let j = 0; j < list3?.length; j++) {
            data22.push(list3[j].district_id);
        }


    }
    // console.log(typeof data22)
    var numberList2 = [];
    numberList2 = new Set(data22);
    var arrList3 = [...numberList2];


    const [xa, setXa] = React.useState([])

    for (let i = 0; i < arrList3?.length; i++) {
        axios.get(`https://vapi.vnappmob.com/api/province/ward/${arrList3[i]}`)
            .then((data) => {
                setXa(data.data.results);
                console.log(data.data.results);
                for(let n=0;n<xa.length;n++){
                    axios.post(`${BASE_API}/wards`,{
                        ward_id: xa[n].ward_id,
                        ward_name: xa[n].ward_name,
                        ward_type: xa[n].ward_type,
                        district_id: xa[n].district_id,
            
                    })}
            })
            .catch((err) => {
                console.log('loi')
            })
           
    }


    // }
    // }
    
    // console.log(list3)



    // console.log(data22)

    //   for(let i=0;i<data.length;i++){
    //       for(let i=0;)
    //     axios.get("http://localhost:1337/provinces",{
    //       province_id: data[i].province_id,
    //       province_name: data[i].province_name,
    //       province_type: data[i].province_type,
    //     })
    //     .then((reponse)=>{
    //         console.log(reponse)
    //     })
    //     .catch((error)=>{
    //         console.log("loi");
    //     })
    //   }


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}