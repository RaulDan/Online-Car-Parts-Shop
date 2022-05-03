import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import axiosInstance from "../DB/Axios";
class ModificaProdus extends React.Component {
    constructor() {
        super();
        this.state = {
            // id: null,
            nume: "",
            descriere: "",
            pret: 0,
            cantitate: 0,
        };
    }

    //   aici practic imi iau continutul din camp
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
            descriere: this.state.descriere,
            pret: this.state.pret,
            cantitate: this.state.cantitate,
        };

        let id=localStorage.getItem("idProdus")
        axiosInstance.put(`/ModificareProdus/${id}`,credentials).then(
            res=> {

                this.props.history.push("/editareProduse")
            }
        ).catch(e=>console.log(e))
    };

    render() {

        return (
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
                                name="descriere"
                                label="descriere"

                                id="descriere"
                                onChange={this.handleInput}
                                autoComplete="string"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="pret"
                                label="pret"
                                name="pret"
                                autoComplete="number"
                                onChange={this.handleInput}
                                autoFocus
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="cantitate"
                                label="cantitate"
                                name="cantitate"
                                autoComplete="number"
                                onChange={this.handleInput}
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                ModificareProdus
                            </Button>
                        </form>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default ModificaProdus;
