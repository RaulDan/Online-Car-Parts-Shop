import React from "react";
import axiosInstance from "../DB/Axios";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from "@material-ui/icons/Create";

import FolderIcon from '@material-ui/icons/Folder';

class Review extends React.Component{


    constructor() {
        super();
        this.state={
            products:[]
        }
    }

    componentDidMount() {
        this.getAllProducts()
    }

    getAllProducts=()=>{
        axiosInstance.get("/AllProd").then(res=>
        {
            this.setState({
                products:res.data
            })


        }).catch((err)=>console.log(err))
    }//Iau toate produsele din baza de date

    creareReview(data)
    {
        localStorage.setItem("produsReview",JSON.stringify(data.id))

        this.props.history.push("/adaugareReview")
    }

    vizualizareReview(data){

        localStorage.setItem("produsReview",JSON.stringify(data.id))
        localStorage.setItem("numeProdusReview",JSON.stringify(data.descriere))
        this.props.history.push("/Reviews")
    }

    render() {
        return(
            <React.Fragment>
                <h1>
                    Pagina Review Produse
                </h1>

                <div>

                    <Typography variant="h4" style={style}>Lista Produse</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>


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
                                            {/*Buton de creare review*/}
                                            <TableCell align="right" onClick={() => this.creareReview(row)}>
                                                <CreateIcon />
                                            </TableCell>
                                            <TableCell align="right" onClick={() => this.vizualizareReview(row)}>
                                                <FolderIcon />
                                            </TableCell>


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

export default  Review
