import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaUserCircle, FaUserAlt, FaHeart, FaStar } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { RiCoupon3Fill } from "react-icons/ri";
import { MdNotifications, MdOutlineModeEditOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { userProfileData } from '../../../features/User/userSlice'
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import PhoneOTPModal from './PhoneOTPModal';

function UserPersonalInfo() {

  const [personaltoggle, setPersonalToggle] = useState(true)
  const [passwordtoggle, setPasswordToggle] = useState(false)
  const [nameedit, setNameEdit] = useState(true)
  const [emailedit, setEmailEdit] = useState(true)
  const [phoneedit, setPhoneEdit] = useState(true)
  const [showModal, setShowModal] = useState(false);

  const userData = JSON.parse(localStorage.getItem('loginDetails'));
  const { Utoken } = JSON.parse(localStorage.getItem('loginDetails'));

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm();
  const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm();
  const { register: register4, handleSubmit: handleSubmit4, watch, formState: { errors: errors4 } } = useForm();

  const params = useParams()
  const dispatch = useDispatch()



  useEffect(() => {

    dispatch(userProfileData({ id: userData.uID, token: userData.Utoken }))

  }, [])



  const handleChangePassword = () => {
    setPasswordToggle(true)
    setPersonalToggle(false)
  }
  const handlePersonalInfo = () => {
    setPersonalToggle(true)
    setPasswordToggle(false)
  }



  const { data } = useSelector((state) => state.userProfile)
  console.log(data, "===userprofile store dataaa");
  if (data != 0) {

    if (data.profile.verified) {

      toast.custom((t) => (
        <div
          className='animate-leave max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 '
        // className={`${t.visible ? 'animate-leave' : 'animate-leave'
        //   } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkLDFLzwsMDNVewgtoXWEEV2jQYYyBJ2zNw&usqp=CAU"
                  alt="L"
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Lapscart
                </p>
                <p>{t.visible}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {data != 0 && !data.profile.verified.email && !data.profile.verified.phone ? 'Please verify your Email address and Phone Number' : data != 0 && !data.profile.verified.email ? 'Please verify your Email address ' : data != 0 && !data.profile.verified.phone && 'Please verify your  Phone Number'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.remove("verifypopup")}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#A7F4A7]  focus:outline-none focus:ring-2 focus:ring-[#A7F4A7]"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        id: "verifypopup", position: "top-right",
        reverseOrder: false, duration: 1000,
      })
    }

  } else {

  }





  const handleNameEdit = () => {
    setNameEdit(false)
  }
  const handleNameCancel = () => {
    setNameEdit(true)
  }

  const handleEmailEdit = () => {
    setEmailEdit(false)
  }
  const handleEmailCancel = () => {
    setEmailEdit(true)
  }

  const handlePhoneEdit = () => {
    setPhoneEdit(false)
  }
  const handlePhoneCancel = () => {
    setPhoneEdit(true)
  }

  const onSubmit = async (data) => {
    console.log(data,"dataaa");

    await axios.put(`http://localhost:5000/api/user/updatename`, data, {
      headers: { 'Authorization': `Bearer ${userData.Utoken}` }
    })
      .then(res => {

        if (res.data.updated) {
          const newName = res.data.user.name
          const profile = JSON.parse(localStorage.getItem('profileDetails'));
          localStorage.setItem(profile.name, newName);
          toast.success(res.data.msg, {
            id: 'updateSuccess'
          });
          setNameEdit(true)
          dispatch(userProfileData({ id: userData.uID, token: userData.Utoken }))


        } else {

          toast.error("Updation Failed", {
            id: 'updatefail'
          });
        }
      }).catch(error => {
        console.log(error);
        toast.error("Updation Failed", {
          id: 'updatefail'
        });
      })
  }

  const onSubmitEmail = async (data) => {
    console.log(data);
    setEmailEdit(true)
  }

  const onSubmitPhone = async (data) => {
    setPhoneEdit(true)
    console.log(data);
    await axios.put(`http://localhost:5000/api/user/updatephone`, data, {
      headers: { 'Authorization': `Bearer ${userData.Utoken}` }
    }).then((res) => {
      if (res.data.sent) {
        setShowModal(true);
        console.log(showModal);
        toast.success(res.data.msg, {
          id: 'otpsentSuccess',
          duration: 1000,
        });
      } else {
        toast.error("OTP Sent Failed", {
          id: 'otpfail',
          duration: 1000,
        });
      }
      console.log(res);

    }).catch((error) => {
      toast.error("OTP Sent Failed", {
        id: 'otpfail'
      });
      console.log(error);
    })

  }



  const handleEmailVerify = () => {

  }

  const onSubmitChangePassword = async (data) => {
    await axios.put(`http://localhost:5000/api/user/changepassword`, data, {
      headers: { 'Authorization': `Bearer ${userData.Utoken}` }
    }).then((res) => {
      if (res.data.updated) {
        toast.success(res.data.msg, {
          id: 'passwordresetsuccess'
        });
      }

    }).catch((error) => {
      toast.error(error.response.data.msg, {
        id: 'passwordresetfail'
      });

    })
  }

  return (
    <>
      <div className='container  w-full h-auto flex flex-col md:flex-row px-2 md:px-12 py-5 bg-gray-50 relative'>
        <div className='sidebar w-full md:w-[30%] h-full flex flex-col  '>
          <div className='namebox w-full h-24  flex items-center px-8 shadow-md rounded-md bg-white'>
            <p>{<FaUserCircle size={48} className='text-[#A7F4A7]' />}</p>
            <div className='flex flex-col ml-5 '>
              <p className='text-sm'>Hello, </p>
              <h3 className='font-bold text-lg'>{data != 0 && data.profile.name ? data.profile.name : ''}   </h3>
              {/* {profile && profile.profile.name ? profile.profile.name : ''} */}
            </div>
          </div>
          <div className='detailsbox w-full h-auto  mt-4 shadow-md rounded-md bg-white'>
            <div className='accsettings  px-10 pb-3  border-b border-gray-300 cursor-pointer  hover:shadow-md'>
              <div className='accheader flex w-full  py-4  space-x-3 '>
                <p><FaUserAlt className='w-5 h-5 text-[#A7F4A7]' /></p>
                <h3 className='font-bold '>ACCOUNT SETTINGS</h3>
              </div>
              <p className='font-medium ml-10 mb-3 cursor-pointer '>Profile Information</p>
              <p className='font-medium ml-10 mb-3 cursor-pointer'>Manage Address</p>
            </div>
            <div className='orderbox  w-full   py-5 px-10  space-x-3 flex border-b border-gray-300  cursor-pointer  hover:shadow-md'>
              <p><HiDocumentText className='w-6 h-6 text-[#A7F4A7]' /></p>
              <h3 className='font-bold '>My Orders</h3>
            </div>
            <div className='wishlistbox  w-full px-10 py-5  space-x-3 flex border-b border-gray-300 cursor-pointer  hover:shadow-md '>
              <p><FaHeart className='w-5 h-5 text-[#A7F4A7]' /></p>
              <h3 className='font-bold '>My Wishlist</h3>
            </div>
            <div className='couponbox  w-full px-10 py-5  space-x-3 flex border-b border-gray-300 cursor-pointer hover:shadow-md'>
              <p><RiCoupon3Fill className='w-5 h-5 text-[#A7F4A7]' /></p>
              <h3 className='font-bold '>Coupons</h3>
            </div>
            <div className='reviewsbox  w-full px-10 py-5  space-x-3 flex border-b border-gray-300 cursor-pointer hover:shadow-md'>
              <p><FaStar className='w-5 h-5 text-[#A7F4A7]' /></p>
              <h3 className='font-bold '>Reviews and Ratings</h3>
            </div>
            <div className='notificationbox  w-full px-10 py-5  space-x-3 flex border-b border-gray-300 cursor-pointer hover:shadow-md'>
              <p><MdNotifications className='w-5 h-5 text-[#A7F4A7]' /></p>
              <h3 className='font-bold '>All Notifications</h3>
            </div>
            <div className='logoutbox  w-full px-10 py-5  space-x-3 flex border-b border-gray-300 cursor-pointer hover:shadow-md'>
              <p><FiLogOut className='w-5 h-5 text-[#A7F4A7]' /></p>
              <h3 className='font-bold '>Logout</h3>
            </div>
          </div>
        </div>

        {/* infobox */}
        <div className='infobox w-full h-full md:w-[70%]  md:px-5 pb-5 mt-5 md:mt-0 '>
          <div className='w-full h-full rounded-md md:p-12 p-1  bg-white shadow-md relative'>
            <div className='flex w-full py-5 flex-auto place-content-evenly '>
              <button className={personaltoggle ? 'text-md md:text-xl ml-5 text-[#A7F4A7] font-bold cursor-pointer' : ' text-md md:text-xl ml-5 font-semibold cursor-pointer'} onClick={handlePersonalInfo}>Personal Information</button>
              <button className={passwordtoggle ? 'text-md md:text-xl ml-5 text-[#A7F4A7] font-bold cursor-pointer' : 'text-md md:text-xl ml-5 font-semibold cursor-pointer'} onClick={handleChangePassword}>Change Password</button>
            </div>

            {/* Personal Information Display */}
            {personaltoggle &&
              <>
                <div className="w-full h-auto px-6 py-5 mt-6 overflow-hidden bg-stone-50  sm:max-w-lg sm:rounded-lg mx-auto">
                  <form onSubmit={handleSubmit(onSubmit)} method='post'>
                    <div className='space-y-3'>
                      <div className='flex place-content-between'>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Name :
                        </label>

                        {nameedit &&
                          <MdOutlineModeEditOutline className='w-5 h-5 cursor-pointer' onClick={handleNameEdit} />
                        }
                      </div>
                      <div className="flex flex-col items-start">
                        <input
                          type="text"
                          name="name"
                          readOnly={nameedit ? true : false}
                          defaultValue={data != 0 && data.profile.name ? data.profile.name : ''}
                          className={nameedit ? "block w-full h-10 mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50  p-5 cursor-not-allowed" : "block w-full h-10 mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50  p-5"}
                          {...register("name", { required: "Name is required", maxLength: { value: 10, message: "Name cannot exceed more than 10 characters" }, pattern: { value: /^[A-Za-z]+$/i, message: "Enter valid Name" } })}
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                      </div>
                      {!nameedit &&
                        <div className='flex place-content-end space-x-3'>
                          <button type='submit' className='bg-[#A7F4A7] px-4 py-1 font-semibold text-white rounded-md'>Save</button>
                          <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-md' onClick={handleNameCancel}>Cancel</button>
                        </div>
                      }
                    </div>
                  </form>
                </div>

                <div className="w-full h-auto px-6 py-5 mt-6 overflow-hidden bg-stone-50  sm:max-w-lg sm:rounded-lg mx-auto">
                  <form onSubmit={handleSubmit2(onSubmitEmail)} method='post'>
                    <div className="mt-4 space-y-3">
                      <div className='flex place-content-between'>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Email :
                        </label>
                        {data != 0 && !data.profile.verified.email &&
                          < button className='px-4 py-1 bg-[#A7f4A7] text-white rounded-lg font-semibold' onClick={handleEmailVerify}>Verify</button>
                        }
                        {emailedit &&
                          <MdOutlineModeEditOutline className='w-5 h-5 cursor-pointer' onClick={handleEmailEdit} />
                        }
                      </div>

                      <div className="flex flex-col items-start">
                        <input
                          type="email"
                          name="email"
                          readOnly={emailedit ? true : false}
                          defaultValue={data.length !=0  && data.profile.email  ? data.profile.email : ''}
                          className={emailedit ? "block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 p-5 bg-white cursor-not-allowed" : "block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 p-5 bg-white"}
                          {...register2("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter valid email" } })}
                        />
                        {errors2.email && <p style={{ color: "red" }}>{errors2.email.message}</p>}
                      </div>
                      {!emailedit &&
                        <div className='flex place-content-end space-x-3'>
                          <button type='submit' className='bg-[#A7F4A7] px-4 py-1 font-semibold text-white rounded-md'>Save</button>
                          <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-md' onClick={handleEmailCancel}>Cancel</button>
                        </div>
                      }
                    </div>
                  </form>
                </div>
                <div className="w-full h-auto px-6 py-5  mt-6 overflow-hidden bg-stone-50  sm:max-w-lg sm:rounded-lg mx-auto">
                  <form onSubmit={handleSubmit3(onSubmitPhone)} method='post'>
                    <div className="mt-4 space-y-3">
                      <div className='flex place-content-between'>
                        <label
                          htmlFor="phonenumber"
                          className="block text-sm font-medium text-gray-700 undefined"
                        >
                          Phone :
                        </label>
                        {data != 0 && !data.profile.verified.phone &&
                          <button className='px-4 py-1 bg-[#A7f4A7] text-white rounded-lg font-semibold'>Verify</button>
                        }
                        {phoneedit &&
                          <MdOutlineModeEditOutline className='w-5 h-5 cursor-pointer' onClick={handlePhoneEdit} />
                        }
                      </div>

                      <div className="flex flex-col items-start">
                        <input
                          type="number"
                          name="phonenumber"
                          readOnly={phoneedit ? true : false}
                          defaultValue={data != 0 && data.profile.phonenumber ? data.profile.phonenumber : ''}
                          className={phoneedit ? "block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50  p-5 cursor-not-allowed" : "block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50  p-5 "}
                          {...register3("phonenumber", { required: "Phone Number is required", pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/, message: "Enter valid phone number" }, })}
                        />
                        {errors3.phonenumber && <p style={{ color: "red" }}>{errors3.phonenumber.message}</p>}
                      </div>
                      {!phoneedit &&
                        <div className='flex place-content-end space-x-3'>
                          <button type='submit' className='bg-[#A7F4A7] px-4 py-1 font-semibold text-white rounded-md'>Save</button>
                          <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-md' onClick={handlePhoneCancel}>Cancel</button>
                        </div>
                      }
                    </div>
                  </form>
                </div>


              </>
            }


            {/* change password start*/}
            {passwordtoggle &&
              <div className="w-full h-auto px-6 py-8 mt-6 overflow-hidden bg-stone-50  sm:max-w-lg sm:rounded-lg mx-auto">
                <form onSubmit={handleSubmit4(onSubmitChangePassword)} method='post'>
                  <div className="mt-4 ">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 undefined"
                    >
                      Old Password
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="password"
                        name="oldpassword"
                        className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 bg-gray-100"
                        {...register4("oldpassword", {
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
                      {errors4.oldpassword && <p style={{ color: "red" }}>{errors4.oldpassword.message}</p>}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="newpassword"
                      className="block text-sm font-medium text-gray-700 undefined"
                    >
                      New Password
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="password"
                        name="newpassword"
                        className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 bg-gray-100"
                        {...register4("newpassword", {
                          required: "New Password is required",
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
                      {errors4.newpassword && <p style={{ color: "red" }}>{errors4.newpassword.message}</p>}

                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="confirmpassword"
                      className="block text-sm font-medium text-gray-700 undefined"
                    >
                      Confirm Password
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="password"
                        name="confirmpassword"
                        className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A7F4A7] outline-none focus:ring-opacity-50 bg-gray-100"
                        {...register4("confirmpassword", {
                          required: "Confirm Password is required",
                          validate: value =>
                            value === watch('newpassword') || "The passwords do not match"
                        })}
                      />
                      {errors4.confirmpassword && <p style={{ color: "red" }}>{errors4.confirmpassword.message}</p>}

                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#A7F4A7] rounded-md  focus:outline-none  focus:bg-[#A7F4A7] font-bold">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            }
            {/* change password end*/}



          </div>

        </div>
        {showModal && <PhoneOTPModal setOpenModal={setShowModal} />}
      </div >

      {/* <Toaster/> */}

    </>
  )
}

export default UserPersonalInfo