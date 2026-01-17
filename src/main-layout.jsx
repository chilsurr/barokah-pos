import { Outlet,useNavigate } from "react-router-dom";
import { Layout, Button, Badge, Modal, Input ,DatePicker } from "antd";
import { useState,useEffect } from "react";
import { isAuthenticated } from "./utils/auth";
import { getOrders,getOrderDetail, postClosing } from "./utils/api";

const {Header,Footer} = Layout


function MainLayout() {
    const Navigate = useNavigate()
    const [dataUser,setDataUser] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const [date,setDate] = useState()
    
    const handleOk = async() => {

        const dataOrder = await getOrders().then((result) =>{
            return result.data.filter((item) => item.created_at.slice(0, 10) === date)
        })
        const dataOrderDetail = await getOrderDetail().then((result) => result.data.filter((item) => item.created_at === date))
        const inc = dataOrder.reduce((accum,item) =>{
            return accum + item.total
        }, 0)

        const avc =  Math.round(inc/dataOrder.length)

        const hpp = dataOrderDetail.reduce((accum,item) =>{
            return accum + item.product.hpp
        }, 0)

        const prf = inc - hpp

 
        console.log(inc)
        console.log(hpp)
        console.log(prf)

        const closeData = {
            "std" : dataOrder.length,
            "avc" : avc,
            "itm" : dataOrderDetail.length,
            "hpp" : hpp,
            "inc" : inc,
            "prf" : prf,
            "user" : dataUser.id,
        }
        
        const result = await postClosing(closeData)
        
        alert('masuk pak')
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (date, dateString) => {
        console.log(date);
        console.log(dateString);
    };
    
    const [isLogin,setIsLogin] = useState("false")
    useEffect(()=>{
        const checkAuth = async() =>{
            const isAuth = await isAuthenticated()
            setDataUser(isAuth.data)
            if(isAuth.status === 200){
                setIsLogin('true')
                console.log('login true')
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
                const dd = String(today.getDate()).padStart(2, '0');
                const formatDate = `${yyyy}-${mm}-${dd}`;
                setDate(formatDate)
        
            }else{
                setIsLogin('false')
                console.log('login false')
            }
        }
        checkAuth()
    },[])

    return(
        <>
            <Modal
                title="CLOSING"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{className: "custom-ok-button"}}
                cancelButtonProps={{ className: "custom-cancel-button" }}
                className="close-modal"
            >
                <div className="form-close">
                    <DatePicker className="close-input" onChange={onChange} />
                    <Input className="close-input" placeholder="input username" />
                    <Input.Password className="close-input" placeholder="input password" />
                </div>
            </Modal>

            <Layout className="container">
                <Header className="header">
                    <div>BAROKAH MART</div>
                </Header>
                <Layout className="main-content">
                    <Outlet/>
                </Layout>
                <Footer className="footer">
                    <Button className="footer-btn" onClick={()=> Navigate("/")}>HOME</Button>
                    <Button className="footer-btn" onClick={()=> Navigate("items-sales/")}>ITEMS SALES</Button>
                    <Badge className="custom-badge" count={5} offset={[-20, 4]}>
                        <Button className="footer-btn" onClick={()=> Navigate("pkm/")}>PKM</Button>
                    </Badge>
                    <Button className="footer-btn" onClick={()=> Navigate("stock/")}>STOCK</Button>
                    <Button className="footer-btn" onClick={showModal}>CLOSING</Button>
                    <Button className="footer-btn" onClick={()=> Navigate("/home-dashboard/")}>DASHBOARD</Button>
                </Footer>
            </Layout>
        </>
    )
}

export default MainLayout