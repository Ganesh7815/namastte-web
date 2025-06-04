import React, { useState } from 'react';
import axios from 'axios';

import appStore from '../utils/appStore';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const[email,setEmail] = useState("ganesh@gmail.com");
  const[password,setPassword] = useState("ganesh123@");
  const[firstName,setFirstName]  = useState("");
  const[secondName,setSecondName] = useState("");
  const[islogin,setislogin] = useState(true);
  const[error,setError] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  

  const loginhandler = async() =>{
     try{
           const user = await axios.post("http://localhost:7777/login",{
            email,
            password
         },{withCredentials: true});
      
         
        dispatch(addUser(user.data.data));
        nav('/');
     }catch(err)
     {
        setError(err?.response?.data?.error || "something went wrong");
        console.log("Error :"+err.user.message());
     }
  }

  const signuphandler = async() =>{
    try{
      const res=await axios.post("http://localhost:7777/signup",{firstName,secondName,email,password},{withCredentials:true});
   
      dispatch(addUser(res.data.data));
      nav("/profile");;
    }catch(err){
      console.log(err.response?.data?.error);
    }
  }

  return (
        <div className="flex justify-center">
        <div className="card bg-base-300  w-95 flex my-15 mx-auto">
          <p className='flex justify-center mt-6 font-bold'>{islogin?"Login":"Sign Up"}</p>
      <div className="card-body" >
      
        {!islogin && (<><label>
         <h2>First Name:</h2>
          <input
            className="input"
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
         <h2>Second Name:</h2>
          <input
            className="input "
            type="text"
            placeholder='Second Name'
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
        </label>
        </>)
}
        <h2>Email Id:</h2>

        <label className="input validator">
                  <svg className="h-[1em] opacity-50 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input type="email" placeholder="mail@site.com" required 
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>

           <label className=''>Password :</label>  
           <label className="input validator">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
              ></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            // minlength="8"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            onChange={((e)=>setPassword(e.target.value))}
          />
        </label>
     
        <p className='text-red-600 '>{error}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn" onClick={islogin?loginhandler : signuphandler}>{islogin?"Login":"Sign Up"}</button>
        </div>
        <p className='m-auto cursor-pointer' onClick={()=>setislogin(prev=>!prev)}>{islogin?"New User.. plz sign Up here..":"Exiting User.. plz login here"}</p>
      </div>
    </div>
    </div>
  )
}

export default Login