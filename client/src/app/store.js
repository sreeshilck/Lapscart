import { configureStore } from '@reduxjs/toolkit'
import {registerSlice} from '../features/User/registerSlice'
import {loginSlice} from '../features/User/loginSlice'

//import {registerSlice} from '../features/User/userSlice'

export const store = configureStore({
  reducer: {
    userRegister: registerSlice.reducer,
    reset:registerSlice.reducer,
    userLogin: loginSlice.reducer,
  },
})