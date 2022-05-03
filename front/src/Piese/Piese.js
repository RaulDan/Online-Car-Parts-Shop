import React, { Component } from 'react'
import axiosInstance from "../DB/Axios";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
        this.getAllProducts.bind(this)
    }


    componentDidMount(){
        this.getAllProducts()
    }

    getAllProducts=()=>{
        axiosInstance.get("/AllProd").then(res=>
        {

            console.log(res.data)
            this.setState({
                products:res.data,
                prod:res.data
            })
            console.log("V:",this.state.products)

        }).catch((err)=>console.log(err))
    }


    render() {
        return (
            <div>


                <br></br>
                <div className = "row">
                    <table>

                        <thead>
                        <tr>
                            <th> Nume</th>
                            <th> Descriere</th>
                            <th> Pret</th>
                            <th> Cantitate </th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.products.map(
                                prod =>
                                    <tr key = {prod.id}>
                                        <td>prod.nume</td>
                                        <td> { prod.descriere} </td>
                                        <td> {prod.pret}</td>
                                        <td> {prod.cantitate}</td>
                                        <td>
                                            <button onClick={ () => console.log("B1")} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => console.log("B2")} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => console.log("B3")} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
