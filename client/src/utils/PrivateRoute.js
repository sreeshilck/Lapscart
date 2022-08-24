import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const userData = JSON.parse(localStorage.getItem('loginDetails'));
    let auth = {'isLoggedIn': userData ? userData.isLoggedIn : false}
    console.log(auth.isLoggedIn," == auth.isloggedin");

    return(
        auth.isLoggedIn ? <Outlet /> : <Navigate to ='/user/login' />
    )
}


export default PrivateRoute