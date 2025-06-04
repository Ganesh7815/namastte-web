import axios from 'axios'
import React, { useEffect } from 'react'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL+"/connections", { withCredentials: true });
      dispatch(addConnection(response.data.data));
 
    } catch (err) {
      console.log(err.response?.data?.error || "error occurred");
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  const currentConnection = useSelector((store)=>store.connection);

if (!Array.isArray(currentConnection)) {
  return <div className='text-center font-bold my-15 text-4xl' >No connections available</div>;
}


  return (
     <div className='flex flex-col items-center  p-5'>
      <div className='text-center my-4 mb-0 size-10 font-bold'>Connections</div>
      {currentConnection && currentConnection.length > 0 ? (
        currentConnection.map((conn) => (
         <div key={conn._id}>
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
            </div>
        </div>
        </div>
         
        ))
      ) : (
        <p>No Connections Found</p>
      )}
    </div>
   
  )
}

export default Connections
