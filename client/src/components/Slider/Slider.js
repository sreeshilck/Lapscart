import React, { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import img1 from './img/first.jpg'
import img2 from './img/second.jpg'
import img3 from './img/third.jpg'
import hero1 from './img/asus.png'
import './Slider.css'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
function Slider() {

    const sliderData = [
        {
            title: "The best laptop collection",
            subtitle: "with 30% off",
            img: img1
        },
        {
            title: "this is second title ",
            subtitle: "second subtitle",
            img: img2
        },
        {
            title: "this is third title ",
            subtitle: "third subtitle",
            img: img3
        }
    ]


// useEffect(()=> {

// },[])
    return (
        <div className='slider-container h-[100vh]  flex flex-col md:flex-row  relative ' >
            
            <div className=' w-[100%] md:w-[40%] flex flex-col justify-center mt-[450px] md:mt-0    '>
        
                    <h1 className='mx-auto text-white font-bold text-3xl md:text-4xl  mt:5 md:mt-12'>The best laptop collection</h1>
                    <h4 className='mx-auto text-white font-bold text-[1.8rem] mt-3 md:mt-5'>with 30% off</h4>
                    <button className='bg-black text-white text-center px-2 py-3 font-bold rounded-[50px] w-[130px] mx-auto mt-3 md:mt-5'>Shop Now</button>
  
            </div>
            <div className='w-[100%] md:w-[60%]  absolute  top-32 md:right-0 ' >
                <img src={hero1} alt="heroimg" className='mt-0 md:pt-4 '  />
            </div>
        

        </div>
    )
}

export default Slider








// {sliderData.map((slide,index) =>{
//     return(
//         <div key = {index} className={index === current ? 'slide current' : 'slide'}>
//         <h1 className = 'titleslider'>{slide.title}</h1>
//         <h3 className = 'subtitleslider'>{slide.subtitle}</h3>
//         <div className = 'content'> <Link to= '/Shop'> <button className='px-5 py-5 bg-white text-black font-bold'>Shop</button></Link> </div>
//         </div>
//     );

// })}
// <IoIosArrowForward className ='next' size ='32' onClick = {nextslide}/>
// <IoIosArrowBack className = 'prev' size ='32' onClick = {prevslide}/>






// import {React,useEffect,useState}  from 'react'
// import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/all'
// import { Link } from 'react-router-dom';
// import ShopNowBtn from './ShopNowBtn'
// const Slider = () => {
//      const SliderData = [
//         {
//           title: 'Jackets & Coats',
//           subtitle :'Quality Matters.'
//         },
//         {
//             title: 'Find The Best Outfit',
//             subtitle :'With 30% Off'
//         },
//         {
 
//             title: 'The Best Shoes',
//             subtitle :'Comfort For your long day'
//         },
//         {
 
//             title: 'Next Season Is here',
//             subtitle :'Enjoy your summer with us.'
//         }
//       ];
//     const [current, setCurrent] = useState(0);
//     const length = SliderData.length;
//     const [auto,setauto] = useState(true);
//     const intervaltime = 6000;
//     let slideinterval;
//     const nextslide = () =>{
//         clearInterval(slideinterval);
//         slideinterval = setInterval(nextslide,intervaltime);
//         setTimeout(()=>setCurrent(current === length - 1 ? 0 : current + 1))
 
//     }
//     const prevslide = () =>{
//         clearInterval(slideinterval);
//         slideinterval = setInterval(nextslide,intervaltime);
//         setTimeout(()=>setCurrent(current === 0 ? length - 1 : current - 1))         
//    }
//    useEffect(()=>{
//      setauto(true)
//     if(auto){
//       slideinterval = setInterval(nextslide,intervaltime);
//       }
//     return ()=>{ 
//       setauto(false);
//       clearInterval(slideinterval);
//     }
//    })
 
//     return (
//         <div className = 'slider'>
//             {SliderData.map((slide,index) =>{
//                 return(
//                     <div key = {index} className={index === current ? 'slide current' : 'slide'}>
//                     <h1 className = 'titleslider'>{slide.title}</h1>
//                     <h3 className = 'subtitleslider'>{slide.subtitle}</h3>
//                     <div className = 'content'> <Link to= '/Shop'> <ShopNowBtn /></Link>  </div>
//                     </div>
//                 );
 
//             })}
//             <IoIosArrowForward className ='next' size ='32' onClick = {nextslide}/>
//             <IoIosArrowBack className = 'prev' size ='32' onClick = {prevslide}/>
//         </div>
//     )
// }
 
// export default Slider


