import {createSlice} from "@reduxjs/toolkit";


const initialState={
  token:localStorage.getItem("token")||null,
  isLoggedIn:localStorage.getItem("isLoggedIn")||false
}


const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    login:(state, action)=>{
      const {token}=action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);
      state.isLoggedIn=true;
      state.token=token;
    },
    logout:(state)=>{
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      state.isLoggedIn=false;
      state.token=null;

    }
  }
})


export const {login, logout}=authSlice.actions;
export default authSlice.reducer;