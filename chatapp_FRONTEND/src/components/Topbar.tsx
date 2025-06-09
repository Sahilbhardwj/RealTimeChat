
export function Topbar({myclicked,isitjoined,setCreateroom}){
  return(
  <div className='flex justify-end p-2 border'>
  
        <div className="mr-96 bg-gray-700 text-white font-extrabold -600 rounded-md px-4">REALTIME CHAT</div>
          <div className=" mr-28"></div>
        <button className=" bg-gray-700 text-white px-4 py-2 mx-2 rounded font-bold" onClick={()=>{
           isitjoined(false)
           myclicked(true)
        }}>
          CREATE / JOIN
        </button >
   
      </div>)
}