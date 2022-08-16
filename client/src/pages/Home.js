import React from 'react'
import { Helmet } from 'react-helmet';
import Navbar from '../components/Nav/Navbar';
import Slider from '../components/Slider/Slider';

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