import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
    token: string | null;
}

const initialState:TokenState = {
    token : localStorage.getItem('adminToken')
}

const adminToken = createSlice({
   name:'adminToken',
   initialState,
   reducers : {
       setToken : (state,action:PayloadAction<string>) => {
         state.token = action.payload
         localStorage.setItem('adminToken',action.payload)

       },
       removeToken : (state) => {
          state.token = null
          localStorage.removeItem("adminToken")

       }
   }
})

export const {setToken,removeToken} = adminToken.actions
export default adminToken.reducer