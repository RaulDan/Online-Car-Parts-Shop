import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axiosInstance from "../DB/Axios";
import Button from "@material-ui/core/Button";

class Model extends  React.Component{
    i=0;
    aux=[]
    constructor() {


        super();
        this.state={
            model:"",//Modelul selectat
            modele:[]//Toate modelele din baza de date
        }
        this.getAllModels.bind(this)//Iau toate modelele pentru o marca
        this.getAllProducts.bind(this)//Iau toate produsele (piesele) pentru un model

    }



    getAllProducts(){
        let val={
            model:this.state.model
        }

        //Pentru modelul din cadrul marcii selectat de utilizator afisez produsele
        localStorage.setItem("ModelMasina",JSON.stringify(val))
        this.props.history.push("/produse")



    }
    getAllModels=()=>{//Iau toate modelele din baza de date


        let val=JSON.parse(localStorage.getItem("MarcaMasina"))//Iau marca care a fost selectata de utilizator

        axiosInstance.post("/AllProdMarca",val).then(//Iau toate modelele respective pentru maraca selectata de utilizator
            res=>{
                this.setState({
                    modele:res.data//Iau modelele
                })

                for(this.i=0;this.i<res.data.length;this.i++)//Iau doar numele modelelor
                {
                    this.aux[this.i]=res.data[this.i].model
                }
                this.aux.push("Toate")

            }
        ).catch(e=>console.log(e))

    }

    componentDidMount() {

        this.getAllModels()
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

        return(
            <React.Fragment>

                <h1>
                    Selectare Model Masina
                </h1>
                <Autocomplete//Combobox in care am toate modelele pentru a anumita marca

                    id="combo-box-demo"
                    options={this.aux}
                    //options={this.state.marci.marca}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    onChange={(event, value) =>
                        this.setState(
                            {model:value})}//Iau modelul curet selectat

                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                />

                <div>

                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.getAllProducts()}>
                        Confirmare Selectie Model
                    </Button>
                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.logOut()}>
                        Log Out
                    </Button>
                </div>



            </React.Fragment>

        )
    }


}



export default  Model