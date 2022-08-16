import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'



export const userRegisterData =  createAsyncThunk(
  "userRegister/register",
  async (arg, {rejectWithValue}) => {

  try {
      
      const response = await axios.post("http://localhost:5000/api/user/signup",{
        ...arg,
      },)
      //console.log(response.data,"returned Data from axios");
      return response.data;
       
  } catch (error) {
    let message = error.response.data;
    //console.log(error.response.data,"error.response.data");
    return rejectWithValue(message)
      
  }
});




const initialState = {
  data: [],
  loading: false,
  isSuccess: false,
  message: "",
}


//user register slice
export const registerSlice = createSlice({
    name: "userRegister",
    initialState,
    reducers: {
      reset:() => initialState
    },
    extraReducers: {
            [userRegisterData.pending]: (state) => {
                state.loading = true;
            },
            [userRegisterData.fulfilled]: (state, {payload}) => {
                state.loading = false;
                state.data = payload;
                state.isSuccess = true;
            },
            [userRegisterData.rejected]: (state, action) => {
                state.data = action.payload
                state.message = action.payload.message;
                state.loading = false;
                state.isSuccess = false;
            },
    },
  })

  









export const {reset} = registerSlice.actions 
export default registerSlice;