import axios from "axios"
import axiosInstance from "./axios-instance"


export const postLogin = async(data) =>{
    const login = await axiosInstance.post('/token/', data, )
    return login
}

export const postExcel = async(data) =>{
    const formData = new FormData()
    formData.append("excel-file",data)
    const excel = axios.post("/upload-excel/", formData)
    return excel
}

export const checkAuth = async() =>{
   const user = await axios.get('/check-auth/',);
    return user.data;
}
