import React, { useRef, useEffect, useState } from 'react'; // ADDED: useRef, useEffect, useState
import Card from './Card';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addUser} from "../utils/userSlice"

const EditProfile = ({ user }) => {
  const leftCardRef = useRef(null); // ADDED: Create a ref for the left card
  const [leftCardHeight, setLeftCardHeight] = useState(0); // ADDED: Track the left card's height
  const dispatch = useDispatch();

 
  const [firstName, setFirstName] = useState(user.firstName);
  const [secondName, setSecondName] = useState(user.secondName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.about || "");
  const[error,seterror] = useState("");
  const[showtoast,settoast] = useState(false);

  useEffect(() => {
    if (leftCardRef.current) {
      setLeftCardHeight(leftCardRef.current.clientHeight); 
    }
  }, []);


  const savehandler = async() =>{
   try{
        const updateUser = await axios.patch("http://localhost:7777/profile/update",{
        firstName,
        secondName,
        photoUrl,
        age,
        gender,
        about
     },{withCredentials:true});

     dispatch(addUser(updateUser?.data?.data));
     settoast(true);

     setTimeout(()=>{
      settoast(false);
     },3000);


   }catch(err)
   {
      seterror(err.response.data.error);
   }
  }

  return (

    <div className="flex justify-center gap-8 my-8">
      
        {showtoast && (
      <div className="toast toast-top toast-center z-50">
        <div className="alert alert-info">
          <span>Profile updated successfully</span>
        </div>
      </div>
    )}

      <div
        ref={leftCardRef} 
        className="card bg-base-300 w-95 flex flex-col p-4"
      >
        <h2 className="card-title justify-center">Edit Profile</h2>
        <label>
          First Name:
          <input
            className="input select-warning"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br/>
        <label>
          Second Name:
          <input
            className="input select-warning"
            type="text"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
        </label>
        <br/>
        <label>
          Photo URL:
          <input
            className="input select-warning"
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </label>
        <br/>
        <label>
          Gender:
          <select
            className="select select-warning"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>male</option>
            <option>female</option>
            <option>others</option>
          </select>
        </label>
        <br/>
        <label>
          Age:
          <input
            className="input select-warning"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br/>
        <label>
          About:
          <textarea
            className="textarea select-warning"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </label>
        <p>{error}</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn my-5" onClick={savehandler}>Save</button>
        </div>
      </div>

     
      <div
        style={{ height: `${leftCardHeight}px` }} 
      >
        <Card
          user={{ firstName, secondName, age, photoUrl, gender, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
