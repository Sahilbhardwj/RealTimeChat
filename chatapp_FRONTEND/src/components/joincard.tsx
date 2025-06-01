import { useRef } from "react"

export function JoinCard({wsRef,setIsjoined,setMessage}){
          
        const mynewref=useRef(null)
          function letsjoin(mymessage){
            const newdata= JSON.stringify({
            "type":"join",
            "payload":{
              "roomid": mymessage,
              "name":"sahil"
          }}
        )
        wsRef.current.send(newdata)
          }
    return(  
              <div className="grid grid-cols-3 gap-4 p-5 mt-40">
                  <div className="flex flex-col bg-gray-400 rounded-md h-60 w-96 col-start-2 py-16">
                        <input className="mx-4 my-1 py-3 px-3 font-bold rounded-md"ref={mynewref} type="text" placeholder='enter room id' />
                        <button className='bg-white py-3 px-1 font-bold rounded-md mx-4 my-1' onClick={()=>{
                          letsjoin(mynewref.current.value)
                          setMessage((prev)=>[])
                          setIsjoined((c)=>!c)
                          }}>Join</button>
                  </div>
              </div>
  )
}