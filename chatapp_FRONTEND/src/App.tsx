import { useEffect, useRef, useState } from 'react';
import './index.css';
import { Topbar } from './components/Topbar';
import { JoinCard } from './components/joincard';
function App() {
    const [isWsReady, setIsWsReady] = useState(false);
    const [message,setMessage]=useState([])
    const myref=useRef(null)
    const wsRef = useRef<WebSocket | null>(null);
    const [isjoined,setIsjoined]=useState(false)
    const [clicked,setClicked]=useState(false)
    const [createroom,setCreateroom]=useState(false)
    function sendingdata(mymessage:string){
      const newdata= JSON.stringify({
            "type":"chat",
            "payload":{
             "message":mymessage
          }
    })
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(newdata);
        } else {
          console.warn("WebSocket not ready, message not sent");
        }
    }
    
    useEffect(()=>{
      const ws=new WebSocket("ws://localhost:8080")
      wsRef.current=ws
      
      ws.onopen = () => {
            console.log("WebSocket connected");
   

        setIsWsReady(true); // ready
      };

      ws.onclose = () => {
        setIsWsReady(false); // not ready
      };
      ws.onmessage=(event)=>{ setMessage((prev)=>[...prev,event.data])}
       return () => {
      ws.close();
    };
    },[])

  
   
       
  return (
   <div className="  bg-black">
   <div className={`${isjoined ? 'h-[90vh]' : 'h-screen'}`}>
      <Topbar myclicked={setClicked} isitjoined={setIsjoined} createroom={setCreateroom}/>
                { isjoined && <div>
                  {message.map((msg, index) => (
                  <div key={index} className=' py-1 my-1 mx-4' >
                  <span className="text-black bg-gray-400 py-1 px-2  rounded-lg font-bold text-lg ">
                    {msg}
                  </span>
                  </div>
                  ))}
                   </div> }
                 {!isjoined && clicked &&<JoinCard wsRef={wsRef} setIsjoined={setIsjoined} setMessage={setMessage}/>}
          
                  
    </div>
        { isjoined &&
          <div className="h-[10vh] bg-gray-100 flex">
            <input ref={myref}  className=' bg-gray-400 ml-2 pl-2 mt-2 mb-2 placeholder-black w-[90vw] font-bold text-lg rounded-md' placeholder='enter your message' type="text"  />
        
            <button className=' pl-10 ml-2 mr-2 pr-10 mt-2 mb-2 bg-gray-400 rounded-lg font-bold text-lg' 
            onClick={()=>{
              if((myref.current?.value))
              { sendingdata(myref.current?.value);
                myref.current.value="";
            }}}
            disabled={!isWsReady}>Send</button>
          </div>
            }
        </div>
    
  )
}


  



export default App
