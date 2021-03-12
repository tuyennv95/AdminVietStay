import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateTime(props) {
  const classes = useStyles();
    const [fromData, setFrom] = React.useState();
    const [toData, setTo] = React.useState();
    function onChangeData(e){
        const {name, value} = e.target;
        setFrom({...fromData, 
            [name]: value});
        props.sendData(fromData);
    }
    

    console.log(fromData)
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="from"
        type="date"
        defaultValue="2021-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="from"
        value={fromData?.from}
        onChange={onChangeData}
      />
      <TextField
        id="date"
        label="to"
        type="date"
        defaultValue="2021-02-02"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="to"
        value={fromData?.to}
        onChange={onChangeData}
      />
    </form>
  );
}