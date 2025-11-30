import { useNavigate } from "react-router-dom"
import { Layout, Button,Row, Col,Input } from "antd";

import "../style/items-sales.css"

function ItemsSales() {
    const Navigate = useNavigate()
    return(
        <Row className="row-items-sales" style={{height: '100%'}}>
            <Col className="col-items-sales" span={16}>
                <div className="items-sales-header">                  
                    <span>ITEMS SALES</span>
                </div>
                <div className='search-item'>
                    <Input placeholder='search product' />
                </div>
                <div className="items-sales">
                    <div className="item">
                        <span>gula</span>
                        <span>10</span>
                    </div>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div className="item" key={index}>
                            <span>gula</span>
                            <span>12</span>
                        </div>
                    ))}
                </div>
            </Col>
        </Row>
    ) 
}

export default ItemsSales