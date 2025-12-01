import { Button,Row, Col,Input, Modal } from "antd";
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
                title="Item Tersisa 4pcs"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <Button onClick={decline}>
                    <MinusOutlined />
                </Button>
                <span>{count}</span>
                <Button onClick={increase}>
                    <PlusOutlined />
                </Button>
            </Modal>

            <Row className="row-pkm" style={{height: '100%'}}>
                <Col className="col-pkm" span={16}>
                    <div className="search-pkm">
                        <Input className="value-input"/>
                    </div>
                    <div className="pkm-items">
                        <div className="pkm-item">
                            <span>minyak</span>
                            <Button onClick={showModal}>Acept</Button>
                        </div>
                        <div className="pkm-item">
                            <span>gula</span>
                            <Button onClick={showModal}>Acept</Button>
                        </div>
                        <div className="pkm-item">
                            <span>terigu</span>
                            <Button onClick={showModal}>Acept</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Pkm