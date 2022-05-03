import React from "react";
import axiosInstance from "../DB/Axios";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Abuz extends React.Component{



    constructor() {
        super();

        this.state={
            Abuz:""
        }

    }

    handleInput = (event) => {

        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });



    };
    onSubmitFun = (event) => {

        event.preventDefault();

        let nume=JSON.parse(localStorage.getItem("Client"))

        let idClient=nume.id
        let val={
            Abuz:this.state.Abuz
        }
        console.log("ID:",idClient+" VAL:",val)
        axiosInstance.post(`Abuz/${idClient}`,val).then(res=>
            {

                this.props.history.push("/Client")
            }

        ).then(e=>console.log(e))


    };

    render() {
        return(
            <React.Fragment>

                <Container maxWidth="sm">
                    <div>
                        <Grid>
                            <form onSubmit={this.onSubmitFun}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Abuz"
                                    label="Abuz"
                                    name="Abuz"
                                    autoComplete="string"
                                    onChange={this.handleInput}
                                    autoFocus
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Raportare Abuz
                                </Button>
                            </form>
                        </Grid>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
    
}


export default Abuz