import { Outlet,useNavigate } from "react-router-dom";
import { Layout, Button, } from "antd";
const {Header,Footer} = Layout

import Home from "./component/home";


function MainLayout() {
    return(
        <>
            <Layout className="container">
                <Header className="header">
                    <div>BAROKAH</div>
                </Header>
                <Layout className="main-content">
                    <Outlet/>
                </Layout>
                <Footer className="footer">
                    <Button className="footer-btn">HOME</Button>
                    <Button className="footer-btn">HOME</Button>
                    <Button className="footer-btn">HOME</Button>
                    <Button className="footer-btn">HOME</Button>
                </Footer>
            </Layout>
        </>
    )
}

export default MainLayout