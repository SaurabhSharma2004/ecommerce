const BASE_URL = process.env.REACT_APP_BASE_URL

//AUTH ENDPOINTS

export const authEndpoints = {
    SIGNUP_API : `${BASE_URL}/signup`,
    LOGIN_API : `${BASE_URL}/login`,
    AllUsers_API: `${BASE_URL}/all-users`,
    EditUser_API: `${BASE_URL}/edit-user`,
}

//PRODUCT ENDPOINTS

export const productEndpoints = {
    UPLOAD_PRODUCT_API : `${BASE_URL}/upload-product`,
}