import React from 'react';
import axiosInstance from "../DB/Axios";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import Typography from '@material-ui/core/Typography';

import ListIcon from "@material-ui/icons/List";

class EditareClienti extends  React.Component{

    constructor() {
        super();
        this.state={
            clients:[]
        }

        this.getAllClients.bind(this)
    }

    componentDidMount() {
        this.getAllClients()
    }

    afisareLogareClient(data)
    {
        localStorage.setItem("clientSelectat",JSON.stringify(data.id))
        this.props.history.push("/vizualizareLogariClienti")
    }

    getAllClients=()=>{

        axiosInstance.get("/AllClients").then(

            res=>{


                this.setState(
                    {

                        clients:res.data
                    }
                )
            }
        ).then(e=>console.log(e))

    }

    render() {
        return(

            <React.Fragment>

                <h1>
                    Pagina Vizualizare Clienti
                </h1>

                <div>
                    <Typography variant="h4" style={style}>Lista Clientilor din Magazin</Typography>
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
                                    Email
                                </TableCell>
                                <TableCell>
                                    Parola
                                </TableCell>
                                <TableCell>
                                    NumarTelefon
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableHead>

                            {
                                this.state.clients.map(

                                    row=>(
                                        <TableRow key={row.id}>

                                            <TableCell>
                                                {row.id}
                                            </TableCell>


                                            <TableCell>
                                                {row.nume}
                                            </TableCell>
                                            <TableCell>
                                                {row.email}
                                            </TableCell>
                                            <TableCell>
                                                {row.parola}
                                            </TableCell>
                                            <TableCell>
                                                {row.numarTelefon}
                                            </TableCell>
                                            <TableCell align="right" onClick={() =>this.afisareLogareClient(row)}>
                                                <ListIcon />
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


export default EditareClienti
