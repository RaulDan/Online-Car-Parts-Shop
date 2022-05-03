import React from "react";
import axiosInstance from "../DB/Axios";
import { makeStyles } from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Product extends React.Component{

    constructor() {
        super();
        this.state={
            products:[]
        };
        this.getAllProducts.bind(this)
    };

    componentDidMount() {
        this.getAllProducts()

        //this.showProducts()
    }

    getAllProducts=()=>{
        axiosInstance.get("/AllProd").then(res=>
        {

            console.log(res.data)
            this.setState({
                products:res.data,
                prod:res.data
            })
            console.log("V:",this.state.products)

        }).catch((err)=>console.log(err))
    }

    //listt=this.state.products;

    showProducts=()=>{

        const prodList=this.state.products
        //const classes = useStyles();
        console.log("KFnefnesgn")
        console.log(this.state.products)
        console.log("sngidsngipfgndspogdsn")
        return(

            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nume</TableCell>
                            <TableCell align="right">Descriere</TableCell>
                            <TableCell align="right">Pret</TableCell>
                            <TableCell align="right">Cantitate</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            this.state.products.map(
                                prodd=>
                                    (
                                        <TableRow key={prodd.id}>

                                            <TableCell component="th" scope="row">
                                                {prodd.id}
                                            </TableCell>

                                            <TableCell align="right">{prodd.nume}</TableCell>
                                            <TableCell align="right">{prodd.descriere}</TableCell>
                                            <TableCell align="right">{prodd.pret}</TableCell>
                                            <TableCell align="right">{prodd.cantitate}</TableCell>
                                            <TableCell style={{marginLeft: "10px"}} onClick={ () => console.log("B2")} className="btn btn-danger">Delete </TableCell>
                                        </TableRow>
                                    )

                            )
                        }


                    </TableBody>

                </Table>

            </TableContainer>
        )

    };

    render() {
        console.log("RR:",this.state.products)
        return(

            this.showProducts()

        )
    }

}export  default Product;
