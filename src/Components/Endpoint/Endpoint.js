const BASE_URL = "http://localhost:5351/api/users";


export const LOGIN_USER = `${BASE_URL}/login`;
export const FORGOT_PASSWORD = `${BASE_URL}/forgot-password`;
export const RESET_PASSWORD = `${BASE_URL}/reset-password`;
export const PROFILE = `${BASE_URL}/profile`;
export const CREATEUSER =`${BASE_URL}/register`;
export const GETALLUSERS =`${BASE_URL}/getall/profiles`;


const BASE_URL_TOKEN ="http://localhost:5351/api/users";

export const REFRESH_TOKEN = `${BASE_URL_TOKEN}/refresh-token`;
