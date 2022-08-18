import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';

function ForgotPassword() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const handleChange = () => {

    }

    const handleResend = () => {

    }

    const onSubmit = async (data) => {
        
        const resp = await axios.post("http://localhost:5000/api/user/forgotpassword",  data,
        {withCredentials:true}).then((res) =>{
     console.log(res,"==ress");
        toast.success(res.data.message, {
            id:'resetpasswordSend'
        });
        }).catch((errors) => {
            toast.error(errors.response.data.msg,{
                id:'resetemailErr'
            })

        });
        

    }

    return (
        <div className="flex items-center min-h-screen px-4 py-8 ">
            <div className="relative w-full max-w-sm  p-3 mx-auto bg-white rounded-md shadow-lg">
                <div className=" sm:flex  p-3">

                    <div className=" w-full  mt-2  sm:ml-0 sm:text-left ">
                        <form onSubmit={handleSubmit(onSubmit)} method='post' >
                            <h4 className="text-lg font-medium text-gray-800">
                                Forgot Password
                            </h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                Enter the email id for OTP
                            </p>
                            <input type="email" name='email' className="w-full mt-2 p-2.5 flex-1 text-black bg-gray-100 rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2"
                                onChange={handleChange}
                                {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter valid email" } })}
                            />
                            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword