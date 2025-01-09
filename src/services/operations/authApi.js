import { toast } from 'react-hot-toast'
import { authEndpoints } from '../apis'
import { apiConnector } from "../apiConnector"
import {setLoading, setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"

const {
    SIGNUP_API,
    LOGIN_API
} = authEndpoints

export function signUp(
    name,
    email,
    password,
    confirmPassword,
    profilePicture,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                name,
                email,
                password,
                confirmPassword,
                profilePicture
            })

            console.log("SIGNUP_API_RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error("Signup Failed");
            navigate("/sign-up")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })

            console.log("LOGIN_API_RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login successful")
            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.profilePicture ? response.data.user.profilePicture : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`

            // setImage to redux user
            dispatch(setUser({...response.data.user, profilePicture:userImage}))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/")
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
            navigate("/login")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout (navigate) {
    return (dispatch) => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch(setToken(null))
        dispatch(setUser(null))
        toast.success("Logout successful")
        navigate("/login")
    }
}