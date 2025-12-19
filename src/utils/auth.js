import {checkAuth } from "./api";

export const isAuthenticated = async() =>{
    const token = localStorage.getItem("access_token");
    if(token){
        try {
            const auth = await checkAuth(token)
            console.log(auth)
            console.log(auth.status)
            return auth.status === true;  // misal status 200 artinya login valid
        } catch (error) {
            return false;
        }
    }
}