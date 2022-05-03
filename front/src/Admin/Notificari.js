import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import Accordion from "../Home/Accordion"


let Data = [
    {
        title: 'Section 1',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
    laborum cupiditate possimus labore, hic temporibus velit dicta earum
    suscipit commodi eum enim atque at? Et perspiciatis dolore iure
    voluptatem.`
    },
    {
        title: 'Section 25',
        content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
    reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
    quaerat iure quos dolorum accusantium ducimus in illum vero commodi
    pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
    quidem maiores doloremque est numquam praesentium eos voluptatem amet!
    Repudiandae, mollitia id reprehenderit a ab odit!`
    },
    {
        title: 'Section 3',
        content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
    quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
    dolor ut sequi minus iste? Quas?`
    }
];


class Notificari extends React.Component{


    constructor() {
        super();
        this.state={

            valori:[{
                title:"",
                content:""

            }]

        }


    }



    componentDidMount() {
        this.setState({
            valori:JSON.parse(localStorage.getItem("notificari"))
        })
        this.connect()
    }

    connect=()=>{
        Data.push({title:"SS",content:"SSS"})
        //  Data.push({"tr","trtr"})
        console.log(Data)
        /// console.log("PRengdsngdsngfds")
        let link="/topic/socket/notificari"
        // console.log(link)
        const URL="http://localhost:8080/socket"
        const websoket = new SockJS(URL)
        const stompClient = Stomp.over(websoket)
        stompClient.connect({},()=>{
            stompClient.subscribe(link,not=>{


                let ss=not.body
                let i=ss.indexOf("\n")

                let val={
                    title:ss.substring(0,i),
                    content:ss.substring(i,ss.length)
                }
                let a=this.state.valori.slice()
                a.push(val)
                this.setState({valori:a})
                localStorage.setItem("notificari",JSON.stringify(this.state.valori))


                alert(not.body)

            })
        })
    }

    render() {

        // this.connect()
        let ss="RggfdgfhghgfFEBD \n ggdfdfdg \n gfdgd"
        let i=ss.indexOf("\n")

        return(

            <React.Fragment>
                <h1>
                    Notificari Administrator
                </h1>

                <div >
                    {this.state.valori.map(({ title, content }) => (
                        <Accordion title={title} content={content} />
                    ))}
                </div>


            </React.Fragment>
        )
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export  default Notificari