import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import axiosInstance from "../DB/Axios";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",

        };
    }

    //   aici practic imi iau continutul din camp
    handleInput = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    };
    onSubmitFun = (event) => {//Ce se intampla cand dau pe butonul de sign in

        event.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password,
        };
        if(this.state.username==="Calugar Raul")
        {
            axiosInstance.post("/loginAdmin",credentials).then(
                res=>{
                    alert(res.data)
                    this.props.history.push("/admin")
                }
            )
        }
        else
        {

            axiosInstance
                .post("/login", credentials)
                .then((res) => {//Daca clientul este existent atunci va merge la pagina de marci ale magazinului


                    alert("Logare cu Succes")
                    //Pun clientul logat pe local Storage pentru a efectua diverse operatii cu el
                    localStorage.setItem("Client",JSON.stringify(res.data))
                    //Apoi merg in pagina de selectare a marcii pentru masini
                    this.props.history.push("/marca")

                }).catch((error) => {
                alert("Userul nu exista. \n" +
                    "Va rugam sa va faceti cont")
                console.log(error);
            });
        }

    };

    render() {

        return (
            <Container maxWidth="sm">
                <div>
                    <Grid>
                        <form onSubmit={this.onSubmitFun}>
                            <TextField//TextField in care introduc numele clientului
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="string"
                                onChange={this.handleInput}
                                autoFocus
                            />
                            <TextField//TextField in care introduc parola clientului
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.handleInput}
                                autoComplete="current-password"
                            />
                            <Button//Butonul de Sign In
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </form>
                    </Grid>
                </div>
                <div>
                    <button
                        onClick={() => {//Butonul de register

                            this.props.history.push("/register");
                        }}
                    >
                        Register
                    </button>
                    <button
                        onClick={() => {//Butonul de forgotPass

                            this.props.history.push("/forgotpassword");
                        }}
                    >
                        Forgot Password?
                    </button>

                </div>
            </Container>
        );
    }
}

export default Login;
