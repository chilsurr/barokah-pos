import { Row, Col,Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderDetail } from "../utils/api";
import { isAuthenticated } from "../utils/auth";
import SearchBox from "../utils/search";
import { Empty } from 'antd';
import dayjs from "dayjs";

import "../style/items-sales.css"


function ItemsSales() {
    const navigate = useNavigate()
    const[items, setItems] = useState([])
    
    useEffect(()=>{
        const checkAuth = async()  =>{
            const isauth = await isAuthenticated()
    
            const formatDate = dayjs().format("YYYY-MM-DD");
            if (isauth.status === 200) {
                getOrderDetail().then((result)=>{
                    const data = result.data
                    const cuki = data.filter(product => product.created_at == formatDate && product.user == isauth.data.id)
                    const newData = Object.values(
                        cuki.reduce((accum,item)=>{
                            if(!accum[item.product.id]){
                                accum[item.product.id] = {...item}
                            }else{
                                accum[item.product.id].quantity += item.quantity 
                            }
                            return accum
                        },{})
                    ) 
                    setItems(newData)
                })
            }else{
                navigate("/login")
            }  
        }
        checkAuth()        
    },[])     

    
    const [dataSearch, setDataSearch] = useState([])
    const [searchValue,setSearchValue] = useState('')
    const handleChange = (e) =>{
        const value = e.target.value
        setSearchValue(value)
        console.log(items)
        const data = items.filter((item)=>{
            return item.product.name.toLowerCase().includes( value.toLowerCase()) 
        })
        console.log(data)
        setDataSearch(data)
    } 

    return(
        <Row className="row-items-sales" style={{height: '100%'}}>
            <Col className="col-items-sales" span={16}>
                <div className="items-sales-header">                  
                    <span>ITEMS SALES</span>
                </div>
                <div className='search-item'>
                    <SearchBox onChange={handleChange} value={searchValue}/>
                    {/* <Input placeholder='search product' onChange={(e)=> setDataInput(e.target.value)} /> */}
                </div>
                <div className="items-sales">
                    {items.length === 0 ?(
                        <div className="empty">
                            <Empty />
                        </div>
                    ) : ((dataSearch.length > 0 ? dataSearch : items).map((item) => (
                        <div className="item" key={item.id}>
                            <span>{item.product.name}</span>
                            <span>{item.quantity}</span>
                        </div>
                    )))
                    }
                </div>
            </Col>
        </Row>
    ) 
}

export default ItemsSales