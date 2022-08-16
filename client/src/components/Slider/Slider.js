import React from 'react'
import { useEffect } from 'react'
import img1 from './img/first.jpg'
import img2 from './img/second.jpg'
import img3 from './img/third.jpg'
import './Slider.css'
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

useEffect(()=> {

},[])
    return (
        <div className='slider-container' >
            


        </div>
    )
}

export default Slider