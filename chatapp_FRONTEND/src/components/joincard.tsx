import { useRef } from "react"
import type { RefObject, Dispatch, SetStateAction } from "react";

interface MainProps {
  wsRef: RefObject<WebSocket | null>; // or MutableRefObject if needed to mutate
  setIsjoined: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<any[]>>;
}

export function JoinCard({wsRef,setIsjoined,setMessage}:MainProps){
          const userref=useRef(null);
          const mynewref=useRef(null)

          function letsjoin(mymessage:string|null,username:string|null){
            const newdata= JSON.stringify({
            "type":"join",
            "payload":{
              "roomid": mymessage,
              "username":username
          }}
        )
        wsRef.current?.send(newdata)
          }
    return(  
              <div className="grid grid-cols-3 gap-4 p-5 mt-40">
                  <div className="flex flex-col bg-gray-400 rounded-md h-60 w-96 col-start-2 py-16">
                        <input className="mx-4 my-1 py-3 px-3 font-bold rounded-md"ref={mynewref} type="text" placeholder='enter room id' />
                        <input className="mx-4 my-1 py-3 px-3 font-bold rounded-md"ref={userref} type="text" placeholder='enter username' />
                        <button className='bg-white py-3 px-1 font-bold rounded-md mx-4 my-1' onClick={()=>{
                          letsjoin(mynewref.current?.value,userref.current?.value)
                          setMessage(()=>[])
                          setIsjoined((c)=>!c)
                          }}>Join</button>
                  </div>
              </div>
  )
}