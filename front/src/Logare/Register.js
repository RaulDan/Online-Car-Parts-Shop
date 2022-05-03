import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import axiosInstance from "../DB/Axios";
class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            telephone: "",
        };
    }

    //   aici practic imi iau continutul din camp
    handleInput = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });


    };
    onSubmitFun = (event) => {//Ce se intampla cand apas butonul de register

        event.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            telephone: this.state.telephone,
        };
        localStorage.setItem("Parola",credentials.password)
        axiosInstance
            .post("/RegClient",credentials)
            .then(res => {
                if(res.data==="gasit")//Daca clientul este existent, afisez mesaj
                {
                    alert("Acest client exista deja in magazin")
                }
                else{//Daca inregistrarea s-a facut cu succes merg la pagina principala din magazin
                    alert("Cont creat cu succes")
                    this.props.history.push("/login")
                }



            })
            .catch((error) => {
                alert("Date introduse gresit")
                console.log(error);
            });
    };

    render() {
        const textt="[0-9]+"
        const val={
            minlength:3
        }
        const val1={
            minlength: 10,
            maxlength:10,

        }



        //  localStorage.removeItem("Active user");
        //  localStorage.removeItem("USER");
        //  localStorage.removeItem("USER_ID");
        return (
            <Container maxWidth="sm">
                <div>
                    <Grid>
                        <form onSubmit={this.onSubmitFun}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required="required"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="string"
                                onChange={this.handleInput}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                inputProps={val}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.handleInput}
                                autoComplete="current-password"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                type="Email"
                                name="email"
                                autoComplete="string"
                                onChange={this.handleInput}
                                autoFocus
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                inputProps={val1}
                                fullWidth
                                id="telephone"
                                label="Telephone"
                                name="telephone"
                                type="string"
                                autoComplete="off"
                                onChange={this.handleInput}
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </form>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default Register;
