import { Button,Row, Col,Input, Modal, } from "antd";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../utils/api";
import { isAuthenticated } from "../utils/auth";

import "../style/pkm.css"

function Pkm() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    useEffect(()=>{
        const checkAuth = async()  =>{
            const isauth = await isAuthenticated()
            console.log(isauth)
            if (isauth.status === 200) {
                console.log("ini uda login pak")
                getProduct().then((result)=>{
                    console.log(result)
                    setItems(result)
                })
            }else{
                console.log('lewat sini pack')
                navigate("/login")
            }  
        }
        checkAuth()
    },[])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const showModal = (item) => {
        setSelectedItem(item)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [count, setCount] = useState(5);

    const increase = () => {
        setCount(count + 1);
    };
    const decline = () => {
        let newCount = count - 1;
        if (newCount < 0) {
        newCount = 0;
        }
        setCount(newCount);
    };


    return(
        <>
            {selectedItem && (
                <Modal
                title={<span className="modal-title">{selectedItem.name}</span>}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{className: "custom-ok-button"}}
                cancelButtonProps={{ className: "custom-cancel-button" }}
                >
                    <div className="items-remaining">Item tersisa <span>{selectedItem.stock}</span> pcs !!</div>
                    <div className="items-to-add">Total item yang ditambahkan</div>
                    <div className="counter">
                        <Button className="counter-btn" onClick={decline}>
                            <MinusOutlined />
                        </Button>
                        <div className="count">{count}</div>
                        <Button className="counter-btn" onClick={increase}>
                            <PlusOutlined />
                        </Button>
                    </div>
                </Modal>
            
            )}

            <Row className="row-pkm" style={{height: '100%'}}>
                <Col className="col-pkm" span={16}>
                    <div className="search-pkm">
                        <Input className="value-input"/>
                    </div>
                    <div className="pkm-items">
                        {items.filter(item =>item.stock < 15 ).map(item=>{     
                            return <div className="pkm-item">
                                    <span>{item.name}</span>
                                    <Button className="acept-btn" onClick={()=>showModal(item)}>Acept</Button>
                                </div>
                        })}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Pkm