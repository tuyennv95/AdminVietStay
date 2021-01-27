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
import { InputLabel, Select, TextField, FormControl } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { BASE_API } from '../constant/index';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        marginLeft: '20px'
    },
    input_avatar: {
        display: 'none',

    }
}));

export default function FormType(props) {
    const classes = useStyles();
    const key = props.location.pathname;
    const [id, setId] = React.useState();
    const keyRepair = queryString.parse(key)
    // console.log(keyRepair.id)
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    React.useEffect(() => {
        setId(keyRepair?.id)
    }, [])
    const [text, setText] = React.useState({
        housename: '',
        id_typehouse: '',
        price: 0,
        people_number: 0,
        bed_number: 0,
        number_of_bedroom: 0,
        number_of_bathroom: 0,
        people_max: 0,
        price_1_poeple_exceed: 0,
        status: false,
        address_ward: '',
        provinces_id: '',
        districts_id: '',
        description: '',
        utilities: [],
        img_house: [],
        img_avatar_house: {},
    });
    const token = document.cookie;
    console.log(text)
    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    React.useEffect(() => {
        if (id) {
            axios.get(`${BASE_API}/type-rooms/${id}`)
                .then(response => {
                    console.log(response.data)
                    setText({
                        ...text,
                        name: response.data.name,
                        description: response.data.Description,

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
        history.push("/room-type")
    }
    // console.log(token1)
    function buttonRepair() {
        axios.put(`${BASE_API}/type-rooms/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token1}`,
            // },

            name: text.name,
            Description: text.description,

        },

        )
            .then((response) => {
                console.log(response)
                history.push("/room-type")
            })
            .catch((error) => {
                console.log(error)
            })


    }
    // console.log(text, text.email, text.phone)

    function buttonAdd() {
        // axios.post(`${BASE_API}/type-rooms`, {

        //     name: text.name,
        //     Description: text.description,


        // },

        // )
        //     .then((response) => {
        //         console.log(response)
        //         history.push("/room-type")
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        console.log(text)


    }
    function handleChange() {

    }
    //! ------Call lay name type home
    const [dataType, setDataType] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${BASE_API}/type-rooms`)
            .then((response) => {
                setDataType(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    //!------Call api lay tinh
    const [dataTinh, setDataTinh] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${BASE_API}/provinces`).
            then((response) => {
                setDataTinh(response.data)
            })
            .catch((error) => {
                console.log("error")
            })
    }, [])
    //!-------------call api lay data quan huyen
    const [dataHuyen, setDataHuyen] = React.useState([])
    React.useEffect(() => {
        // if (text.provinces_id) {
        axios.get(`${BASE_API}/districts?province_id=${text.provinces_id}`).
            then((response) => {
                setDataHuyen(response.data)
            })
            .catch((error) => {
                console.log("error")
            })
        // }

    }, [text.provinces_id])
    // console.log(dataTinh)
    // const [dataSelect, setDataSelect] = React.useState({
    //     provinces:'',
    // })
    // function changeInputSelect(e){
    //     const {name, value} = e.target;
    //     setDataSelect({...dataSelect,
    //         [name]:value,
    //     })
    // }
    //  !up anh avarta
    // const [selectFile, setSelectFile] = React.useState(null)
    // function upload(e) {
    //     // console.log(e.target.files[0])
    //     setSelectFile(e.target.files[0])
    // }
    // function buttonAdd() {
    //     const data = new FormData();
    //     data.append('files', selectFile)
    //     axios.post(`${BASE_API}/upload`, data)
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
    // console.log(selectFile)
    ///!up anh trinh chieu
    const [selectFile2, setSelectFile2] = React.useState([]);
    function upload2(e) {
        setSelectFile2(e.target.files)
    }
    function buttonAdd() {
        const data2 = new FormData();
        for (var x = 0; x < selectFile2.length; x++) {
            data2.append('file', selectFile2[x])
        }
        axios.post(`${BASE_API}/upload`, data2)
            .then((response) => {
                console.log(response)
            })
    }
    console.log(selectFile2)
    // !call api lay util
    const [dataUtil, setDataUtil] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${BASE_API}/utilities`)
            .then((response) => {
                setDataUtil(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div className={classes.formUser}>
            <h2 className={classes.textAddUser}>{id ? 'Repair Room' : 'Add Room'}</h2>
            <div className={classes.form} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '30%' }}>

                    {/* //!----------name-------- */}
                    <TextField
                        className={classes.input}
                        id="standard-housename-input"
                        label="Tên phòng"
                        type="text"
                        autoComplete="current-housename"
                        name="housename"
                        value={text.housename}
                        onChange={changeInput}
                    />
                    {/* //!-------------Type---------- */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Loại phòng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={text.id_typehouse}
                            name="id_typehouse"
                            onChange={changeInput}
                        >
                            {dataType.map(type => {
                                return (
                                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                    {/* //! price */}
                    <TextField
                        className={classes.input}
                        id="standard-price-input"
                        label="Giá/1 đêm"
                        type="number"
                        autoComplete="current-price"
                        name="price"
                        value={text.price}
                        onChange={changeInput}
                    />
                    {/* //!number people */}
                    <TextField
                        className={classes.input}
                        id="standard-people-number-input"
                        label="Số người"
                        type="number"
                        autoComplete="current-people-number"
                        name="people_number"
                        value={text.people_number}
                        onChange={changeInput}
                    />

                    {/* //!bed number */}
                    <TextField
                        className={classes.input}
                        id="standard-bed-number-input"
                        label="Số giường ngủ"
                        type="number"
                        autoComplete="current-bed-number"
                        name="bed_number"
                        value={text.bed_number}
                        onChange={changeInput}
                    />
                    {/* //!number_of_bedroom */}
                    <TextField
                        className={classes.input}
                        id="standard-number_of_bedroom-input"
                        label="Số phòng ngủ"
                        type="number"
                        autoComplete="current-number_of_bedroom"
                        name="number_of_bedroom"
                        value={text.number_of_bedroom}
                        onChange={changeInput}
                    />

                    {/* <TextField
                    className={classes.input}
                    id="standard-number_of_bedroom-input"
                    label="Số phòng ngủ"
                    type="number"
                    autoComplete="current-number_of_bedroom"
                    name="number_of_bedroom"
                    value={text.number_of_bedroom}
                    onChange={changeInput}
                /> */}
                    {/* //! number_of_bathroom */}
                    <TextField
                        className={classes.input}
                        id="standard-number_of_bathroom-input"
                        label="Số phòng tắm"
                        type="number"
                        autoComplete="current- number_of_bathroom"
                        name="number_of_bathroom"
                        value={text.number_of_bathroom}
                        onChange={changeInput}
                    />
                    {/* //! people_max */}
                    <TextField
                        className={classes.input}
                        id="standard-people_max-input"
                        label="Số người max"
                        type="number"
                        autoComplete="current- people_max"
                        name="people_max"
                        value={text.people_max}
                        onChange={changeInput}
                    />
                </div>
                <div style={{ width: '30%' }}>

                    {/* //! price_1_poeple_exceed */}
                    <TextField
                        className={classes.input}
                        id="standard-price_1_poeple_exceed-input"
                        label="Phí/1người vượt quá/1đêm"
                        type="number"
                        autoComplete="current- price_1_poeple_exceed"
                        name="price_1_poeple_exceed"
                        value={text.price_1_poeple_exceed}
                        onChange={changeInput}
                    />
                    {/* //! status */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={text.status}
                            name="status"
                        type="boolean"

                            onChange={changeInput}
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>

                    {/* //! tỉnh */}


                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Tỉnh, Thành Phố</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={text.provinces_id}
                            name="provinces_id"
                            onChange={changeInput}
                        >
                            {dataTinh.map(tinh => {
                                return (
                                    <MenuItem key={tinh.id} value={tinh.province_id}>{tinh.province_name}</MenuItem>

                                )
                            })}

                        </Select>
                    </FormControl>
                    {/* //! huyeenj */}


                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Quận, Huyện</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={text.districts_id}
                            name="districts_id"
                            onChange={changeInput}
                        >
                            {dataHuyen.map(huyen => {
                                return (
                                    <MenuItem key={huyen.id} value={huyen.district_id}>{huyen.district_name}</MenuItem>

                                )
                            })}

                        </Select>
                    </FormControl>

                    {/* //!Duong, xa, quan */}
                    <TextField
                        className={classes.input}
                        id="standard-address_ward-input"
                        label="Số nhà, đường, phường xã"
                        type="text"
                        autoComplete="current- address_ward"
                        name="address_ward"
                        value={text.address_ward}
                        onChange={changeInput}
                    />
                    {/* //!-------------des */}
                    <TextareaAutosize
                        rowsMax={600}
                        aria-label="maximum height"
                        placeholder="Description"
                        name="description"
                        value={text.description}
                        onChange={changeInput}

                    />
                    {/* //!avarta house */}
                </div>
                <div style={{ width: '30%' }}>
                    <div >
                        <img style={{ width: '50px', height: '50px' }} src="" alt="" />
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input_avatar}
                                id="contained-button-file"

                                type="file"
                                name="img_avatar_house"
                                // onChange={upload}
                            />

                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span" style={{ marginTop: '20px', marginLeft: '20px' }}>
                                    Đổi ảnh đại diện
                        </Button>
                            </label>
                        </div>
                    </div>
                    {/* -------//!anh trinh chieu */}
                    <div >
                        <img style={{ width: '250px', height: '250px' }} src="" alt="" />
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input_avatar}
                                id="contained-button-file"
                                type="file"
                                name="file"
                                onChange={upload2}
                                multiple
                            />

                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span" style={{ marginTop: '20px', marginLeft: '20px' }}>
                                    Ảnh trình chiếu
                        </Button>
                            </label>
                        </div>
                    </div>
                    {/* -------util */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Tiện ích</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            name="utilities"
                            value={text.utilities}
                            onChange={changeInput}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {dataUtil.map((item) => (
                                <MenuItem key={item._id} value={item._id} >
                                    {item.utilities_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>


            {/* ------------------ */}
            <div className={classes.button}>
                <Button className={classes.button_confirm} variant="contained" onClick={huy}>
                    Hủy
</Button>
                {!id
                    ?
                    <Button className={classes.button_confirm} variant="contained" color="primary"
                        onClick={buttonAdd}
                    >
                        Add
                    </Button>
                    :
                    <Button className={classes.button_confirm} variant="contained" color="primary"
                        onClick={buttonRepair}
                    >
                        Sửa
            </Button>
                }

            </div>
        </div>
    );
}

