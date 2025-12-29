import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { ConfigProvider,Upload,message, Button,Row, Col,Input ,Modal} from "antd";
import { postExcel,getProduct } from "../utils/api";
import { isAuthenticated } from "../utils/auth";

import "../style/stock.css"


function stock() {
    const navigate = useNavigate()
    const[items, setItems] = useState([])
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
    const props = {
        beforeUpload: file => {
            const isXlsx = 
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel';
            if (!isXlsx) {
                message.error(`${file.name} is not excel file`);
                return isXlsx || Upload.LIST_IGNORE;
            }else{
                postExcel(file)
                alert("upload berhasil pak")
                // return false;
            }
        },
        // onChange: info => {
        //     console.log(info.fileList);
        // },
    };

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


    // const items = [
    //     { id: 1, name: "Minyak", price: 17500 ,qty: 1},
    //     { id: 2, name: "Gula", price: 14000 ,qty: 1},
    //     { id: 3, name: "Garam", price: 5000 ,qty: 1},
    //     { id: 4, name: "Telur", price: 28000 ,qty: 1},
    //     { id: 5, name: "Kopi", price: 12000 ,qty: 1},
    //     { id: 6, name: "Teh", price: 6000 ,qty: 1}
    // ];

    const[dataSearch, setDataSearch] = useState(items)
    const handleSearch = (datainput)=>{
        console.log(datainput.toLowerCase())
        const data = items.filter((item)=>{
            console.log(item.name.toLowerCase() )
            return item.name.toLowerCase().includes(datainput.toLowerCase()) 
        })
        setDataSearch(data)
    }


    return(
        <>
        <ConfigProvider
        theme={{
            token: {
            colorPrimary: '#2E7D32', // hijau
            },
        }}
        >
        <Modal
        title={<span className="modal-title">Add Your Items</span>}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{className: "custom-ok-button"}}
        cancelButtonProps={{ className: "custom-cancel-button" }}
        >
            <Upload {...props} maxCount={1} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload Here</Button>
            </Upload> 
        </Modal>
        </ConfigProvider>
        <Row className="row-stock" style={{height: '100%'}}>
            <Col className="col-stock" span={16}>
                <div className="header-actions">
                    <Input placeholder='search product' onChange={(e)=>handleSearch(e.target.value)}/>
                    <Button onClick={()=>showModal()}>Update Stock</Button>
                </div>
                <div className="stock-header">
                    <span className="stock-header-name">Name</span>
                    <div className="stock-header-child">
                        <span>Hpp</span>
                        <span>Price</span>
                        <span>Stock</span>
                    </div>
                </div>
                <div className="stock">
                    <div className="item">
                        <span className="item-name">gula</span>
                        <div className="item-child">
                            <span>15.000</span>
                            <span>17.500</span>
                            <span>10</span>
                        </div>
                    </div>
                    {(dataSearch.length > 0 ? dataSearch : items).map((item) => (
                        <div className="item" key={item.id}>
                        <span className="item-name">{item.name}</span>
                        <div className="item-child">
                            <span>{item.hpp}</span>
                            <span>{item.price}</span>
                            <span>{item.stock}</span>
                        </div>
                        </div>
                    ))}
                </div>
            </Col>
        </Row>
    </>
    ) 
}

export default stock
