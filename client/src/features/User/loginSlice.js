import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'



export const userLoginData =  createAsyncThunk(
  "userLogin/login",
  async (arg, {rejectWithValue}) => {

  try {
      
      const {data} = await axios.post("http://localhost:5000/api/user/login",{
        ...arg,
      },)
      return data;
       
  } catch (error) {
    rejectWithValue(error.response.data)
  }
});







//user login slice
export const loginSlice = createSlice({
    name: "userLogin",
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
        extraReducers: {
            [userLoginData.pending]: (state, {payload}) => {
                state.loading = true;
            },
            [userLoginData.fulfilled]: (state, {payload}) => {
                state.loading = false;
                state.data = payload;
                state.isSuccess = true;
            },
            [userLoginData.rejected]: (state, {payload}) => {
                state.message = payload;
                state.loading = false;
                state.isSuccess = false;
            },
        },
    },
  })

  










export default loginSlice;