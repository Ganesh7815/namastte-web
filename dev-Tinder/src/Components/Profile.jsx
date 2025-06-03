
import React, { useState } from 'react';
import axios from 'axios';

import appStore from '../utils/appStore';
import Editprofile from '../Components/Editprofile'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
const profile = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const storedUser= useSelector((store)=>store.user);


  return (
    storedUser &&(
    <div>
    <Editprofile user={storedUser} classname="min-h-screen"/>
    </div>
    )
 
  )
}

export default profile