import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchChat = createAsyncThunk(
  "chat/fetchChat",
  async () => {
    const token=localStorage.getItem("token");
    console.log("extracted token", token);
    const res = await fetch("http://demo1.aichatarman.online/api/getGemini",{
      method:"GET", 
      headers:
      {
        Authentication: "Bearer"+ " " + token
      }
    });
    const data=await res.json();

    if(res.status==200){
      return data
    }
    throw new Error(data.message);
  }
);


const initialState={
  name:null,
  errors:null,
  chats:[],
  isLoading:false
}

const chatSlice=createSlice({
  name:"chat",
  initialState,
  reducers:{
    deleteChat:(state, action)=>{
      const id=action.payload;
      state.chats=state.chats.filter((chat)=>{
        if(chat._id==id){
          return false;
        }
        else{
          return true;
        }
      
    })},
    updateChat:(state, action)=>{

      state.chats=state.chats.map((chat)=>{
        if(chat._id==action.payload.reaction._id){
          return action.payload.reaction;
        }
        else{
          return chat;
        }

      })
  
    },
    addChat:(state, action)=>{
      state.chats=[...state.chats, action.payload.result];

    }
  },
   extraReducers: (builder) => {
      builder.addCase(fetchChat.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload.result.messageHistory;
        state.name = action.payload.result.name;
      });
      builder.addCase(fetchChat.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
  },

})

export const {deleteChat, updateChat, 
addChat}=chatSlice.actions;

export default chatSlice.reducer;
