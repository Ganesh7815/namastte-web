import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Body = () => {
    return (
        <>
            <NavBar/>
            <Footer/>
            <Outlet/>
            
        </>
    );
};

export default Body;
