import { Button,Row, Col,Input, Modal, } from "antd";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../utils/api";
import { isAuthenticated } from "../utils/auth";
import { Empty } from 'antd';
import dayjs from "dayjs";
import axios from "axios";
import SearchBox from "../utils/search";

import "../style/pkm.css"

function Pkm() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [date,setDate] = useState({})
    useEffect(()=>{
        const checkAuth = async()  =>{
            const isauth = await isAuthenticated()
            console.log(isauth)
            if (isauth.status === 200) {
                const formatDate = dayjs().format("YYYY-MM-DD");
                setDate(formatDate); 

                getProduct().then((result)=>{
                    const newdata = result.filter(item =>item.stock < 10 ).map(({user, stock, ...rest})=>({
                        ...rest,
                        initialstock : stock,
                        stock : 0

                    }))
                    setItems(newdata)
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

 
    const downloadExcel = async () => {
        console.log(items)
        if(items.length === 0){
            alert("data pkm kosong pak")
        }else{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/export-excel/",
                items,
                {
                responseType: "blob" // ⬅️ WAJIB
                }
            );
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `data_export-${date}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            console.log('berhasil kayanya')
        }
    };

    const [dataSearch, setDataSearch] = useState([])
    const [searchValue,setSearchValue] = useState('')
    const handleChange = (e) =>{
        const value = e.target.value
        setSearchValue(value)
        console.log(items)
        const data = items.filter((item)=>{
            return item.name.toLowerCase().includes( value.toLowerCase()) 
        })
        console.log(data)
        setDataSearch(data)
    }


    
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
                        <SearchBox onChange={handleChange} value={searchValue}/>
                        {/* <Input className="value-input" onChange={(e) => setDataInput(e.target.value) }/> */}
                    </div>
                    <div className="pkm-items">
                        {items.length > 0 ?(
                            (dataSearch.length > 0 ? dataSearch : items).map((item) =>(    
                                    <div className="pkm-item" key={item.id}>
                                        <span>{item.name}</span>
                                        <Button className="acept-btn" onClick={()=>showModal(item)}>Acept</Button>
                                    </div>
                            ))                               
                            ):(
                                <div className="empty">
                                    <Empty />
                                </div>
                            )
                        }
                    </div>
                    <div className="download-xlsx">
                        <Button className="download-btn" onClick={()=> downloadExcel()}>DOWNLOAD PKM</Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Pkm