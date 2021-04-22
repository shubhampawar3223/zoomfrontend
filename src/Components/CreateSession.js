import React,{useRef,useState} from 'react';
import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';
import {v4 as uuidv4 } from 'uuid';
import NavElement from './Navbar'

export default function CreateSession(props){
   const history = useHistory();
   const [url, setUrl] = useState();
   const [id, setId] = useState();
   const disRef = useRef();
   const buttonRef = useRef();

    const create= (e)=>{
     e.preventDefault();
     let code = uuidv4();
     let temp = window.location.href;
     temp= temp.split('/');
     temp.pop();
     temp.push('session/');
     let url=temp.join('/');
     setUrl(url+ code);
     setId(code);
     disRef.current.style.display="block";
     buttonRef.current.style.display="none";
     //history.push("/session/"+uuidv4());
    }

    return(
        <div>
            <NavElement/>
            <div className="d-flex justify-content-center" style={{marginTop:"10%"}}>
            <button ref={buttonRef} className="btn btn-primary justify-content-center" onClick={create}>Create A Meeting</button>
            <div className="mt-2 justify-content-center" ref={disRef} style={{display:"none"}}>
                <h3 className="justify-content-center">Meeting URL:</h3>
                  <a target="_blank" rel="noopener noreferrer" href={url}>{url}</a>    
                  <p className="justify-content-center">Share this URL so that other members can join.</p>
                <h3>Meeting ID:</h3>
                  <p>{id}</p>  
                              
            </div>
            </div>
        </div>
    )
}