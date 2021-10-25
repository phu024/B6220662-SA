import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { PatientInterface } from "../models/IPatient";
import React from "react";
import SignIn from "./signinRecroder";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 800,
    },
    tableSpace: {
      marginTop: 20,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function ListPatient() {
  const classes = useStyles();
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  const [token, setToken] = React.useState<String>("");

  const getPatients = async () => {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/patients`, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setPatients(res.data);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    getPatients();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }


  return (
    <div>
      <Container className={classes.container} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              ระบบลงทะเบียนข้อมูลผู้ป่วย
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/patients/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูลผู้ป่วยใหม่
            </Button>
          </Box>
        </Box>
        <p></p>
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h1"
                variant="h6"
                color="primary"
                gutterBottom
              >
                รายการผู้ป่วย
              </Typography>
            </Box>
          </Box>
          
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="15%">
                    หมายเลขประจำตัวประชาชน
                  </TableCell>
                  <TableCell align="center" width="15%">
                    ชื่อ-นามสกุล
                  </TableCell>
                  <TableCell align="center" width="10%">
                    วัน/เดือน/ปีเกิด
                  </TableCell>
                  <TableCell align="center" width="10%">
                    อายุ
                  </TableCell>
                  <TableCell align="center" width="10%">
                    เพศ
                  </TableCell>
                  <TableCell align="center" width="15%">
                    โรคประจำตัว
                  </TableCell>
                  <TableCell align="center" width="15%">
                    ประวัติการแพ้ยา
                  </TableCell>
                  <TableCell align="center" width="10%">
                    เวชระเบียน
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {patients.map((patient: PatientInterface) => (
                <TableRow key={patient.ID}>
                  <TableCell align="center">{patient.Id_card}</TableCell>
                  <TableCell align="center">{patient.FirstName+' '+patient.LastName}</TableCell>
                  <TableCell align="center">{moment(patient.Birthdate).format('D/MM/YYYY')}</TableCell>
                  <TableCell align="center">{patient.Age}</TableCell>
                  <TableCell align="center">{patient.Gender.Identity}</TableCell>
                  <TableCell align="center">{patient.Underlying_disease.Information}</TableCell>
                  <TableCell align="center">{patient.Allergy.Information}</TableCell>
                  <TableCell align="center">{patient.Recorder.FirstName}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
         
        </Paper>

      </Container>

    </div >
  );
}
export default ListPatient;