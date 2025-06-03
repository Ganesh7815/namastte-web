import React from 'react'
import { useSelector } from 'react-redux';

const Card = ({user}) => {

    const {firstName,secondName,age,photoUrl,about,gender,skills} = user;
    if(!user)
    {
        return <div>loading the data</div>
    }
     
  return (
          
           <div className="card bg-base-300 w-80  shadow-sm ">
            <div className='flux mt-0.5 '>
            <figure className='mb-0 pb-0'>
                <img
                src={photoUrl}
                alt="photo" className="w-full max-h-70 object-cover" />
            </figure>
            </div>
            <div className="card-body">
               <div><h2 className="card-title flex justify-center pt-0 mt-0">{firstName+" "+secondName}</h2></div> 
               {age && gender && <p className='mx-1 pb-1'>{age+" "}{gender}</p>}
                {about && <p className='mx-1 pb-1'>{about} </p>}
                
                {skills &&  <p className='mx-1 pb-1'>SKILLS :{skills.join(" ")}</p>}

                <div className="card-actions justify-center p-2">
                <button className="btn  btn-primary">Ignore</button>
                <button className="btn  btn-secondary">Interested</button>
                </div>
            </div>
            </div>
      

  )
}

export default Card