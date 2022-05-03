import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from "../DB/Axios";
import {saveAs} from 'file-saver'
import Button from "@material-ui/core/Button";
const columns = [
    { field: 'nume', headerName: 'Nume', width: 180 },
    { field: 'descriere', headerName: 'Descriere', width: 250 },

    {
        field: 'pret',
        headerName: 'Pret',
        type: 'number',
        width: 90,
    },
    {
        field: 'cantitate',
        headerName: 'Cantitate',

        //sortable: false,
        width: 160,
        //valueGetter: (params) =>
        //  `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];//Definesc caracteristicile coloanelor

let data;
data=[]


class Produse extends  React.Component{
    i;
    vall=[]
    constructor() {
        super();
        this.state={
            products:[],//Produsele din baza de date
            selProd:[],
            model:""//Modelul selectat

        }
        this.getAllProducts.bind(this)//Iau toate produsele corespunzatoare unei marci din baza de date
        this.creareComanda.bind(this)
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

    componentDidMount(){
        this.setState({

            model:JSON.parse(localStorage.getItem("ModelMasina"))//Iau modelul care a fost selectat de utilizator

        })


        this.getAllProducts()
    }

    //Metoda care se executa cand apas butonul de creare a unei comenzi
    //Aici creez o comanda
    creareComanda(value){

        localStorage.setItem("Produse Comanadate",JSON.stringify(value))
        let temp=JSON.parse(localStorage.getItem("Client"))
        let id=temp.id

        //In value am produsele pe care le-am selectat pentru comanda



        axiosInstance.post(`/Comm/${id}`,value).then(
            res=>{
                alert("Comanda Realizata cu Succes")
                //Exportare Fisier XML
                let typeForBlob='text/xml;charset=utf-8'
                let blob = new Blob([res.data],{type:typeForBlob})
                saveAs(blob,"Users"+"."+typeForBlob)

                //In res.data am comanda care s-a realizat

            }
        ).catch(err=>console.log(err))




    }

    getAllProducts=()=>{

        //Vad ce model de masina a ales utilizatorul
        let val=JSON.parse(localStorage.getItem("ModelMasina"))

        let temp=val.model


        if(temp==="Toate"){//Daca utilizatorul doreste sa vada toate produsele, atunci va fi redirectionat la pagina unde se afla toate produsele din magazin

            axiosInstance.get("/AllProd").then(res=>
            {
                data=res.data
                this.setState({
                    products:res.data,

                })



            }).catch((err)=>console.log(err))
        }
        else{

            val=JSON.parse(localStorage.getItem("ModelMasina"))//Iau modelul care a fost dat de utilizator

            axiosInstance.post("/AllProduseModel",val).then(
                res=>{
                    this.setState({
                        products:res.data
                    })

                    data=res.data
                }
            ).catch(e=>
                console.log(e))
        }

    }//Iau toate produsele din baza de date

    render(){

        return(
            <React.Fragment>

                <h1>
                    Vizualizare Produse
                </h1>
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid rows={this.state.products}columns={columns} pageSize={5} checkboxSelection//Afisez pe tabel toate produsele selectate


                              onSelectionModelChange={(e) => {

                                  const selectedIDs = new Set(e.selectionModel);
                                  const selectedRowData = data.filter((row) =>
                                      selectedIDs.has(row.id)

                                  );

                                  //In vall am produsul curent pe care l-a selectat un client
                                  this.vall=selectedRowData


                              }}







                    />
                </div>



                <div>

                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={ () =>this.creareComanda(this.vall)}>
                        Inregistrare Comanda
                    </Button>



                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/marca")}>
                        Home
                    </Button>


                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/client")}>
                        Pagina Client
                    </Button>

                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.props.history.push("/review")}>
                        Review
                    </Button>

                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={() => this.logOut()}>
                        Log Out
                    </Button>
                </div>
            </React.Fragment>


        )

    }



}export  default  Produse;







