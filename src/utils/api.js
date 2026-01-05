import axiosInstance from "./axios-instance"


export const postLogin = async(data) =>{
    const login = await axiosInstance.post('/token/', data, )
    return login
}
export const postOrder = async(data) =>{
    const order = await axiosInstance.post('/order/',data)
    return order
}
export const postOrderDetail = async(data) =>{
    const orderdetail = await axiosInstance.post('/orderdetail/',data)
    return orderdetail
}

export const postExcel = async(data) =>{
    const formData = new FormData()
    formData.append("excel-file",data)
    const excel = axiosInstance.post("/upload-excel/", formData)
    return excel
}

export const checkAuth = async() =>{
    const user = await axiosInstance.get('/check-auth/',);
    return user;
}

export const getOrderDetail = async() =>{
    const orderdetail = await axiosInstance.get('/orderdetail/',)
    return orderdetail
}

export const getProduct = async() =>{
    const items = await axiosInstance.get("/products/",);
    return items.data
}


export const putProduct = async(id,data) =>{
    const items = await axiosInstance.put(`/products/${id}/`, data);
    return items
}
