import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";

class Admin extends  React.Component
{
    constructor() {
        super();
    }

    componentDidMount() {

        this.connect()

    }


    connect= ()=>{

        let link = "/topic/socket/admin"
        const URL = "http://localhost:8080/socket"
        const websoket = new SockJS(URL)
        const stompClient = Stomp.over(websoket)
        stompClient.connect({},()=>{
            stompClient.subscribe(link,not=>{
              alert(not.body)

            })
        })


    }

    render() {
        return(
            <React.Fragment>

                <h1>
                    Pagina Administrator
                </h1>

                <div>

                    <ButtonGroup

                        justify-content="center"
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical contained primary button group"
                        variant="contained"
                    >
                        <Button color="secondary" style={{textAlign:"center"}} onClick={()=>{
                            this.props.history.push("/editareProduse")
                        }} >Editare Produse </Button>
                        <Button color="secondary" style={{textAlign:"center"}} onClick={()=>{
                            this.props.history.push("/editareClienti")
                        }} >Vizualizare Clienti</Button>

                        <Button color="secondary" style={{textAlign:"center"}} onClick={()=>{
                            this.props.history.push("/notificari")
                        }} >Notificari</Button>

                    </ButtonGroup>

                </div>


            </React.Fragment>
        )
    }
}
export  default Admin;