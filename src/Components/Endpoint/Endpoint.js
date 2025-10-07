//------BaseURI Apis connectors For User
const BASE_URL = "http://localhost:5351/api/users";
//  const BASE_URL ="http://192.168.0.167:5351/api/users";
// const BASE_URL = "https://projecterp.onrender.com/api/users";

export const LOGIN_USER = `${BASE_URL}/login`;
export const FORGOT_PASSWORD = `${BASE_URL}/forgot-password`;
export const RESET_PASSWORD = `${BASE_URL}/reset-password`;
export const PROFILE = `${BASE_URL}/profile`;
export const CREATEUSER =`${BASE_URL}/register`;
export const GETALLUSERS =`${BASE_URL}/getall/profiles`;

//------BaseURI Apis connectors For Token
// const BASE_URL_TOKEN ="https://projecterp.onrender.com/api/token";
//  const BASE_URL_TOKEN ="http://192.168.0.167:5351/api/token";
const BASE_URL_TOKEN ="http://localhost:5351/api/users";

export const REFRESH_TOKEN = `${BASE_URL_TOKEN}/refresh-token`;