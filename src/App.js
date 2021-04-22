import logo from './logo.svg';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import {BrowserRouter as Router,Switch, Route, Link, Redirect} from 'react-router-dom';
import Session from "./Components/Session"
import CreateSession from './Components/CreateSession'; 
import Join from './Components/Join'
import Exit from './Components/Exit'
import Signup from './Components/Signup';
import Home from'./Components/Home';
import Signin from './Components/Signin';

const WrapperRoute =({render,...restProps}) =>{
  return(
    <Route
    {...restProps}
    render={
      (props)=>{
        if(localStorage.getItem("Authoristion") !== null){
          return <Redirect to={`/create-session`}/>
        }
        else{
           return render(props);   
        }
      }
    }
    />
  )
}

const ProtectedRoute = ({component:Component, ...restProps})=>{
  return(
    <Route
    {...restProps}
    render={
      (props)=>{
          if(localStorage.getItem("Authorisation") === null){
            return <Redirect to={`/signin`}/>
          }
          else{
            return(
              <>
                 <Component {...props}/>
              </>
            )  
          }
      }
    }
    />
  )
}


function App() {
  return (
    <Router>
      <Switch>
       <Route exact path="/" component={Home}></Route>
       <Route exact path="/signup" component={Signup}></Route>
       <Route exact path="/session/:id" component={Session}></Route>
       <Route exact path="/join" component={Join}></Route>
       <Route exact path="/exit" component={Exit}></Route>
       <WrapperRoute 
           path='/signin' 
           render={(props) => <Signin {...props}/>}/>
       <ProtectedRoute exact path='/create-session' component={CreateSession}/>

       </Switch>
    </Router>
  );
}

export default App;
