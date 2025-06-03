import axios from 'axios'
import React from 'react'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { useEffect } from 'react'

const Requests = () => {
    const dispatch = useDispatch();
   const requestHander = async() =>{
      try{
          const res = await axios.get("http://localhost:7777/requests/received",{withCredentials:true});
          console.log(res.data.data);
          dispatch(addRequest(res.data.data));
      }catch(err)
      {
        console.log(err.response?.data?.error);
      }
   }

   useEffect(() => {
      requestHander();
   }, [])

   const storerequest = useSelector((store)=> store.request);
   console.log(storerequest);
   
   if (!Array.isArray(storerequest)) {
  return <div className='text-center font-bold my-15 text-4xl' >No requests available</div>;
}
  return (
    <div className='flex flex-col items-center  p-5'>
      <div className='text-center my-4 mb-0 size-10 font-bold'>Connection_requests</div>
      {storerequest && storerequest.length > 0 ? (
        storerequest.map((conn,index) => (
         <div>
         <div className='flex  my-2 bg-base-300 rounded-xl p-4  g-2 w-110 h-55  gap-4 items-center' > 
            <div> 
            <img src={conn.photoUrl} alt="Profile"  className='w-30 h-30 rounded-full '/>
           </div>
           <div >
            <p>{conn.firstName} {conn.secondName}</p>
            <p>Age: {conn.age}</p>
            <p>Gender: {conn.gender}</p>
            <p>About: {conn.about}</p>
            <p>Skills: {conn.skills.join(" ")}</p>
            <div className='flex gap-4 mt-4'>
            <button className="btn btn-primary">Primary</button>
           <button className="btn btn-secondary">Secondary</button>
           </div>
            </div>
        </div>
        </div>
         
        ))
      ) : (
        <p>No Request Found</p>
      )}

     
    </div>
  
   
  )
}

export default Requests