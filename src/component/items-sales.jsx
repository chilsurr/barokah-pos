import { Layout, Button,Row, Col,Input } from "antd";
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

import "../style/items-sales.css"

function ItemsSales() {
    const navigate = useNavigate()
     useEffect(()=>{
        if (!isAuthenticated()) {
            navigate("/login")
        }
    },[])
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