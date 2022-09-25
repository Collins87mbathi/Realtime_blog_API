import React from 'react';
import './Home.scss';
 import Hero from '../Hero/Hero';
// import Filter from '../Filter/Filter';
import Navbar from '../Navbar/Navbar';
import Posts from '../Posts/Posts';


const Home = ({socket, notification}) => {
  return (
    <>
   <Navbar notification={notification}/>
   <Hero/>
   {/* <Filter/> */}
   <Posts socket={socket}/>
    </>
    
  )
}

export default Home