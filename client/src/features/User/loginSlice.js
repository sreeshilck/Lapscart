import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'



export const userLoginData = createAsyncThunk(
  "userLogin/login",
  async (arg, { rejectWithValue }) => {

    try {

      const { data } = await axios.post("http://localhost:5000/api/user/login", {
        ...arg,
      },{
        withCredentials: true,
      })
      return data;

    } catch (error) {
      let Errmessage = error.response.data;
      return rejectWithValue(Errmessage)
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

    [userLoginData.pending]: (state) => {
      state.loading = true;
    },
    [userLoginData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [userLoginData.rejected]: (state, action) => {
      state.data = action.payload;
      state.message = action.payload.message;
      state.loading = false;
      state.isSuccess = false;
    },

  },
})












export default loginSlice;