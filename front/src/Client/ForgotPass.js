import React from "react";
import axiosInstance from "../DB/Axios";
class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            codeValidation: 0,
            codeValidationModified: null,
            newPassword: "",
            changePassword: "",
            viewCodeValidation: false,
            viewNewPassword: false,
        };
    }

    updateAttributes = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });

    };

    handleInsert = (e) => //Ce se intampla cand apas primul buton din pagina, unde dau sa confirm utilizatorul
    {

        e.preventDefault();

        this.setState({
            viewCodeValidation: true,
        });
        let body = {
            username: this.state.username,
            cod:0,
            parola:""
        };

        axiosInstance
            .post("/forgotpassword", body)
            .then((response) => {
                response.data.parola=""

                this.setState({
                    username: response.data.username,
                    codeValidation: response.data.cod,
                });
            })
            .catch((e) => {
                alert("Utilizator Inexistent")
                console.log(e)
            });
    };

    handleValidation = (e) => {//Ce se intampla cand apas al doilea buton
        e.preventDefault();

        if (this.state.codeValidationModified === this.state.codeValidation) {
            this.setState({
                changePassword: true,
                viewNewPassword: true,
            });
        } else {
            alert("Cod Incorect")
            this.setState({
                changePassword: false,
            });
        }

    };

    handleChangePassword = (e) => {//Ce se intampla cand apas al treilea buton

        if (this.state.changePassword) {
            e.preventDefault();
            let body = {
                username: this.state.username,
                cod:this.state.codeValidation,
                parola:this.state.newPassword
            };
            axiosInstance
                .post("/modificareParola", body)
                .then((response) => {
                    this.setState({
                        username: response.data.username,
                        codeValidation: response.data.codeValidation,
                    });
                    this.props.history.push("/marca")
                })
                .catch((e) => console.log(e));
        }
    };

    render() {
        return (
            <div>
                <div>
                    <h3>Forgot Password Page</h3>
                    <input//CE se intampla cand dau numele de utilizator si apas primul buton
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.updateAttributes}
                    ></input>
                    <button type="subimit" onClick={this.handleInsert}>
                        Confirm username
                    </button>
                </div>

                <div>
                    {this.state.viewCodeValidation ? (
                        <h3>
                            <h3>Code validation</h3>
                            <input
                                type="number"
                                placeholder="Code Validation"
                                name="codeValidationModified"
                                value={this.state.codeValidationModified}
                                onChange={this.updateAttributes}
                            ></input>
                            <button type="subimit" onClick={this.handleValidation}>
                                Confirm new password
                            </button>
                        </h3>
                    ) : null}
                </div>

                <div>
                    {this.state.viewNewPassword ? (
                        <h3>
                            <h3>New password</h3>
                            <input
                                type="text"
                                placeholder="New Password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={this.updateAttributes}
                            ></input>
                            <button type="subimit" onClick={this.handleChangePassword}>
                                Confirm validation code
                            </button>
                        </h3>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
