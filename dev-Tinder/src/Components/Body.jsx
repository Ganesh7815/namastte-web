import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const storeuser = useSelector((store) => store.user);

  const handler = async () => {
    try {
      const loggedinuser = await axios.get("http://localhost:7777/profile/view", { withCredentials: true });
      if (loggedinuser && loggedinuser.status === 202) {
        dispatch(addUser(loggedinuser.data.data));
      }
    } catch (err) {
      if (err.response && err.response.status === 402) {
        nav("/login");
        return;
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!storeuser) {
      handler();
    }
  }, [storeuser]);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
