import { checkAuth } from "./api";

export const isAuthenticated = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        return {
            status: 401,
            message: "Token not found"
        };
    }
    // if (token) {
    try {
        const check = await checkAuth(token)
        console.log(check)
        return check;
    } catch (error) {
        return {
            status: 401,
            message: "Unauthorized"
        };
    }
    // }
}