import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axiosInstance from "../DB/Axios";

class ObservareReview extends React.Component{


    constructor() {
        super();
        this.state={
            reviews:[],
            numeProdus:""
        }
    }

    componentDidMount() {
        this.getAllReviews()
    }

    getAllReviews()
    {
        let val=JSON.parse(localStorage.getItem("produsReview"))
        let numeProdus=JSON.parse(localStorage.getItem("numeProdusReview"))


        axiosInstance.post("/Reviews",val+"").then(res=>{
            this.setState({
                reviews:res.data,
                numeProdus:numeProdus
            })

        }).then(e=>console.log(e))
    }

    render() {

        return(
            <React.Fragment>

                <h1>
                    Vizualizare Review {this.state.numeProdus}
                </h1>

                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Nume Client</TableCell>
                                <TableCell align="right">Data</TableCell>
                                <TableCell align="right">Review</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.reviews.map((row) => (
                                <TableRow key={row}>
                                    <TableCell component="th" scope="row">
                                        {row.utilizator}
                                    </TableCell>
                                    <TableCell align="right">{row.data}</TableCell>
                                    <TableCell align="right">{row.review}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </React.Fragment>
        )
    }
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default ObservareReview