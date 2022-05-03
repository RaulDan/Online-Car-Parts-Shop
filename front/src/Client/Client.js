import React from "react";
import Button from "@material-ui/core/Button";



class Client extends React.Component{




    render() {

        return(

            <React.Fragment>
                <h1>
                    Pagina Principala Client
                </h1>

                <div>

                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/data")}>
                        Vizualizare Date Personale
                    </Button>
                </div>



                <div>
                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/filtru")}>
                        Cautare Avansata
                    </Button>

                </div>
                <div>
                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/review")}>
                        Review
                    </Button>
                </div>

                <div>
                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/abuz")}>
                        Raportare Abuz
                    </Button>
                </div>

            </React.Fragment>
        )
    }
}

export  default Client