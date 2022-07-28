import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"


const storeData = JSON.parse(localStorage.getItem("persist:root"));
const currentUser = storeData !== null 
    ? JSON.parse(storeData.user).currentUser
    : null;

const B_TOKEN = currentUser !== null ? currentUser.accessToken : "xyz";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers : {
        authorization : `Bearer ${B_TOKEN}`
    }
});