import { SetStateAction, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";


import { UsersInterface } from "../models/IUser";
import { StatusesInterface } from "../models/IStatus";
import { RequestcustomersInterface } from "../models/IRequestcustomer";
import { TrackInterface } from "../models/ITrack";
import { TextField } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { format } from 'date-fns'





const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={1} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 800,
    },
    tableSpace: {
      marginTop: 10,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  })
);

export default function Track() {
  const classes = useStyles();
  const [users, setUsers] = useState<Partial<UsersInterface>>({});
  const [statuses, setStatuses] = useState<StatusesInterface[]>([]);
  const [requestcustomers, setRequestcustomers] = useState<RequestcustomersInterface[]>([]);
  const [track, setTrack] = useState<Partial<TrackInterface>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [tracks, setTracks] = useState<TrackInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
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
    const name = event.target.name as keyof typeof track;
    setTrack({
      ...track,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };


  const getUsers = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getStatuses = async () => {
    fetch(`${apiUrl}/statuses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStatuses(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getRequestcustomer = async () => {
    fetch(`${apiUrl}/requestcustomers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRequestcustomers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getTracks = async () => {
    fetch(`${apiUrl}/tracks`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setTracks(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getUsers();
    getStatuses();
    getRequestcustomer();
    getTracks();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      UserID: convertType(users?.ID),
      StatusID: convertType(track.StatusID),
      RequestcustomerID: convertType(track.RequestcustomerID),
      Labremark: (track.Labremark),
      TimeRecived: selectedDate,

    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/tracks`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
          setErrorMessage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
          setErrorMessage(res.error)
        }
      });
  }


  return (
    <div>
      <div className={classes.drawerHeader} />
      <Container className={classes.container} maxWidth="md">

        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            บันทึกสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            บันทึกไม่สำเร็จ : {errorMessage}
          </Alert>
        </Snackbar>

        <br></br>

        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Save track
            </Typography>
          </Box>
        </Box>
        <Divider />


        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>ผู้เข้าใช้ระบบ</p>
            <Select
              native
              disabled
              value={track.UserID}
            // onChange={handleChange}
            // inputProps={{
            //   name: "UserID",
            // }}
            >
              <option aria-label="None" value="">
                {users?.GID}
              </option>

            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>Track</p>
            <Select
              native
              value={track.RequestcustomerID}
              onChange={handleChange}
              inputProps={{
                name: "RequestcustomerID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือก ID
              </option>
              {requestcustomers.map((item: RequestcustomersInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.ID}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>Status</p>
            <Select
              native
              value={track.StatusID}
              onChange={handleChange}
              inputProps={{
                name: "StatusID",
              }}
            >
              <option aria-label="None" value="">
                State
              </option>
              {statuses.map((item: StatusesInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.State}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <br></br> <br></br>

        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <p>วันที่และเวลาที่บันทึก</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                name="TimeRecived"
                value={selectedDate}
                onChange={handleDateChange}
                label=""
                minDate={new Date("2018-01-01T00:00")}
                format="yyyy/MM/dd hh:mm a"
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>

        <br></br> <br></br>

        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <option aria-label="None" value="">
              Labremark
            </option>

            <br></br>

            <TextField
              id="Labremark"
              name="Labremark"
              label="Enter Remark"
              type="string"
              variant="outlined"
              fullWidth
              multiline
              value={track.Labremark || ""}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <br></br> <br></br>

        <Button
          style={{ float: "left" }}
          variant="contained"
          onClick={submit}
          color="primary"
        >
          Save
        </Button>
      </Container>

      <br></br> <br></br>


      <div><Container className={classes.container} maxWidth="xl">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการ tracking
            </Typography>
          </Box>

        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center" width="5%">
                  No
                </TableCell>
                <TableCell align="center" width="5%">
                  Team
                </TableCell>
                <TableCell align="center" width="17%">
                  Source
                </TableCell>
                <TableCell align="center" width="16%">
                  FW
                </TableCell>
                <TableCell align="center" width="11%">
                  Timerequested
                </TableCell>
                <TableCell align="center" width="4%">
                  Product
                </TableCell>
                <TableCell align="center" width="16%">
                  QTY
                </TableCell>
                <TableCell align="center" width="5%">
                  Level
                </TableCell>
                <TableCell align="center" width="14%">
                  ID_Ar
                </TableCell>
                <TableCell align="center" width="20%">
                  Drive_sn
                </TableCell>
                <TableCell align="center" width="20%">
                  HSA_sn
                </TableCell>
                <TableCell align="center" width="20%">
                  Faliure_mode
                </TableCell>
                <TableCell align="center" width="20%">
                  Failhead
                </TableCell>
                <TableCell align="center" width="20%">
                  Engowner
                </TableCell>
                <TableCell align="center" width="20%">
                  Sender
                </TableCell>
                <TableCell align="center" width="20%">
                  remark
                </TableCell>
                <TableCell align="center" width="20%">
                  Name
                </TableCell>
                <TableCell align="center" width="20%">
                  Position
                </TableCell>
                <TableCell align="center" width="20%">
                  Status
                </TableCell>
                <TableCell align="center" width="20%">
                Labremark
                </TableCell>
                <TableCell align="center" width="20%">
                  TimeRecived
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.map((item: TrackInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Team}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Source}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.FW}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Timerequested}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Product}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.QTY}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Level}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.ID_Ar}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Drive_sn}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.HSA_sn}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Faliure_mode}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Failhead}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Engowner}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.Sender}</TableCell>
                  <TableCell align="center">{item.Requestcustomer.remark}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.User.Position}</TableCell>
                  <TableCell align="center">{item.Status.State}</TableCell>
                  <TableCell align="center">{item.Labremark}</TableCell>
                  <TableCell align="center">{format((new Date(item.TimeRecived)), 'dd MMMM yyyy hh:mm a')}
                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container></div>

    </div >


  );
}