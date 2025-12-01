import { Outlet,useNavigate } from "react-router-dom";
import { Layout, Button, } from "antd";
const {Header,Footer} = Layout


function MainLayout() {
    const Navigate = useNavigate()
    return(
        <>
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
                    <Button className="footer-btn" onClick={()=> Navigate("pkm/")}>PKM</Button>
                    <Button className="footer-btn" onClick={()=> Navigate()}>REPORT SALES</Button>
                    <Button className="footer-btn" onClick={()=> Navigate()}>CLOSING</Button>
                </Footer>
            </Layout>
        </>
    )
}

export default MainLayout