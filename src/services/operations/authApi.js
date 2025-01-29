import { toast } from 'react-hot-toast'
import { authEndpoints } from '../apis'
import { apiConnector } from "../apiConnector"
import {setLoading, setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"

const {
    SIGNUP_API,
    LOGIN_API,
    AllUsers_API,
    EditUser_API
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

export const fetchAllUsers = async (token) => {
    // console.log("printing token in authApi", token);
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", AllUsers_API, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("AllUsers_API_RESPONSE", response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("All users fetched")
        result = response.data.data
    } catch (error) {
        console.log("AllUsers API ERROR............", error);
        toast.error("Failed to fetch all users");
    }
    
    toast.dismiss(toastId)
    return result
}

export const editUser = async (token,id, data) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT", `${authEndpoints.EditUser_API}/${id}`, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("EditUser_API_RESPONSE", response);
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("User updated")

    } catch (error) {
        console.log("EditUser API ERROR............", error);
        toast.error("Failed to update user");
    }
    toast.dismiss(toastId)
}