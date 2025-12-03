import { Outlet,useNavigate } from "react-router-dom";
import { Layout, Button, Badge, Modal, Input ,DatePicker } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from "react";
const {Header,Footer} = Layout


function MainLayout() {
    const Navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
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
                    <Input className="close-input" placeholder="Basic usage" />
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
                    <Button className="footer-btn" onClick={()=> Navigate("report-sales/")}>REPORT SALES</Button>
                    <Button className="footer-btn" onClick={showModal}>CLOSING</Button>
                </Footer>
            </Layout>
        </>
    )
}

export default MainLayout