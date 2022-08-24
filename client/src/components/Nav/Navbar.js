import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingCart, HiSearch, HiOutlineHeart } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { userProfileData } from '../../features/User/userSlice'
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate()
    let [userInfo, setUserInfo] = useState(false)
    const dispatch = useDispatch()
    let userData = JSON.parse(localStorage.getItem('loginDetails')); 
    //const { Utoken } = JSON.parse(localStorage.getItem('loginDetails'));

    useEffect(() => {
    
        verifyUser()
    },[])
 

const verifyUser = () => {
    userData = JSON.parse(localStorage.getItem('loginDetails'));

    if (userData) {
        if (userData.isLoggedIn) {
            setUserInfo(true)
        } else {
            setUserInfo(false)
        }

    } else {
        setUserInfo(false)
    }
}






    const handleLogout = async () => {
        localStorage.clear('loginDetails');
        navigate("/")
        verifyUser()
        // const {Utoken} = JSON.parse(localStorage.getItem('loginDetails'));
        // await axios.post("http://localhost:5000/api/user/logout",{}, {    
        // headers: {'Authorization' : `Bearer ${Utoken}`}

        // }).then((res) => {
        //     console.log(res,"res");
        // }).catch((error) => {
        //     console.log(error,"err");
        // })
    }

    const handleUserProfile = () => {
        dispatch(userProfileData({id: userData.ID, token: userData.Utoken }))
    }




    return (
        <nav className="w-full  shadow-sm px-0">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex ">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="">
                            <h2 className="text-2xl font-bold text-black"><span className='text-[#A7F4A7] text-4xl'>L</span>apscart</h2>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-bold text-black">
                            <li className=" hover:text-[#A7F4A7] ">

                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li className=" hover:text-[#A7F4A7]">

                                <NavLink to='/shop'>Shop</NavLink>

                            </li>
                            <li className=" hover:text-[#A7F4A7]">

                                <NavLink to='about'>About US</NavLink>

                            </li>
                            <li className=" hover:text-[#A7F4A7]">
                                <NavLink to='contact'>Contact US</NavLink>
                            </li>
                        </ul>

                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">

                            <Link to='/user/login' className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">Sign In</Link>
                            {/* <Link to='/user/signup' className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">Sign Up</Link> */}

                        </div>
                    </div>
                </div>
                <div className="hidden space-x-8 md:flex  ">
                    {/* search icon */}
                    <div className='bg-yellow- flex justify-center align-center'>
                        <NavLink to='/search'><HiSearch className='w-6 h-6 mt-1 cursor-pointer hover:text-[#A7F4A7]' /></NavLink>
                    </div>
                    {/* cart icon */}
                    <div className='bg-yellow-5 flex justify-center align-center'>
                        <NavLink to='/cart'><HiOutlineShoppingCart className='w-6 h-6 mt-1 cursor-pointer hover:text-[#A7F4A7]' /></NavLink>
                    </div>


                    {userInfo &&
                        <div className='space-x-8 flex justify-center align-center'>
                            <div className=''>
                                <NavLink to='/wishlist'><HiOutlineHeart className='w-6 h-6 mt-1 cursor-pointer hover:text-[#A7F4A7]' /></NavLink>
                            </div>
                            <div className=''>

                                <NavLink to={`/user/profile/${userData.uID}`} onClick={handleUserProfile}><FaUserAlt className='w-5 h-5 mt-1 cursor-pointer hover:text-[#A7F4A7]' /></NavLink>
                                {/* <NavLink to='/user/profile'><FaUserAlt className='w-5 h-5 mt-1 cursor-pointer hover:text-[#A7F4A7]' /></NavLink> */}
                            </div>
                        </div>
                    }










                    {!userInfo
                        ?
                        <div className='bg-yellow-5 flex justify-center align-center'>
                            <Link to='/user/login' className='font-bold px-4 py-2 mt-0 text-white bg-[#A7F4A7] rounded-md shadow'>Sign In</Link>
                        </div>
                        :
                        <div className='bg-yellow-5 flex justify-center align-center'>

                            <button onClick={handleLogout}><FiLogOut className='w-6 h-6 mt-1 cursor-pointer hover:text-[#A7F4A7]' /></button>
                        </div>

                    }











                    {/* <Link to='/user/login' className="px-4 py-2 mt-0 text-white bg-[#A7F4A7] rounded-md shadow hover:bg-gray-800 font-bold">Sign In</Link> */}
                    {/* <Link to='/user/signup' className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">Sign up</Link> */}

                </div>
            </div>
        </nav>
    )
}

export default Navbar