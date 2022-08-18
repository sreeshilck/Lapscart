import React from 'react'
import { Helmet } from 'react-helmet'
import {Routes, Route, useParams} from 'react-router-dom'
import ForgotPassword from '../components/User/ForgotPassword/ForgotPassword'
import ResetPasswordPage from '../components/User/ForgotPassword/ResetPasswordPage'
import Login from '../components/User/Login/Login'
import Verifyotp from '../components/User/OTP/Verifyotp'
import Signup from '../components/User/Signup/Signup'

function UserPage() {
  return (
    <>
    <Helmet>
        <title>Lapscart</title>
    </Helmet>
    <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    
    <Route path='/verify' element={<Verifyotp/>}/>
    <Route path='/forgotpassword' element={<ForgotPassword/>}/>
    <Route path='/passwordreset/:token' element={<ResetPasswordPage/>}/>

    
    
    {/* <Route path='/hom' element={</>}/> */}
    </Routes>
    </>
  )
}

export default UserPage