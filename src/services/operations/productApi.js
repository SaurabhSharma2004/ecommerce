import { toast } from 'react-hot-toast'
import { productEndpoints } from '../apis'
import { apiConnector } from "../apiConnector"

const {
    UPLOAD_PRODUCT_API
} = productEndpoints

export const uploadProduct = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPLOAD_PRODUCT_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("UPLOAD_PRODUCT_API_RESPONSE", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Product uploaded")
        result = response
    } catch (error) {
        console.log("UPLOAD_PRODUCT_API ERROR............", error);
        toast.error("Product upload failed");
    }
    toast.dismiss(toastId)
    return result
}