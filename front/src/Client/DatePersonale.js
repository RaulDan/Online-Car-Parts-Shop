import React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from "@material-ui/icons/Create";
import ListIcon from '@material-ui/icons/List';


//Pagina in care clientul isi vede datele personale  si le poate modifica
class DatePersonale extends React.Component{

    constructor() {
        super();
        this.state={
            client: {
                id:0,
                nume:"",
                parola:"",
                email:"",
                numarTelefon:""
            }//JSON.parse(localStorage.getItem("Client"))
        }


    }

    componentDidMount() {



        this.setState({
            client:JSON.parse(localStorage.getItem("Client"))
        })

    }

    editareClient()
    {
        let id=this.state.client.id
        localStorage.setItem("idClient",id)
        this.props.history.push("/modificareClient")
    }

    afisareLogariClient()
    {
        localStorage.setItem("clientSelectat",JSON.stringify(this.state.client.id))
        this.props.history.push("/vizualizareLogariClienti")
    }

    render() {


        return (
            <React.Fragment>




                <div>
                    <Typography variant="h4" style={style}>Detalii Client {this.state.client.nume}</Typography>
                    <Table>
                        <TableHead>

                            <TableRow>


                                <TableCell>
                                    Nume
                                </TableCell>
                                <TableCell>
                                    Parola
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    NumarTelefon
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableHead>



                            <TableRow>
                                <TableCell>
                                    {this.state.client.nume}
                                </TableCell>

                                <TableCell>
                                    {localStorage.getItem("Parola")}
                                </TableCell>

                                <TableCell>
                                    {this.state.client.email}
                                </TableCell>

                                <TableCell>
                                    {this.state.client.numarTelefon}
                                </TableCell>

                                <TableCell align="right" onClick={() => this.editareClient()}>
                                    <CreateIcon />
                                </TableCell>

                                <TableCell align="right" onClick={() =>this.afisareLogariClient()}>
                                    <ListIcon />
                                </TableCell>

                            </TableRow>

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
export  default DatePersonale
