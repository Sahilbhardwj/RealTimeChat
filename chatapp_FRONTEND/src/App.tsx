import { useEffect, useRef, useState } from 'react';
import './index.css';






function App() {
   const joinindata=JSON.stringify({
                "type": "join",
                "payload": {
                  "roomid": "123",
                  "name":"sahil"
                }
              })
    const senddata= JSON.stringify({
            "type":"chat",
            "payload":{
             "message":"mymessage"
          }
        })


    function sendingdata(mymessage:string){
      const newdata= JSON.stringify({
            "type":"chat",
            "payload":{
             "message":mymessage
          }
    })
     wsRef.current?.send(newdata)
    }
   
    const [message,setMessage]=useState(["hi there","hello"])
    const myref=useRef(null)
    const wsRef = useRef<WebSocket | null>(null);
    useEffect(()=>{
      const ws=new WebSocket("ws://localhost:8080")
      wsRef.current=ws
      ws.onopen=()=>{
        ws.send(joinindata)
        ws.send(senddata)
      }
      ws.onmessage=(event)=>{ setMessage((prev)=>[...prev,event.data])}
       return () => {
      ws.close();
    };
    },[])

  
   
       
  return (
   <div className="  bg-black">
    <div className="h-[90vh]" > 
     {message.map((msg, index) => (
        <div key={index} className="text-white bg-gray-800 p-2 mb-2 rounded-md font-extrabold text-lg">
          {msg}
        </div>
      ))}
    </div>

    <div className="h-[10vh] bg-gray-100 flex">
      <input ref={myref}  className='  ml-2 pl-2 mt-2 mb-2 placeholder-black w-[90vw] font-extrabold text-lg' placeholder='enter your message' type="text"  />
   
      <button className=' pl-10 ml-2 mr-2 pr-10 mt-2 mb-2 bg-gray-400 rounded-lg font-extrabold text-lg' 
      onClick={()=>{
        if((myref.current?.value)){sendingdata(myref.current?.value);
          
      }}}>Send</button>
    </div>
   </div>
    
  )
}

export default App
