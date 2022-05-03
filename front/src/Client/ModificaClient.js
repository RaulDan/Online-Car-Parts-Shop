import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import axiosInstance from "../DB/Axios";

class ModificaClient extends React.Component{

    constructor() {
        super();

        this.state={

            nume: "",
            parola: "",
            email: "",
            numarTelefon:""


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
        let credentials = {
            nume: this.state.nume,
            parola: this.state.parola,
            email: this.state.email,
            numarTelefon: this.state.numarTelefon,
        };

        let id=localStorage.getItem("idClient")
        axiosInstance.put(`/modificaClient/${id}`,credentials).then(
            res=> {
                alert("Date modificate cu succes")
            }
        ).catch(e=>console.log(e))
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
                                    id="nume"
                                    label="nume"
                                    name="nume"
                                    autoComplete="string"
                                    onChange={this.handleInput}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="parola"
                                    label="parola"

                                    id="parola"
                                    onChange={this.handleInput}
                                    autoComplete="string"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="email"
                                    name="email"
                                    autoComplete="string"
                                    onChange={this.handleInput}
                                    autoFocus
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="numarTelefon"
                                    label="numarTelefon"
                                    name="numarTelefon"
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
                                    Modificare Client
                                </Button>
                            </form>
                        </Grid>
                    </div>
                </Container>

            </React.Fragment>
        )
    }

}

export default ModificaClient;