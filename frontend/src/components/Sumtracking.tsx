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
import { RequestcustomersInterface } from "../models/IRequestcustomer";
import { format } from 'date-fns'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
        table: {
            minWidth: 800,
        },
        tableSpace: {
            marginTop: 10,
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

export default function Sumtracking() {
    const classes = useStyles();
    const [requescustomers, setRequestcustomers] = useState<RequestcustomersInterface[]>([]);
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const getRequestcustomers = async () => {
        fetch(`${apiUrl}/requestcustomers`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setRequestcustomers(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getRequestcustomers();
    }, []);

    return (
        <div>
            <div className={classes.drawerHeader} />
            <Container className={classes.container} maxWidth="xl">
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            Tracking
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Track"
                            variant="contained"
                            color="primary"
                        >
                            Save recived track
                        </Button>
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


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requescustomers.map((item: RequestcustomersInterface) => (
                                <TableRow key={item.ID}>
                                    <TableCell align="center">{item.ID}</TableCell>
                                    <TableCell align="center">{item.Team}</TableCell>
                                    <TableCell align="center">{item.Source}</TableCell>
                                    <TableCell align="center">{item.FW}</TableCell>
                                    <TableCell align="center">{item.Timerequested}</TableCell>
                                    <TableCell align="center">{item.Product}</TableCell>
                                    <TableCell align="center">{item.QTY}</TableCell>
                                    <TableCell align="center">{item.Level}</TableCell>
                                    <TableCell align="center">{item.ID_Ar}</TableCell>
                                    <TableCell align="center">{item.Drive_sn}</TableCell>
                                    <TableCell align="center">{item.HSA_sn}</TableCell>
                                    <TableCell align="center">{item.Faliure_mode}</TableCell>
                                    <TableCell align="center">{item.Failhead}</TableCell>
                                    <TableCell align="center">{item.Engowner}</TableCell>
                                    <TableCell align="center">{item.Sender}</TableCell>
                                    <TableCell align="center">{item.remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}