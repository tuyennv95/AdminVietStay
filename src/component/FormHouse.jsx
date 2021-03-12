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
import ImgTrinhChieu from './ImgTrinhChieu';
const useStyles = makeStyles((theme) => ({
    formUser: {
        width: '100%',

    },
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
        width: '100%',


    }
}));

export default function FormType(props) {
    const classes = useStyles();
    const key = props.location.pathname;
    const [id, setId] = React.useState();
    const keyRepair = queryString.parse(key);
    const [textHuyen, setTextHuyen] = React.useState();
    const [textTinh, setTextTinh] = React.useState();
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
        acreage: 0,
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
        img_avatar_house: {},
        img_house: [],
    });
    const token = document.cookie;
    const token1 = token.slice(token.indexOf("tuyennguyen=") + 12, token.indexOf(","));
    React.useEffect(() => {
        if (id) {
            axios.get(`${BASE_API}/house-for-rents/${id}`)
                .then(response => {
                    console.log(response.data)
                    setText({
                        ...text,
                        housename: response.data.house_name,
                        id_typehouse: response.data.id_typehouse,
                        acreage: response.data.acreage,
                        price: response.data.price,
                        people_number: response.data.people_number,
                        bed_number: response.data.bed_number,
                        number_of_bedroom: response.data.number_of_bedroom,
                        number_of_bathroom: response.data.number_of_bathroom,
                        people_max: response.data.people_max,
                        price_1_poeple_exceed: response.data.price_1_poeple_exceed,
                        status: response.data.status,
                        address_ward: response.data.address_ward,
                        provinces_id: response.data.provinces_id,
                        districts_id: response.data.districts_id,
                        description: response.data.description,
                        utilities: response.data.utilities,
                        img_avatar_house: response.data.img_avatar_house,
                        img_house: response.data.img_house,

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
            ...text, [name]: value,
        });
    }
    const history = useHistory();
    function huy() {
        history.push("/houses")
    }
    function buttonRepair() {
        axios.put(`${BASE_API}/house-for-rents/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token1}`,
            // },

            house_name: text.housename,
            id_typehouse: text.id_typehouse,
            acreage: text.acreage,
            price: text.price,
            people_number: text.people_number,
            bed_number: text.bed_number,
            number_of_bedroom: text.number_of_bedroom,
            number_of_bathroom: text.number_of_bathroom,
            people_max: text.people_max,
            price_1_poeple_exceed: text.price_1_poeple_exceed,
            status: text.status,
            address_ward: text.address_ward,
            provinces_id: text.provinces_id,
            districts_id: text.districts_id,
            description: text.description,
            utilities: text.utilities,
            img_avatar_house: text.img_avatar_house,
            img_house: text.img_house,
            keySearch: text.address_ward + textHuyen + textTinh,


        },

        )
            .then((response) => {
                console.log(response)
                history.push("/houses")
            })
            .catch((error) => {
                console.log(error)
            })


    }

    // function buttonAd() {
    //     axios.post(`${BASE_API}/house-for-rents`, {

    //         house_name: text.housename,
    //         id_typehouse: text.id_typehouse,
    //         price: text.price,
    //         people_number: text.people_number,
    //         bed_number: text.bed_number,
    //         number_of_bedroom: text.number_of_bedroom,
    //         number_of_bathroom: text.number_of_bathroom,
    //         people_max: text.people_max,
    //         price_1_poeple_exceed: text.price_1_poeple_exceed,
    //         status: text.status,
    //         address_ward: text.address_ward,
    //         provinces_id: text.provinces_id,
    //         districts_id: text.districts_id,
    //         description: text.description,
    //         utilities: [...text.utilities],
    //         img_avatar_house: text.img_avatar_house,
    //         // img_house: [...text.img_house]

    //     })
    //         .then((response) => {
    //             console.log(response)
    //             // history.push("/house-for-rents")
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         }
    // }

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


    //  !up anh avarta
    const [selectFile, setSelectFile] = React.useState(null)
    const [dataAvatar, setDataAvatar] = React.useState(null);
    const [url, setUrlI] = React.useState('');
    function upload(e) {
        e.preventDefault()
        setSelectFile(e?.target?.files[0])
        var file = e.target.files[0];

        var reader = new FileReader();
        setUrlI(URL.createObjectURL(e.target.files[0]))
        // reader.onloaded = function(){

        // }
        // reader.readAsText(file);
    }
    function setAvt() {
        var data = new FormData();
        data.append('files', selectFile);
        setDataAvatar(data);
        console.log(data)
        axios.post(`${BASE_API}/upload/`, data)
            .then((response) => {
                console.log(response);
                console.log(response.data[0].url)
                setText({ ...text, img_avatar_house: response.data[0] })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    ///!up anh trinh chieu
    // var [listAnh, setListAnh] = React.useState([]);

    const [selectFile2, setSelectFile2] = React.useState([]);
    function upload2(e) {
        e.preventDefault()
        setSelectFile2(e?.target?.files);



    }
    function setImg() {
        console.log('aa')
        let data2 = new FormData();
        for (let x = 0; x < selectFile2.length; x++) {
            data2.append('files', selectFile2[x])
        }

        // setDataImg(data2)
        axios.post(`${BASE_API}/upload/`, data2)
            .then((response) => {
                console.log(response.data)
                // setListAnh=[...response.data];
                setText({ ...text, img_house: [...response.data] })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    console.log(text.districts_id)
    console.log(text.provinces_id)
    
    React.useEffect(()=>{
        axios.get(`${BASE_API}/provinces?province_id=${text.provinces_id}`)
        .then((response) => {
            setTextTinh(response?.data[0]?.province_name)
        })
    },[text.provinces_id])
    React.useEffect(()=>{
        axios.get(`${BASE_API}/districts?district_id=${text.districts_id}`)
        .then((response) => {
            setTextHuyen(response?.data[0]?.district_name)
            // console.log(response?.data[0].district_name)
        })
    },[text.districts_id])
    // console.log(textHuyen, textTinh)
       
    function buttonAdd() {

        axios.post(`${BASE_API}/house-for-rents`, {
            house_name: text.housename,
            id_typehouse: text.id_typehouse,
            acreage: text.acreage,
            price: text.price,
            people_number: text.people_number,
            bed_number: text.bed_number,
            number_of_bedroom: text.number_of_bedroom,
            number_of_bathroom: text.number_of_bathroom,
            people_max: text.people_max,
            price_1_poeple_exceed: text.price_1_poeple_exceed,
            status: text.status,
            address_ward: text.address_ward,
            provinces_id: text.provinces_id,
            districts_id: text.districts_id,
            description: text.description,
            utilities: [...text.utilities],
            img_avatar_house: text.img_avatar_house,
            img_house: text.img_house,
            keySearch: text.address_ward + textHuyen + textTinh,
        })
            .then((response) => {
                history.push("/houses")
            })
            .catch((error) => {
                console.log(error);
            })

    }
    return (
        <div className={classes.formUser}>
            <h2 className={classes.textAddUser}>{id ? 'Repair Room' : 'Add Room'}</h2>
            <div className={classes.form} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '50%' }}>

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
                    {/* //! acreage */}
                    <TextField
                        className={classes.input}
                        id="standard-price-input"
                        label="Diện tích"
                        type="number"
                        autoComplete="current-acreage"
                        name="acreage"
                        value={text.acreage}
                        onChange={changeInput}
                    />
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
                <div style={{ width: '50%' }}>


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
                    <br />

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

                    <br />
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
                        style={{ marginLeft: '20px', height: '100px', marginTop: '20px', width: '200px' }}
                        aria-label="maximum height"
                        placeholder="Description"
                        name="description"
                        value={text.description}
                        onChange={changeInput}

                    />
                    {/* -------//!util */}
                    <br />
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                {/* //!avarta house */}
                <div >
                    <img style={{ width: '200px', height: '150px' }} src={url} alt="" />
                    <div>
                        <input
                            accept="image/*"
                            className={classes.input_avatar}
                            id="contained-button-file"
                            // ref="upload" 
                            type="file"
                            name="img_avatar_house"
                            onChange={upload}
                        />

                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{ marginTop: '20px', marginLeft: '20px' }}>
                                Ảnh đại diện
                        </Button>
                        </label>
                        <Button onClick={setAvt} variant="contained" color="" style={{ marginTop: '17px' }}>Ok</Button>
                    </div>
                </div>

                {/* -------//!anh trinh chieu */}

                <div >
                    <div style={{ width: '350px', height: '350px', backgroundColor: 'gray' }}>
                        {/* {url2.map((ur)=>{
                        <img src="" alt="" />
                    })} */}
                    </div>


                    <div>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            name="img_house"
                            type="file"
                            onChange={upload2}
                        />
                        <Button onClick={setImg} variant="contained">Ok</Button>

                    </div>
                </div>
            </div>
            {/* <Button variant="contained" size="small" onClick={setImage}> Set Image</Button> <br /> */}



            {/* ------------------ */}
            <div className={classes.button} style={{ width: '100%', display: 'flex', marginTop: '50px' }}>
                <Button style={{ width: '50%' }} className={classes.button_confirm} variant="contained" onClick={huy}>
                    Hủy
</Button>
                {!id
                    ?
                    <Button style={{ width: '50%' }} className={classes.button_confirm} variant="contained" color="primary"
                        onClick={buttonAdd}
                    >
                        Add
                    </Button>
                    :
                    <Button style={{ width: '50%' }} className={classes.button_confirm} variant="contained" color="primary"
                        onClick={buttonRepair}
                    >
                        Sửa
            </Button>
                }

            </div>
        </div>
    );
}


