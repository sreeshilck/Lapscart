import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





export const userProfileData = createAsyncThunk(
    "userProfile/profile",
    async (userData ,{ rejectWithValue }) => {

      try {
        const {id, token} = userData
        const { data } = await axios.post("http://localhost:5000/api/user/profile", {
          id
        },{
         headers: {'Authorization' : `Bearer ${token}`},
          //withCredentials: true,
        })
        localStorage.setItem('profileDetails', JSON.stringify(data));
        return data;
  
      } catch (error) {
        let Errmessage = error.response.data;
        console.log(error," %% error in axios catch");
        return rejectWithValue(Errmessage)
      }
    });
  
  
  





//get userprofile slice
export const profileSlice = createSlice({
    name: "userProfile",
    initialState: {
      data: [],
      loading: false,
      isSuccess: false,
      message: "",
    },
    reducers: {
      // Reducer comes here
    },
    extraReducers: {
  
      [userProfileData.pending]: (state) => {
        state.loading = true;
      },
      [userProfileData.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.isSuccess = true;
      },
      [userProfileData.rejected]: (state, action) => {
        state.data = action.payload;
        state.message = action.payload.message;
        state.loading = false;
        state.isSuccess = false;
      },
  
    },
  })



  export default profileSlice;











































































// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// import axios from 'axios'


// //userRegistration
// export const userRegisterData =  createAsyncThunk(
//     "userRegister/register",
//     async (arg, {rejectWithValue}) => {
  
//     try {
        
//         const response = await axios.post("http://localhost:5000/api/user/signup",{
//           ...arg,
//         },)
//         //console.log(response.data,"returned Data from axios");
//         return response.data;
         
//     } catch (error) {
//       let message = error.response.data;
//       //console.log(error.response.data,"error.response.data");
//       return rejectWithValue(message)
        
//     }
//   });
  




//   const initialState = {
//     data: [],
//     loading: false,
//     isSuccess: false,
//     message: "",
//   }
  
  
//   //user register slice
//   export const registerSlice = createSlice({
//       name: "userRegister",
//       initialState,
//       reducers: {
//         reset:() => initialState
//       },
//       extraReducers: {
//               [userRegisterData.pending]: (state) => {
//                   state.loading = true;
//               },
//               [userRegisterData.fulfilled]: (state, {payload}) => {
//                   state.loading = false;
//                   state.data = payload;
//                   state.isSuccess = true;
//               },
//               [userRegisterData.rejected]: (state, action) => {
//                   state.data = action.payload
//                   state.message = action.payload.message;
//                   state.loading = false;
//                   state.isSuccess = false;
//               },
//       },
//     })
  
    












// // export const {reset} = userSlice.actions 
// // export default userSlice;


