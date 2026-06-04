import {createSlice} from '@reduxjs/toolkit';
import {userLogin} from './authAction';
import {userRegister} from './authAction';
import {getCurrentUser} from './authAction';

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        token:null,
        loading:false,
        error:null
    },
    reducers:{},
extraReducers: (builder) => {
    builder
    //login cases
        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        }) 
        .addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        })
        //register cases can be added here in the same way as login
        .addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(userRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.error = null;
        }) 
        .addCase(userRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Registration failed';
        })
        //curr user
        .addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            // console.log("THE DATA FROM BACKEND:", action.payload);
            state.loading = false;
            state.user = action.payload.user;
            state.error = null;
            state.token = localStorage.getItem('token') || null;
        }) 
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to fetch current user';
        });
}
})

export default authSlice;