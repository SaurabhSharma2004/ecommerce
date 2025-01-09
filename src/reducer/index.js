import {combineReducers} from "@reduxjs/toolkit"
import authSlice from "../slices/authSlice"
import profileSlice from "../slices/profileSlice"

const rootReducer = combineReducers({
    // Add your reducers here
    auth:authSlice,
    profile:profileSlice
})

export default rootReducer