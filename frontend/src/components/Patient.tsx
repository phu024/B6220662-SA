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
import { GenderInterface } from "../models/IGender";
import { AllergyInterface } from "../models/IAllergy";
import { Underlying_diseaseInterface } from "../models/IUnderlying_disease";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Patient() {
  const classes = useStyles();
  const [patients, setPatients] = useState<PatientInterface[]>([]);

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
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลผู้ป่วย
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/patients/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="20%">
                  หมายเลขบัตรประชาชน
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="10%">
                  นามสกุล
                </TableCell>
                <TableCell align="center" width="10%">
                  อายุ
                </TableCell>
                <TableCell align="center" width="10%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="25%">
                  โรคประจำตัว
                </TableCell>
                <TableCell align="center" width="25%">
                  ประวัติการแพ้ยา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient: PatientInterface) => (
                <TableRow key={patient.ID}>
                  <TableCell align="center">{patient.Id_card}</TableCell>
                  <TableCell align="center">{patient.FirstName}</TableCell>
                  <TableCell align="center">{patient.LastName}</TableCell>
                  <TableCell align="center">{patient.Age}</TableCell>
                  <TableCell align="center">
                    {patient.Gender.Identity}
                  </TableCell>
                  <TableCell align="center">
                    {patient.Underlying_disease.Information}
                  </TableCell>
                  <TableCell align="center">
                    {patient.Allergy.Information}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Patient;
