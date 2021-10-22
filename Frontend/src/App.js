import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './components/Sign_in/Login';
import Signup from './components/sign-Up/Account';

import UserProfile from './components/userProfile/userProfile';


function App() {

  return (
    // <div className="App">
    <Router>
      <Switch>
        <Route exact  path="/" component={Login} />
       
        <Route path="/sign-up"  component={Signup} /> 
        <Route path="/profile/:_id" component={UserProfile} />
     
      
      </Switch>
    </Router>
    // </div>
  );
}

export default App;
