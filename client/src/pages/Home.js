import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import Navbar from '../components/Nav/Navbar';
import Slider from '../components/Slider/Slider';
import toast from 'react-hot-toast';


function Home() {

 
  return (
    <>
    <Helmet>
        <title>Lapscart</title>
    </Helmet>
    <Navbar/>

    <Slider/>

    </>
  )

  
}

export default Home