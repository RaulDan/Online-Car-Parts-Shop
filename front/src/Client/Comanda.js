import * as React from 'react';
import {makeStyles} from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axiosInstance from "../DB/Axios";
// import TextField from "@material-ui/core/TextField";
//
//
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import DateTimePicker from '@material-ui/lab/DateTimePicker';
// import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
// import DesktopDateTimePicker from '@material-ui/lab/DesktopDateTimePicker';
// //import Stack from '@material-ui/core/Stack';
import {saveAs} from 'file-saver'

class Comanda extends  React.Component
{

    constructor() {
        super();
        this.state={
            Zi:0,
            Luna:0,
            An:0,
            Ora:0,
            Minut:0,
            Secunde:0
        }
    }

    componentDidMount() {

        this.setState({lista:JSON.parse(localStorage.getItem("com"))})

    }

    handleInput = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });


    };
    onSubmitFun = (event) => {
        event.preventDefault();
        this.creareComanda()
        console.log("Rrsdnds")
    }

    creareComanda(){

        let temp=JSON.parse(localStorage.getItem("Client"))
        let id=temp.id
        let value=JSON.parse(localStorage.getItem("Produse Comanadate"))
        console.log("VALL:",value)
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

       // let tempp=JSON.parse(localStorage.getItem("Client"))
        let idClient=temp.id
        let zi={
            Zi:this.state.Zi,
            Luna:this.state.Luna,
            An:this.state.An,
            Ora:this.state.Ora,
            Minut:this.state.Minut,
            Secunde:this.state.Secunde
        }
        let dt=""
        dt=dt+zi.Zi+"-"+zi.Luna+"-"+zi.An+" at "+zi.Ora+":"+zi.Minut+":"+zi.Secunde
        console.log("TYEP:",typeof dtAux)
        let dtAux={
            dt
        }
        axiosInstance.post(`/MailComanda/${idClient}`,dtAux).then(
            res=>{
                console.log(res.data)
            }
        ).catch(e=>console.log(e))
    }

    render() {

        //const [value, setValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));
        return(

            <React.Fragment>
                <h1>
                    Inregistrare Ora Comanda
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
                                    id="Zi"
                                    label="Zi"
                                    name="Zi"
                                    type="number"
                                    //autoComplete="string"
                                    onChange={this.handleInput}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="Luna"
                                    label="Luna"
                                    type="number"
                                    id="Luna"
                                    onChange={this.handleInput}
                                    //autoComplete="string"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="An"
                                    label="An"
                                    name="An"
                                  
                                    onChange={this.handleInput}
                                    autoFocus
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Ora"
                                    label="Ora"
                                    name="Ora"
                                    
                                    onChange={this.handleInput}
                                    autoFocus
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Minut"
                                    label="Minut"
                                    name="Minut"

                                    onChange={this.handleInput}
                                    autoFocus
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Secunde"
                                    label="Secunde"
                                    name="Secunde"

                                    onChange={this.handleInput}
                                    autoFocus
                                />
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Inregistrare Comanda
                                </Button>
                            </form>
                        </Grid>
                    </div>
                </Container>

            </React.Fragment>


        )

    }
}export  default Comanda;


