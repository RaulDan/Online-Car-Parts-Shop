import React from "react";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import axiosInstance from "../DB/Axios";

class AdaugareReview extends React.Component{


    constructor() {
        super();

        this.state={
            Review:""
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
        let name=nume.nume
        let id=JSON.parse(localStorage.getItem("produsReview"))
        let credentials = {
            id:id,
            review:this.state.Review,
            nume:name
        };

        axiosInstance.post("/review",credentials).then(res=>
            {

                this.props.history.push("/review")
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
                                    id="Review"
                                    label="Review"
                                    name="Review"
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
                                    Adaugare Review
                                </Button>
                            </form>
                        </Grid>
                    </div>
                </Container>
            </React.Fragment>
        )
    }

}

export default AdaugareReview
