import React,{useState,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import NavElement from './Navbar';


export default function Join(){
    const inputRef = useRef();
    const history = useHistory();    
   
    const join =(e)=>{
     e.preventDefault();
     let id = inputRef.current.value;
     if(id !== '')
     {
        history.push('/session/'+id);        
     }

    }
    return(
        <div>
        <NavElement/>
        <div className="container " styel={{marginTop:"30%"}}>
           <div className="d-flex justify-content-center"> 
            <div className="col-3" style={{marginTop:"20%"}}>
            <input ref={inputRef} input="text" className="form-control" placeholder="Enter Meeting Id." className="form-control"/>
            <button onClick={join} className="btn btn-primary form-control">Join Meeting</button>
            </div>
            </div> 
        </div>
        </div>
    )
}