import React, { useEffect, useRef, useState } from "react";
import {Link,useHistory} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import Peer from "simple-peer";
import './Session.css';
import immer from 'immer';
import './Chat.css'
import {Container,Row, Col} from 'reactstrap'; 

const ENDPOINT = "https://zoom-bclone.herokuapp.com";


export default function Room(props){
    const [register, setRegister] = useState(false); 
    const [name, setName] = useState("");
    const nameRef = useRef();  
    const roomID = props.match.params.id;
    const submit=(e)=>{
         e.preventDefault();
         if(nameRef.current.value === ''){
          alert("Please Enter Your Name.") 
        }
         else{    
         setName(nameRef.current.value);
         setRegister(true);
         }
      }
      return(
          <div>
          {register?
          <Room_ name={name} roomID={roomID}/>
          :
          <div className="d-flex justify-content-center" style={{marginTop:"10%"}}>
          <div className="col-3">    
          <input ref={nameRef} className="form-control" placeholder="Enter Your Name"/>
          <button className="btn btn-primary btn-md mt-2 form-control" onClick={submit}>Submit</button>
          </div>
          </div>
          }  
          </div>
          
      )  
}

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video className="p-3" playsInline autoPlay ref={ref} />
    );
}

function Room_(props){
    const [connect,setConnect] = useState(true);
    const [audio,setAudio] = useState(false);
    const [video,setVideo] = useState(true);
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    //chat 
    const initialMessageState={
        public:[]
    }
    const [users,setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [currentChat, setCurrentChat] = useState({room:"public",isChannel:true })
    const [messages,setMessages] = useState(initialMessageState);
    const inputRef = useRef();
    //
    const muteRef = useRef();
    const unmuteRef = useRef();
    const offvideoRef = useRef();
    const videoRef = useRef();
    const history = useHistory();
    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT);
        navigator.mediaDevices.getUserMedia({ video: connect, audio: connect }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", props.roomID, props.name);

            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(user => {
                    const peer = createPeer(user.userId, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: user.userId,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
//////////////chat useEffect
        socketRef.current.on("remaining users",rUsers=>{
            setUsers((p)=>[...rUsers]);
        })
        socketRef.current.emit("join channel","public",true, props.roomID);
        socketRef.current.on("current messages", payload=>{
            
            if(payload){
            const newMessages =immer(messages, draft=>{
                draft[payload.channel] = payload.content
            })           
            setMessages(newMessages);
            }

                    
        })
        
        socketRef.current.on("post message",payload=>{          
            setMessages(messages =>{
                const newMessages = immer(messages, draft=>{
                    if(draft[payload.channel]){
                        draft[payload.channel].push({sender: payload.sender, content:payload.content})
                    }
                    else{
                        draft[payload.channel] = [{sender: payload.sender, content:payload.content}];
                    }
                })
                return newMessages;
            })
       })


    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    const setChanges = (e)=>{
        setMessage(e.target.value);
    }
    
   const sendMessage = (e) =>{
       e.preventDefault();
       let content = message;
       let to= currentChat.room;
       let from= props.name;
       let channel=currentChat.room;
       let isChannel=true
       socketRef.current.emit("send message", content,to,from,channel,isChannel,props.roomID);
       setMessages(messages =>{
        const newMessages = immer(messages, draft=>{
            if(draft[channel]){
                draft[channel].push({sender: from, content:content})
            }
            else{
                draft[channel] = [{sender: from, content:content}];
            }
        })
        return newMessages;
    })      

       inputRef.current.value= "";
   }
   
   //audio pause & play control
   const audioSet =(e)=>{
    e.preventDefault();
    if(audio){
        setAudio(false);
      userVideo.current.muted = true;
      muteRef.current.style.display= "inline";
      unmuteRef.current.style.display= "none";
    }
    else{
        setAudio(true);
        userVideo.current.muted = false;
        muteRef.current.style.display= "none";
        unmuteRef.current.style.display= "inline";

    }
   }
   
   //video pause & play control
   const videoSet =(e)=>{
    e.preventDefault(); 
    if(video){
        setVideo(false);
      userVideo.current.pause();
      offvideoRef.current.style.display= "inline";
      videoRef.current.style.display= "none";
    }
    else{
        setVideo(true);
        userVideo.current.play();
        offvideoRef.current.style.display= "none";
        videoRef.current.style.display= "inline";

    }
   }
   
   //leave meeting control
   const leave = (e)=>{
    e.preventDefault();
    setConnect(false);
    socketRef.current.disconnect();
    history.push('/exit');
   }   

    return (        
        <div className="container-fluid d-flex flex-column app " >
         <div className="row  " >
           <div className="col-10 align-items-stretch left">      
           
            <video className="p-3" muted  ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index}  peer={peer} />
                );
            })}
            <Row>
            <Col className="col-12 d-flex  bg-primary bottomBar" style={{position:'absolute' , bottom:'0px', borderRadius:"10px"}}>
                    <button onClick={audioSet} ref={muteRef} className="btn ml-2 btn-light" ><i class="bi bi-mic-mute"></i></button>
                    <button onClick={audioSet} ref={unmuteRef} className="btn ml-2 btn-light"style={{display:"none"}}><i class="bi bi-mic"></i></button>
                    <button onClick={videoSet} ref={offvideoRef} className="btn ml-2 btn-light" style={{display:"none"}}><i class="bi bi-camera-video-off"></i></button>
                    <button onClick={videoSet} ref={videoRef} className="btn ml-2 btn-light"><i class="bi bi-camera-video"></i></button>
                    <button onClick={leave} className="btn btn-danger text-light" style={{position:'absolute',right:"20px"}}>Leave</button>
            </Col>    
            </Row>
         </div>
         <div className="container2 col-2">  
              <p className="text-center chat-head">Chat</p>            
              <div className="element col-12 d-flex flex-column">
              {   
                  messages[currentChat.room].map(e=>{
                      return( 
                          <div className=" flex-column">
                          <small>from:{e.sender}</small>
                          <br></br>
                          <div>{e.content}</div>
                          </div>  
                      )
                  })
               }            
                    
              </div>
              <div className="input">
                <textarea className="form-control" ref={inputRef}  onChange={setChanges} placeholder="Enter Message" row="6"></textarea>
                <button className="btn btn-primary form-control" onClick={sendMessage}>Send</button>
              </div>                
  
         </div>
         </div>
        </div>
      //   </div>
    )
};
