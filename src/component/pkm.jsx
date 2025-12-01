import { Button,Row, Col,Input, Modal, } from "antd";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { useState } from "react";

import "../style/pkm.css"

function Pkm() {

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
            <Modal
                title={<span className="modal-title">Gula</span>}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{className: "custom-ok-button"}}
                cancelButtonProps={{ className: "custom-cancel-button" }}
            >
                <div className="items-remaining">Item tersisa <span>4</span> pcs !!</div>
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

            <Row className="row-pkm" style={{height: '100%'}}>
                <Col className="col-pkm" span={16}>
                    <div className="search-pkm">
                        <Input className="value-input"/>
                    </div>
                    <div className="pkm-items">
                        <div className="pkm-item">
                            <span>minyak</span>
                            <Button className="acept-btn" onClick={showModal}>Acept</Button>
                        </div>
                        <div className="pkm-item">
                            <span>gula</span>
                            <Button className="acept-btn" onClick={showModal}>Acept</Button>
                        </div>
                        <div className="pkm-item">
                            <span>terigu</span>
                            <Button className="acept-btn" onClick={showModal}>Acept</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Pkm