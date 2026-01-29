import { Outlet,useNavigate,useLocation } from "react-router-dom";
import { Layout, Button, Badge, Modal, Input ,DatePicker } from "antd";
import { useState,useEffect } from "react";
import { isAuthenticated } from "./utils/auth";
import { getOrders,getOrderDetail, postClosing, postLogin} from "./utils/api";
import dayjs from "dayjs";

const {Header,Footer} = Layout


function MainLayout() {
    const Navigate = useNavigate()
    const location = useLocation()
    const [dataUser,setDataUser] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const [date,setDate] = useState()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [dateInput,setDateInput] = useState('')

    console.log(username)
    console.log(password)
    console.log(dateInput)
    
    const handleOk = async() => {
        try {
            const data = {"username": username,"password": password}
            const logOut = await postLogin(data)

            if( logOut.status === 200){
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

                

                const closeData = {
                    "std" : dataOrder.length,
                    "avc" : avc,
                    "itm" : dataOrderDetail.length,
                    "hpp" : hpp,
                    "inc" : inc,
                    "prf" : prf,
                    "user" : dataUser.id,
                }
                alert('berhasil pak')
                const result = await postClosing(closeData)
            }else{
                alert("closing gagal pak")
            } 
        } catch (error) {
           console.log(error)
           alert('username atau password salah pak') 
        }
            
        alert('masuk pak')
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setUsername('')
        setPassword('')
        setDateInput('')
        setIsModalOpen(false);
    };

    const onChange = (date, dateString) => {
        setDateInput(dateString);
    };
    

    useEffect(()=>{
        const checkAuth = async() =>{
            const isAuth = await isAuthenticated()
            setDataUser(isAuth.data)
            if(isAuth.status === 200){
                console.log('login true')
                const formatDate = dayjs().format("YYYY-MM-DD");
                setDate(formatDate)
        
            }else{
                setIsLogin('false')
                console.log('login false')
            }
        }
        checkAuth()
    },[isModalOpen])

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
                    <DatePicker className="close-input" value={dateInput} onChange={onChange} />
                    <Input className="close-input" placeholder="input username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    <Input.Password className="close-input" placeholder="input password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
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
                    <Button className={location.pathname === '/' ? "footer-btn-active" : "footer-btn"} onClick={()=> Navigate("/")}>HOME</Button>
                    <Button className={location.pathname === '/items-sales/' ? "footer-btn-active" : "footer-btn"} onClick={()=> Navigate("items-sales/")}>ITEMS SALES</Button>
                    {/* <Badge className="custom-badge" count={5} offset={[-20, 4]}>
                        <Button className="footer-btn" onClick={()=> Navigate("pkm/")}>PKM</Button>
                    </Badge> */}
                    <Button className={location.pathname === '/pkm/' ? "footer-btn-active" : "footer-btn"} onClick={()=> Navigate("pkm/")}>PKM</Button>
                    <Button className={location.pathname === '/stock/' ? "footer-btn-active" : "footer-btn"} onClick={()=> Navigate("stock/")}>STOCK</Button>
                    <Button className= "footer-btn" onClick={showModal}>CLOSING</Button>
                    <Button className= "footer-btn" onClick={()=> Navigate("/home-dashboard/")}>DASHBOARD</Button>
                </Footer>
            </Layout>
        </>
    )
}

export default MainLayout