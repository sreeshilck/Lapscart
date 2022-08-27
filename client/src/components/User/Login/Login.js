import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { userLoginData } from '../../../features/User/loginSlice';
import { useForm } from "react-hook-form";

function Login() {
    const google = window.google = window.google ? window.google : {}
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data } = useSelector((state) => state.userLogin)


    useEffect(() => {

        //  global google
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("loginDiv"),
            { theme: "outline", size: "large" }
        );

    }, []);

    function handleCallbackResponse(response) {
        const jwt = response.credential
        dispatch(userLoginData({ token: jwt }));
        console.log(response.credential, " %% jwt id tokennn");
    }

    useEffect(() => {
        //const loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
        if (data.length != 0) {
            if (data.isLoggedIn) {
                //localStorage.setItem("loginDetails", JSON.stringify(data));
                navigate('/')
            } else {
                toast.error(data.msg, {
                    id: 'logverifyErr'
                })
            }
        }
    }, [data])

    const onSubmit = async (data) => {
        dispatch(userLoginData(data));
    }
    if (errors.email) {
        toast.error(errors.email.message, {
            id: 'emailErr'
        });

    } else if (errors.password) {
        toast.error(errors.password.message, {
            id: 'passwordErr'
        });
    } else {

    }

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen py-8 sm:justify-center sm:pt-0 bg-gray-50">
                <div>

                </div>
                <div className="w-full px-6 py-8 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg ">
                    <form onSubmit={handleSubmit(onSubmit)} method='post'>
                        <div className='text-center'>

                            <h3 className="text-4xl font-bold text-[#A7F4A7]">
                                Login
                            </h3>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 bg-gray-100"
                                    {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter valid email" } })}
                                />
                            </div>
                        </div>

                        <div className="mt-4 mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 bg-gray-100"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                            </div>
                        </div>

                        <Link to='/user/forgotpassword' className='text-sm text-black hover:underline'>Forget Password?</Link>

                        <div className="flex items-center mt-4">
                            <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#A7F4A7] rounded-md  focus:outline-none  focus:bg-[#A7F4A7] font-bold">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Didn't have an account?{" "}
                        <span>
                            <Link to="/user/signup" className="text-black hover:underline font-bold">Signup</Link>
                        </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>

                    <div className="my-6 space-y-2  flex justify-center " >
                        <div id='loginDiv'>

                        </div>
                    </div>
                    {/* <div className="my-6 space-y-2">
                        <button
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                        <button
                            aria-label="Login with Facebook"
                            role="button"
                            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50" height="50"
                                viewBox="0 0 50 50"
                                className='w-5 h-5 fill-current'>
                                <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                            </svg>
                            <p>Login with Facebook</p>
                        </button>
                    </div>  */}
                </div>
            </div>

        </div>
    )
}

export default Login