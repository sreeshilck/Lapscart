import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Verifyotp() {

    const [otp, setOtp] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const details = JSON.parse(localStorage.getItem('details'));
        if (details.user) {
            const userId = details.user;
            
            await axios.post(`http://localhost:5000/api/user/verifyotp`, { otp, userId })
                .then(res => {
                    if (res.data.verified) {
                        // navigate to home success
                        toast.success('OTP Verification Success', {
                            id:'OTPverifySuccess'
                        });
                        navigate("/");
                    } else {
                    }
                }).catch(error => {
                    
                    toast.error(error.response.data.msg,{
                        id:'OTPVerifyFailed'
                    })
                })
        }
    }
    const handleChange = (e) => {
        setOtp(e.target.value);
    }

    const handleResend = async () => {
        const details = JSON.parse(localStorage.getItem('details'));
        const userId = details.user;
        await axios.get(`http://localhost:5000/api/user/resendotp/${userId}`, )
        .then(res => {
            toast.success("OTP send successfully",{
                id:'OTPSendSuccess'
            })
        }).catch(error => {
            toast.error("Something went wrong try again..", {
                id:'OTPSendFailed'
            })
        })
    }

    return (
        <div className="flex items-center min-h-screen px-4 py-8 ">
            <div className="relative w-full max-w-sm  p-3 mx-auto bg-white rounded-md shadow-lg">
                <div className=" sm:flex  p-3">

                    <div className=" w-full  mt-2  sm:ml-0 sm:text-left bg-blue-5">
                        <h4 className="text-lg font-medium text-gray-800">
                            Verify
                        </h4>
                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                            Enter the OTP send to your phonenumber
                        </p>
                        <input type="number" name='otp' className="w-full mt-2 p-2.5 flex-1 text-black bg-gray-100 rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2"
                            onChange={handleChange} />

                        <div className="items-center gap-2 mt-3 mb-5 sm:flex">
                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-white bg-[#A7F4A7] rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2 font-bold"
                                onClick={handleSubmit}>
                                Submit
                            </button>
                            <button
                                className="w-full mt-2  p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-gray-200 focus:ring-2">
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

export default Verifyotp