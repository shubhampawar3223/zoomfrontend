import React from 'react';
import NavElement from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home(){
    return(
        <div>
            <NavElement/>
           <div>
               <div className="row">
                      <div className="col-6  p-5" style={{backgroundColor:"#f0ece6"}}>
                          <div className="mt-5 ml-5" >                  
                          <h1 style={{fontWeight:"bold"}}>In this together.</h1>
                          <h1 style={{fontWeight:"bold"}}>Keeping you securely</h1>
                          <h1 style={{fontWeight:"bold"}}>connected wherever you are.</h1> 
                          <div>
                              <button className="btn btn-lg text-light" style={{backgroundColor:"#d17e08"}}><a href="/signup" style={{textDecoration:"none",color:"white"}}>Sign up for free</a></button>
                          </div>
                          </div> 
                      </div>
                      <div className="col-6 rounded" style={{position:"relative",left:"-3%" ,top:"5vh",boxShadow:"18px 10px 18px #888888"}}>
                           <img height="400px"  src="https://media.gcflearnfree.org/content/5e986e3bbec6e83524899b8e_04_16_2020/zoom_intro.png"/>
                      </div>
               </div>
               <div className="row mt-5">
                     <div className="col-6">
                          <img height="400px" width="97%" src="https://www.91-cdn.com/hub/wp-content/uploads/2020/03/zoom-app-ios.png"/>  
                     </div>
                     <div className="col-6" style={{marginTop:"5%"}}>
                        <div>
                            <h2 style={{fontWeight:"bold"}}>Zoom for you</h2>
                            <div className="col-6 font2">
                            <h5>Zoom is for you. We're here to help you connect, communicate, and express your ideas so you can get more done together. We're proud to be trusted by millions of enterprises, small businesses, and individuals, just like you.</h5>
                            </div>
                        </div>
                     </div>
               </div>
           </div>
        </div>
    )
}