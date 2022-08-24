import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSelector, useDispatch } from 'react-redux';
import { userRegisterData, reset } from '../../../features/User/registerSlice';


function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState()
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();

    const { data } = useSelector((state) => state.userRegister)

    //console.log(registerData,"registerData");
    useEffect(() => {
        if (data.length != 0) {
            if (!data.created) {
                toast.error(data.message, {
                    id: 'regErr'
                })
                //dispatch(reset());
            } else {
                localStorage.setItem('details', JSON.stringify(data));
                navigate("/user/verify")
            }
        }
        //if(data)
        //dispatch(reset());
    }, [data,])

    const onSubmit = async (data) => {
        dispatch(userRegisterData(data));
    };


    return (
        <div className="flex flex-col items-center min-h-screen py-8  sm:justify-center sm:pt-0 bg-gray-50">
            <div>
            </div>
            <div className="w-full px-6 pt-8 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg ">
                <form onSubmit={handleSubmit(onSubmit)} method='post'>
                    <div className='text-center'>
                        <h3 className="text-4xl font-bold text-[#A7F4A7]">
                            Signup
                        </h3>
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Name
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="text"
                                name="name"
                                className="block w-full h-10 mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 bg-gray-100"
                                {...register("name", {
                                    required: "Name is required", maxLength: {
                                        value: 10,
                                        message: "Name cannot exceed more than 10 characters"
                                    },
                                    pattern: { value: /^[A-Za-z]+$/i, message: "Enter valid Name" }
                                })}
                            />
                            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                        </div>
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
                            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="phonenumber"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Phone Number
                        </label>
                        <div className="flex flex-col items-start">
                            <Controller
                                control={control}
                                name="phonenumber"

                                rules={{
                                    required: "Phone Number is required", pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: "Enter valid phone number"
                                    },
                                }}
                                render={({ field: { ref, ...field } }) => (
                                    <PhoneInput
                                        {...field}
                                        inputProps={{
                                            ref,

                                        }}
                                        country={'in'}
                                        disableDropdown={true}
                                        countryCodeEditable={false}
                                        // disabled={true}

                                        inputStyle={{ width: '100%', height: '40px', color: 'green' }}
                                    // {...register("phonenumber", {
                                    //     required: "Phone Number is required",
                                    //     pattern: {
                                    //         value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                    //         message: "Enter valid phone number"
                                    //     },
                                    // })}
                                    />
                                )}
                            />
                            {errors.phonenumber && <p style={{ color: "red" }}>{errors.phonenumber.message}</p>}

                        </div>
                    </div>
                    <div className="mt-4">
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
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Confirm Password
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="password"
                                name="confirmpassword"
                                className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 bg-gray-100"
                                {...register("confirmpassword", {
                                    required: "Confirm Password is required",
                                    validate: value =>
                                        value === watch('password') || "The passwords do not match"
                                })}
                            />
                            {errors.confirmpassword && <p style={{ color: "red" }}>{errors.confirmpassword.message}</p>}
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#A7F4A7] rounded-md  focus:outline-none  focus:bg-[#A7F4A7] font-bold">
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-grey-600 mb-4">
                    Already have an account?{" "}
                    <span>
                        <Link to="/user/login" className="text-black hover:underline font-bold">Log in</Link>
                    </span>
                </div>
                {/* <div className="flex items-center w-full my-4">
                    <hr className="w-full" />
                    <p className="px-3 ">OR</p>
                    <hr className="w-full" />
                </div>
                <div className="my-6 space-y-2">
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
                        <p>Signup with Google</p>
                    </button>
                    <button
                        aria-label="Signup with Facebook"
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
                        <p>Signup with Facebook</p>
                    </button>
                </div> */}
            </div>
        </div>

    )
}

export default Signup