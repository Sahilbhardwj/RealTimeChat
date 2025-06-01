import { WebSocketServer,WebSocket } from "ws";
const ws=new WebSocketServer({port:8080})


interface users{
  socket:WebSocket;
  roomid:string;
}
let  allSockets:users[]=[]



ws.on("connection",(socket)=>{
    
    socket.on("message",(message)=>{ 
      //@ts-ignore
       const parsedmessage=JSON.parse(message)
       
      // if user wants to connect to a room
      if(parsedmessage.type=="join"){
        const joinedconnection=allSockets.find(x=>x.socket==socket)
          if(joinedconnection){
              allSockets = allSockets.filter(socket => socket !== joinedconnection)
            }
        allSockets.push({
          socket, roomid:parsedmessage.payload.roomid
        })
      }

      // if user is connected to a room and wants to send message
      if(parsedmessage.type=="chat"){
              const currentroomid=(allSockets.find(x=>x.socket==socket))?.roomid
              allSockets.forEach(s=>{
                 if(s.roomid==currentroomid){
                s.socket.send(parsedmessage.payload.message)}
               })
      }

      })
   
        
   
})





