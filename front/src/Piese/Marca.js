/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axiosInstance from "../DB/Axios";
import Button from "@material-ui/core/Button";

class Marca extends React.Component{
    i;//Contor folosit pentru a itera lista de marci din baza de date
    aux=[]//Iau pentru toate numele din baza de date marcile(Numele lor)

    constructor() {
        super();
        this.state={
            marci:[],//Toate marcile din baza de date
            marca:""//Marca selectata
        }
        this.getAllMarca.bind(this)//Iau toate marcile din baza de date
        this.getAllModels.bind(this)//Ma duc la pagina de modele pentru marca selectata
    }

    componentDidMount(){
        this.getAllMarca()
    }

    getAllModels=()=>{//Iau marca selectata din ComboBox si merg la pagina de modele a marcii selectate

        let credentials = {
            marca:this.state.marca
        };

        //Salvez marca data de utilizator si ma duc la pagina de modele pentru marca selectata
        localStorage.setItem("MarcaMasina",JSON.stringify(credentials))
        this.props.history.push("/model")

    }

    getAllMarca=()=>{//Iau toate marcile din baza de date
        axiosInstance.get("/AllMarca").then(res=>
        {

            this.setState({
                marci:res.data,

            })
            for(this.i=0; this.i<res.data.length; this.i++)//In aux iau toate numele de marci din baza de date
            {
                this.aux[this.i]=this.state.marci[this.i].marca
            }


        }).catch((err)=>console.log(err))
    }

    logOut(){
        let client=JSON.parse(localStorage.getItem("Client"))
        let id=client.id
        axiosInstance.post(`/logout/${id}`).then(
            res=>{

                this.props.history.push("/login")
            }
        ).catch(err=>console.log(err))
    }


    render() {
        return (

            <React.Fragment>
                <h1>
                    Selectare Marca Masina
                </h1>
                <Autocomplete//ComboBox in care am toate marcile din baza de date

                    id="combo-box-demo"
                    options={this.aux}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    onChange={(event, value) => //Selectez marca selectata
                        this.setState(
                            {marca:value}
                        )}

                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                />



                <div>

                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.getAllModels()}>
                        Confirmare Selectie Model
                    </Button>

                </div>

                <div>
                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/client")}>
                        Pagina Client
                    </Button>
                </div>

                <div>
                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.logOut()}>
                        Log Out
                    </Button>
                </div>



            </React.Fragment>

        );
    }
}export default Marca;

//
