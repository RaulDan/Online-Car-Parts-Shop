import React from 'react';
import axiosInstance from "../DB/Axios";

import Table from '@material-ui/core/Table';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";




class EditareProduse extends React.Component{

    showw=false
    constructor() {
        super();
        this.state={
            products:[],
            form:false
        }

        this.getAllProducts.bind(this)
        this.editareProdus.bind(this)
        this.stergereProdus.bind(this)
        this.aparitie.bind(this)
    }
    getAllProducts=()=>{
        axiosInstance.get("/AllProd").then(res=>
        {



            this.setState({
                products:res.data
            })


        }).catch((err)=>console.log(err))
    }//Iau toate produsele din baza de date

    componentDidMount() {
        this.getAllProducts()
    }

    stergereProdus(prod)
    {

        axiosInstance.delete(`Stergere/${prod.id}`);
        window.location.reload()

    }

    aparitie=()=>{

        return(
            <div>
                <Dialog open>
                    <DialogTitle>
                        Modificare
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Modificare Date Produs
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                </Dialog>

            </div>
        )
    }

    editareProdus=(prod)=>
    {

        localStorage.setItem("idProdus",prod.id)
        this.props.history.push("/modificareProdus")





    }

    render() {

        return(
            <React.Fragment>
                <h1>
                    Lista Produselor Din Magazin
                </h1>


                {this.showw ?(

                    <div>

                        {
                            this.aparitie()

                        }
                    </div>
                ):null}


                <div>
                    <Typography variant="h4" style={style}>Lista Produse</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>

                                <TableCell>
                                    Id
                                </TableCell>
                                <TableCell>
                                    Nume
                                </TableCell>
                                <TableCell>
                                    Descriere
                                </TableCell>
                                <TableCell>
                                    Pret
                                </TableCell>
                                <TableCell>
                                    Cantitate
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableHead>

                            {
                                this.state.products.map(

                                    row=>(
                                        <TableRow key={row.id}>

                                            <TableCell>
                                                {row.id}
                                            </TableCell>


                                            <TableCell>
                                                {row.nume}
                                            </TableCell>
                                            <TableCell>
                                                {row.descriere}
                                            </TableCell>
                                            <TableCell>
                                                {row.pret}
                                            </TableCell>
                                            <TableCell>
                                                {row.cantitate}
                                            </TableCell>
                                            <TableCell align="right" onClick={() => this.editareProdus(row)}>
                                                <CreateIcon />
                                            </TableCell>

                                            <TableCell align="right" onClick={() => this.stergereProdus(row)}>
                                                <DeleteIcon /></TableCell>
                                        </TableRow>

                                    )
                                )
                            }

                        </TableHead>

                    </Table>




                </div>


            </React.Fragment>

        )
    }




}
const style ={
    display: 'flex',
    justifyContent: 'center'
}


export  default  EditareProduse