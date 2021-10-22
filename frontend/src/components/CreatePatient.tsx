import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import "date-fns";
import SaveIcon from "@material-ui/icons/Save";
import ReplyIcon from '@material-ui/icons/Reply';
import Box from "@material-ui/core/Box";

import { GenderInterface } from "../models/IGender";
import { AllergyInterface } from "../models/IAllergy";
import { Underlying_diseaseInterface } from "../models/IUnderlying_disease";
import { RecorderInterface } from "../models/IRecorder";
import { PatientInterface } from "../models/IPatient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function CreatePatient() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [genders, setGenders] = useState<GenderInterface[]>([]);
  const [underlying_diseases, setUnderlying_diseases] = useState<
    Underlying_diseaseInterface[]
  >([]);
  const [allergys, setAllergys] = useState<AllergyInterface[]>([]);
  const [recorders, setRecorders] = useState<RecorderInterface[]>([]);
  const [patient, setPatient] = useState<Partial<PatientInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,"Content-Type": "application/json" },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof patient;
    setPatient({
      ...patient,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof patient;
    const { value } = event.target;
    setPatient({ ...patient, [id]: value });
  };

  const getGender = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getunderlying_diseases = async () => {
    fetch(`${apiUrl}/underlying_diseases`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUnderlying_diseases(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getAllergy = async () => {
    fetch(`${apiUrl}/allergys`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAllergys(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getRecorder = async () => {
    fetch(`${apiUrl}/recorders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRecorders(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getGender();
    getunderlying_diseases();
    getAllergy();
    getRecorder();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      GenderID: convertType(patient.GenderID),
      AllergyID: convertType(patient.AllergyID),
      Underlying_diseaseID: convertType(patient.Underlying_diseaseID),
      RecorderID: convertType(patient.RecorderID),
      Id_card: patient.Id_card,
      FirstName: patient.FirstName,
      LastName: patient.LastName,
      Age: convertType(patient.Age),
      Birthdate: selectedDate,
    };

    const requestOptionsPost = {
      method: "POST",
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/patients`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }
  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          ลงทะเบียนสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          ลงทะเบียนไม่สำเร็จ
        </Alert>
      </Snackbar>

      <Paper className={classes.paper}>
        <Typography variant="h6" color="primary" gutterBottom>
          ระบบลงทะเบียนข้อมูลผู้ป่วย
        </Typography>
        <br />
        <Divider />
        <br />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="Id_card"
                required
                label="หมายเลขประจำตัวประชาชน"
                type="string"
                value={patient.Id_card}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                id="FirstName"
                required
                label="ชื่อ"
                type="string"
                value={patient.FirstName}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                required
                id="LastName"
                label="นามสกุล"
                type="string"
                value={patient.LastName}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>เพศ</InputLabel>
              <Select
                label="เพศ"
                id="GenderID"
                value={patient.GenderID}
                onChange={handleChange}
                variant="outlined"
                inputProps={{
                  name: "GenderID",
                }}
              >
                {genders.map((item: GenderInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.Identity}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="วัน/เดือน/ปีเกิด"
                variant="inline"
                inputVariant="outlined"
                name="Birthdate"
                id="Birthdate"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <TextField
                label="อายุ"
                id="Age"
                variant="outlined"
                onChange={handleInputChange}
                value={patient.Age}
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประวัติการแพ้ยา</p>
              <Select
                id="outlined-select-currency"
                value={patient.AllergyID}
                onChange={handleChange}
                inputProps={{
                  name: "AllergyID",
                }}
              >
                {allergys.map((item: AllergyInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.Information}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>โรคประจำตัว</p>
              <Select
                id="Underlying_diseaseID"
                value={patient.Underlying_diseaseID}
                onChange={handleChange}
                inputProps={{
                  name: "Underlying_diseaseID",
                }}
              >
                {underlying_diseases.map(
                  (item: Underlying_diseaseInterface) => (
                    <MenuItem key={item.ID} value={item.ID}>
                      {item.Information}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="right" m={1}>
              เจ้าหน้าที่เวชระเบียน
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                id="RecorderID"
                value={patient.RecorderID}
                onChange={handleChange}
                inputProps={{
                  name: "RecorderID",
                }}
              >
                {recorders.map((item: RecorderInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.FirstName + ' ' + item.LastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={submit}
            startIcon={<SaveIcon />}
          >
            SUBMIT
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            component={RouterLink}
            to="/patients"
            variant="contained"
            color="primary"
            
            startIcon={<ReplyIcon />}
          >
            BACK
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
export default CreatePatient;
