import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import NavElement from './Navbar'
import './Exit.css'

export default function Exit(){
    return(
       <div> 
         <NavElement/>    
       <Container>
          
           <div className="d-flex justify-content-center" style={{marginTop:"30%"}}>
               <h4 className="p-3 font2 bg-primary text-white rounded exit">Thank You For Using ZOOM.</h4>
            </div>
       </ Container>
       </div>              
    )
}