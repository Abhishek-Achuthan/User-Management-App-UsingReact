import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from './user/tokenSlice';
import userSlice from './user/userSlice'
import adminToken from './admin/adminSlice'
import editUser from './admin/editUser'


const savedToken = localStorage.getItem('token') || '';
const savedUser = localStorage.getItem('user');

const store = configureStore({
    reducer :{
        admin:adminToken,
        token:tokenSlice,
        user : userSlice,
        editUsr : editUser

    },
    preloadedState : {
        token : {
            token:savedToken,
        },
        user : savedUser?
        JSON.parse(savedUser) :
        {
            name : '',
            email: '',
            phone: '',
            token: ''
        }
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;