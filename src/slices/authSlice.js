import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData:null,
    loading:null,
    token:localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
}

const authSlice = createSlice({
    initialState:initialState,
    name:'auth',
    reducers:{
        setToken: (state, action) => {
            state.token = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload
        }
    }
})

export const {setToken, setLoading, setSignupData} = authSlice.actions
export default authSlice.reducer