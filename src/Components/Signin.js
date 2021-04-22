import React,{useState,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import NavElement from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Signin.css'
import Alert from 'react-bootstrap/Alert';

export default function Signin(){
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [loading,setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    const submit= async(e)=>{
      e.preventDefault();
      setLoading(true);
      const url="https://zoom-bclone.herokuapp.com/login";
      if(emailRef.current.value ==='' || passwordRef.current.value ===''){
        setShow3(true);
      }
      else{
      let postData = {
          email:emailRef.current.value,
          password:passwordRef.current.value
      }  
      let resp = await fetch(url,{
          method: 'POST',
          mode:'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(postData)
      });
      let n = await resp.json();
      if(resp.status === 200){
          localStorage.setItem('Authorisation',n.token);
          localStorage.setItem('email',emailRef.current.value);
          history.push('/create-session');  
      }
      else if(resp.status === 400){
          setShow1(true); 
      }
      else if(resp.status === 404){
        setShow2(true);
      }
    }
    setLoading(false);
    }

    return(
        <div >
        <NavElement/>
        <div className="container">

        {
          show1 ?
      <Alert variant="danger" onClose={() => setShow1(false)} dismissible>
        <Alert.Heading>Invalid password.</Alert.Heading>
      </Alert>
      :null
     }   
         {
          show2 ?
      <Alert variant="danger" onClose={() => setShow2(false)} dismissible>
        <Alert.Heading>User Not Exist.</Alert.Heading>
      </Alert>
      :null
     } 
    
{
          show3 ?
      <Alert variant="danger" onClose={() => setShow3(false)} dismissible>
        <Alert.Heading>Please Enter Valid Inputs.</Alert.Heading>
      </Alert>
      :null
     }
          
        <div className="row" style={{marginTop:"10%"}}>
        <div className="offset-1 col-5 border"style={{borderRadius:"10px", backgroundColor:"#b0b2b5", boxShadow:"-5px 10px 20px #888888" }}>
            <h2 className="text-center " style={{marginTop:"15%", fontWeight:"bold" }}>Sign In</h2>    
            <div className="text-center"> <i class="fa fa-sign-in fa-3x" aria-hidden="true"></i></div>
        </div>
        <div className=" border  col-5" style={{borderRadius:"10px", boxShadow:"5px 10px 18px #888888"}}>
               <div className="form-group p-3">
                   <small className="mt-2">Email</small>
                   <input type="email" ref={emailRef} className="form-control" placeholder="Enter Email Id" required></input>
                   <small className="mt-3">Password</small>
                   <input type="password" ref={passwordRef} className="form-control " placeholder="Enter Password" required></input>
                   <button onClick={submit} className="btn btn-primary form-control mt-3">Sign In</button>
               </div>      
        </div>        
        </div>
           {
             loading?
             <div><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
             <span class="sr-only">Loading...</span></div>
             :null  
           }
        </div>
    </div>
    )
}