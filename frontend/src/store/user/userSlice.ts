import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/user/user";


const initialState:UserState = {
    name : '',
    email:'',
    phone: '',
    token: '',
    image: ''
}


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser : (state, action :PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.token = action.payload.token;
            state.image = action.payload.image
        },
        logoutUser :(state) => {
            state.name  = ''
            state.email =''
            state.phone = ''
            state.token = ''
            state.image = ''
       }
    }
})

export const {setUser , logoutUser} = userSlice.actions;
export default userSlice.reducer;