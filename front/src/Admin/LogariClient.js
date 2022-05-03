import React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import axiosInstance from "../DB/Axios";

class  LogariClient extends React.Component{

    constructor() {
        super();
        this.state={
            logari:[]
        }
    }

    getAllLogins(){
        let client=JSON.parse(localStorage.getItem("clientSelectat"))
        let id=client
        axiosInstance.post(`/dataLogari/${id}`).then(
            res=>{

                this.setState({
                    logari:res.data
                })
            }
        )
    }

    componentDidMount() {
        this.getAllLogins()
    }

    render() {

        return(
            <React.Fragment>

                <h1>
                    Vizualizare Istoric Logari {JSON.parse(localStorage.getItem("clientSelectat")).nume}
                </h1>

                <div>
                    <Typography variant="h4" style={style}>Lista Logarilor pentru {JSON.parse(localStorage.getItem("Client")).nume}</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>



                                <TableCell>
                                    Data LogIn
                                </TableCell>
                                <TableCell>
                                    Data LogOut
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableHead>

                            {
                                this.state.logari.map(

                                    row=>(
                                        <TableRow key={row.id}>





                                            <TableCell>
                                                {row.dataLogin}
                                            </TableCell>
                                            <TableCell>
                                                {row.dataLogout}
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

export default LogariClient
