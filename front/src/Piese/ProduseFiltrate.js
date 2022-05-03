import React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";



class ProduseFiltrate extends  React.Component{


    constructor(props) {
        super(props);
        this.state={
            prod:JSON.parse(localStorage.getItem("produseFiltrate"))
        }
    }




    render() {

        return(
            <React.Fragment>
                <h1>
                    Produse Filtrate
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
                                this.state.prod.map(

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

export default ProduseFiltrate
