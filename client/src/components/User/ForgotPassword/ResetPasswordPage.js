import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import {useNavigate, useParams} from 'react-router-dom'


function ResetPasswordPage() {
    let params = useParams();
  const navigate = useNavigate

    const { register, handleSubmit,watch, formState: { errors } } = useForm();
    
    
    const onSubmit = async (data) => {
        await axios.post(`http://localhost:5000/api/user/passwordreset/${params.token}`, data ,{
            withCredentials:true
        }).then((res) => {
            console.log(res.data," == res.dataa");
            toast.success(res.data.msg, {id:"resetsuccess"})
            //navigate("/user/login")
            

        }).catch((errors) => {
           // console.log(errors.response.data," ===errors.response.data");
            // if (!errors.response) {
            //     navigate("/user/home")
            // }
            // toast.error(errors.response.data.msg)
            console.log(errors, "----errorsss");
        })


    }
    return (
        <div className="flex items-center min-h-screen px-4 py-8 ">
            <div className="relative w-full max-w-sm  p-3 mx-auto bg-white rounded-md shadow-lg">
                <div className=" sm:flex  p-3">

                    <div className=" w-full  mt-2  sm:ml-0 sm:text-left bg-blue-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="text-lg font-medium text-gray-800">
                                Reset Password
                            </h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                New Password :
                            </p>
                            <input type="password" name='password' className="w-full mt-2 p-2.5 flex-1 text-black bg-gray-100 rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2"

                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 4,
                                        message: "Password must be more than 4 characters"

                                    },
                                    maxLength: {
                                        value: 8,
                                        message: "Password cannot exceed more than 8 characters"
                                    },
                                })}
                            />
                            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                Confirm Password :
                            </p>
                            <input type="password" name='confirmpassword' className="w-full mt-2 p-2.5 flex-1 text-black bg-gray-100 rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2"

                                {...register("confirmpassword", {
                                    required: "Confirm Password is required",
                                    validate: value =>
                                        value === watch('password') || "The passwords do not match"
                                })}
                            />
                            {errors.confirmpassword && <p style={{ color: "red" }}>{errors.confirmpassword.message}</p>}
                            <div className="items-center gap-2 mt-3 mb-5 sm:flex">
                                <button type='submit'
                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-[#A7F4A7] rounded-md outline-none ring-offset-2 ring-[#A7F4A7] focus:ring-2 font-bold"
                                >
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

export default ResetPasswordPage