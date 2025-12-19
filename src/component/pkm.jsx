import { Button,Row, Col,Input, Modal, } from "antd";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

import "../style/pkm.css"

function Pkm() {
    const navigate = useNavigate()
    useEffect(()=>{
        if (!isAuthenticated()) {
            navigate("/login")
        }
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


    const items = [
        { id: 1, name: "Minyak", price: 17500 ,qty: 10},
        { id: 2, name: "Gula", price: 14000 ,qty: 4},
        { id: 3, name: "Telur", price: 28000 ,qty: 11},
        { id: 4, name: "Kopi", price: 12000 ,qty: 3},
        { id: 5, name: "Teh", price: 6000 ,qty: 14}
    ];

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
                    <div className="items-remaining">Item tersisa <span>{selectedItem.qty}</span> pcs !!</div>
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
                        {items.filter(item =>item.qty < 5 ).map(item=>{     
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