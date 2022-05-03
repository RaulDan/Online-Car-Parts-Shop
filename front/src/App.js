
import './App.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router,Route ,Redirect,Switch } from "react-router-dom"

//import {Switch} from "@material-ui/core";

import Login from "./Logare/Login";
import Register from "./Logare/Register";
import Comanda from "./Client/Comanda";
import Produse from "./Piese/Produse"
import Marca from "./Piese/Marca";
import Admin from "./Admin/Admin";
import EditareProduse from "./Piese/EditareProduse";
import ForgotPass from "./Client/ForgotPass";
import Model from "./Piese/Model";
import EditareClienti from "./Client/EditareClienti";
import Client from "./Client/Client";
import ModificaProdus from "./Piese/ModificaProdus";
import DatePersonale from "./Client/DatePersonale";
import ModificaClient from "./Client/ModificaClient";
import Notificari from "./Admin/Notificari";
import Review from "./Review/Review";
import AdaugareReview from "./Review/AdaugareReview";
import ObservareReview from "./Review/ObservareReview";
import FiltruProduse from "./Piese/FiltruProduse";
import ProduseFiltrate from "./Piese/ProduseFiltrate";
import LogariClient from "./Admin/LogariClient";
import Abuz from "./Client/Abuz";

const defaultRoute=window.location.pathname==="/" ? <Redirect to="/login" /> : undefined;

function App() {
  return (
     <React.Fragment>
         <Router>
             <Switch>

                 <Route exact path="/login" component={Login}/>
                 <Route exact path="/register" component={Register}/>
                 <Route exact path="/comanda" component={Comanda}/>
                 <Route exact path="/admin" component={Admin}/>
                 <Route exact path="/editareProduse" component={EditareProduse}/>
                 <Route exact path="/editareClienti" component={EditareClienti}/>
                 <Route exact path="/abuz" component={Abuz}/>

                 <Route exact path="/vizualizareLogariClienti" component={LogariClient}/>
                 <Route exact path="/Reviews" component={ObservareReview}/>
                 <Route exact path="/review" component={Review}/>
                 <Route exact path="/produse" component={Produse}/>
                 <Route exact path="/marca" component={Marca}/>
                 <Route exact path="/forgotpassword" component={ForgotPass}/>
                 <Route exact path="/model" component={Model}/>
                 <Route exact path="/client" component={Client}/>
                 <Route exact path="/modificareProdus" component={ModificaProdus}/>
                 <Route exact path="/data" component={DatePersonale}/>
                 <Route exact path="/modificareClient" component={ModificaClient}/>
                 <Route exact path="/notificari" component={Notificari}/>
                 <Route exact path="/adaugareReview" component={AdaugareReview}/>

                 <Route exact path="/filtru" component={FiltruProduse}/>
                 <Route exact path="/rezFiltru" component={ProduseFiltrate}/>

             </Switch>
             {defaultRoute}
         </Router>
         {/*<h1>*/}
         {/*    fmngfdnfgnfd;n*/}
         {/*</h1>*/}
         {/*<div>*/}
         {/*    <Button variant="contained" color="primary" disableElevation>*/}
         {/*        Disable elevation*/}
         {/*    </Button>*/}
         {/*</div>*/}
     </React.Fragment>


  );
}

export default App;
