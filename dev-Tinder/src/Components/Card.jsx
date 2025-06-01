import React from 'react'

const Card = ({user}) => {

    const {firstName,secondName,age,photoUrl,about,gender,skills} = user
 
    
    const totskill=skills.join("  ");
  
    
    
  
    if(!user)
    {
        return <div>loading the data</div>
    }
     
  return (
          
           <div className="card bg-base-300 w-90 h-auto shadow-sm ">
            <div className='flux mt-0.5 '>
            <figure className='mb-0 pb-0'>
                <img
                src={photoUrl}
                alt="photo" className="w-full max-h-70 object-cover" />
            </figure>
            </div>
            <div className="card-body">
               <div><h2 className="card-title flex justify-center pt-0 mt-0">{firstName+" "+secondName}</h2></div> 
                {about && <p className='mx-2 pb-2'>BIO :{about} </p>}
                {age &&  <p className='mx-2 pb-2'>AGE :{age}</p>}
                {skills &&  <p className='mx-3 pb-5'>SKILLS :{totskill}</p>}
                <div className="card-actions justify-center">
                <button className="btn  btn-primary">Ignore</button>
                <button className="btn  btn-secondary">Interested</button>
                </div>
            </div>
            </div>
      

  )
}

export default Card