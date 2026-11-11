import axiosInstance from "./axios-instance"


export const postLogin = async(data) =>{
    const login = await axiosInstance.post('/login/', data, )
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
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        console.log(pair[1] instanceof File);
    }

    const excel = axiosInstance.post("/upload-excel/", formData)
    return excel
}

export const postClosing = async(data) =>{
    // const closing = await axiosInstance.post('/closing/', data)
    return await axiosInstance.post('/closing/', data)
}

export const checkAuth = async() =>{
    const user = await axiosInstance.get('/check-auth/',);
    return user;
}

export const getCurrentUser = async () => {
    const cachedId = localStorage.getItem("user_id");
    const cachedUsername = localStorage.getItem("username");
    if (cachedId) {
        return { id: Number(cachedId), username: cachedUsername };
    }
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    try {
        const res = await axiosInstance.get('/check-auth/');
        if (res.data?.id) {
            localStorage.setItem("user_id", res.data.id);
            if (res.data.user) {
                localStorage.setItem("username", res.data.user);
            }
            return { id: res.data.id, username: res.data.user };
        }
    } catch (e) {
        console.warn("Failed to get current user in POS:", e);
    }
    return null;
}

export const getOrders = async() =>{
    const order = await axiosInstance.get('/order/')
    return order
}

export const getOrderDetail = async() =>{
    const orderdetail = await axiosInstance.get('/orderdetail/',)
    return orderdetail
}

export const getOnlineOrders = async() =>{
    const order = await axiosInstance.get('/order/?order_type=online')
    return order
}

export const patchOrder = async(id, data) =>{
    const order = await axiosInstance.patch(`/order/${id}/`, data)
    return order
}

export const getProduct = async() =>{
    const items = await axiosInstance.get("/products/",);
    return items.data
}


export const getClosing = async() =>{
    return await axiosInstance.get('/closing/')
}


export const putProduct = async(id,data) =>{
    const items = await axiosInstance.put(`/products/${id}/`, data);
    return items
}
