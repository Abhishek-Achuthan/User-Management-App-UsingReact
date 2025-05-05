import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { EditUser } from "../../types/user/user";


const initialState = {
    name : '',
    phone : '',
    email : '',
    userId: '',
    image : '',
}

const editUser = createSlice({
    name : 'editusr',
    initialState,
    reducers : {
        addUser : (state,action : PayloadAction<EditUser>) => {
            state.email = action.payload.email,
            state.phone = action.payload.phone,
            state.name = action.payload.name, 
            state.userId = action.payload._id,
            state.image = action.payload.image
        }
    }
})

export const {addUser} = editUser.actions;
export default editUser.reducer