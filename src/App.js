import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BankSelecction from "./components/bankSelection";
import HomeComponent from "./components/homeComponent";
import LoginComponent from "./components/loginComponents";
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path = "/" exact component = {BankSelecction}/>
          <Route path = "/login/:bank_name/:index" exact  component={LoginComponent}/>
          <Route path="/home/:link_id" component={HomeComponent} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
