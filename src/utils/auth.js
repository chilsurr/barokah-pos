import {checkAuth } from "./api";

export const isAuthenticated = async() =>{
    const token = localStorage.getItem("access_token");
    if(token){
        try {
            const check = await checkAuth(token)
            return check;
        } catch (error) {
            return false;
        }
    }
}