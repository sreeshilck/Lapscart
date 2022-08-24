import { configureStore } from '@reduxjs/toolkit'
import { registerSlice} from '../features/User/registerSlice'
import { loginSlice} from '../features/User/loginSlice'
import { profileSlice } from '../features/User/userSlice'

//import {registerSlice} from '../features/User/userSlice'

export const store = configureStore({
  reducer: {
    userRegister: registerSlice.reducer,
    reset:registerSlice.reducer,
    userLogin: loginSlice.reducer,
    userProfile: profileSlice.reducer,
  },
})