import React from "react";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axiosInstance from "../DB/Axios";

class FiltruProduse extends React.Component
{

    constructor(props) {
        super(props);
        this.state={
            min:0,
            max:0,
            minn:"",
            maxx:"",
            produse:[]
        }
    }

    handleInput = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });

        // console.log(value)
    };

    filtrare(data)
    {
        let min=this.state.min
        let max=this.state.max
        let i=0
        let rez=[]
        for(i=0;i<data.length;i++)
        {
            if(data[i].pret>min && data[i].pret<max){
                rez.push(data[i])
            }
        }

        this.setState({
            produse:rez
        })
        console.log("STATE:",rez)

        localStorage.setItem("produseFiltrate",JSON.stringify(this.state.produse))
        console.log("OO:",this.state.produse)

        this.props.history.push("/rezFiltru")
    }

    onSubmitFun = (event) => {

        event.preventDefault();
        let credentials = {
            min:this.state.min,
            max:this.state.max
        };

        let val={
            minn:this.state.min+"",
            maxx:this.state.max+""

        }

        console.log(credentials)
        axiosInstance.post("/filtru",credentials).then(
            res=>{
                // this.setState({
                //     produse:res.data
                // })
                this.filtrare(res.data)
                console.log("RESULT:",res.data)
            }
        ).then(e=>console.log(e))
        // console.log("X:",typeof credentials.cantitate);
        // let id=localStorage.getItem("idClient")
        // axiosInstance.put(`/modificaClient/${id}`,credentials).then(
        //     res=> {
        //         console.log("Client",res.data)
        //         //  this.props.history.push("/editareProduse")
        //     }
        // ).catch(e=>console.log(e))
    };


    render() {
        return (
            <React.Fragment>

                <h1>
                    Filtrare Produse
                </h1>
                <Container maxWidth="sm">
                    <div>
                        <Grid>
                            <form onSubmit={this.onSubmitFun}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="min"
                                    label="Min"
                                    name="min"
                                    autoComplete="number"
                                    onChange={this.handleInput}
                                    autoFocus
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="max"
                                    label="Max"
                                    name="max"
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
                                    Aplicare Filtru
                                </Button>

                                <Button variant="contained" color="primary"  fullWidth onClick={() => this.props.history.push("/client")}>
                                    Pagina Client
                                </Button>
                                <Button variant="contained" color="primary"  fullWidth onClick={() => this.props.history.push("/marca")}>
                                    Home
                                </Button>
                            </form>
                        </Grid>
                    </div>
                </Container>



            </React.Fragment>


        );
    }


}

export default FiltruProduse
