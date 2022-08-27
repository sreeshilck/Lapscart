//import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Link } from 'react-router-dom'
function PhoneOTPModal({ setOpenModal }) {

    const [otp, setOtp] = useState("");

    const handleChange = () => {

    }
    const handleResend = () => {

    }
    const handleSubmit = async () => {
        console.log(otp);
        const details = JSON.parse(localStorage.getItem('loginDetails'));
        if (details.isLoggedIn) {
            const userId = details.Utoken;
            await axios.post(`http://localhost:5000/api/user/phoneverifyotp`, {otp} ,{
               headers: { 'Authorization': `Bearer ${userId}` ,withCredentials:true }
            })
                .then(res => {
                    if (res.data.verified) {
                        setOpenModal(false)
                        toast.success('', {
                            id: 'updatephoneSuccess'
                        });
                    } else {
                        setOpenModal(true)
                    }
                }).catch(error => {
                    setOpenModal(true)
                    toast.error(error.response.data.msg, {
                        id: 'OTPVerifyFailed'
                    })

                })
        }
    }

    return (
        <div className="flex items-center h-screen w-[94%]   absolute  top-0  ">
            <div className="relative   max-h-lg  p-3 mx-auto bg-white rounded-md shadow-xl">
                <div className=" sm:flex  p-3">

                    <div className=" w-full  mt-2  sm:ml-0 sm:text-left bg-blue-5">
                        <h4 className="text-lg font-medium text-gray-800">
                            Verify
                        </h4>
                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                            Enter the OTP send to your phonenumber
                        </p>
                        <input type="number" name='otp' className="w-full mt-2 p-2.5 flex-1 text-black bg-gray-100 rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2"
                            onChange={(e) => setOtp(e.target.value)} />

                        <div className="items-center gap-2 mt-3 mb-5 sm:flex">
                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-white bg-[#A7F4A7] rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2 font-bold"
                                onClick={handleSubmit}>
                                Submit
                            </button>

                            <button
                                className="w-full mt-2  p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-gray-200 focus:ring-2 text-center" onClick={() => setOpenModal(false)}>
                                Cancel
                            </button>
                        </div>
                        <h5>Didn't get OTP? <span className='font-bold mt-3 cursor-pointer' onClick={handleResend}>Resend</span></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhoneOTPModal