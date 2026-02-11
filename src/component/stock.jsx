import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { ConfigProvider,Upload,message, Button,Row, Col,Input ,Modal} from "antd";
import { postExcel,getProduct } from "../utils/api";
import { isAuthenticated } from "../utils/auth";
import { convertIdr } from "../utils/curency";
import SearchBox from "../utils/search";
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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const showModal = (item) => {
        // setSelectedItem(item)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if(!selectedFile){
            alert("masukin file nya dulu pak")
        }else{
            postExcel(selectedFile)
            setSelectedFile(null)
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
        setSelectedFile(null)
        setIsModalOpen(false);
    };

    const props = {
        beforeUpload: file => {
            const isXlsx = 
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel';

            console.log(isXlsx)

            if (!isXlsx) {
                message.error(`${file.name} is not excel file`);
                return isXlsx || Upload.LIST_IGNORE;
            }else{
                setSelectedFile(file)
                return false;
                // postExcel(file)
            }
        },

    };



    // const[dataSearch, setDataSearch] = useState(items)
    // const handleSearch = (datainput)=>{
    //     console.log(datainput.toLowerCase())
    //     const data = items.filter((item)=>{
    //         console.log(item.name.toLowerCase() )
    //         return item.name.toLowerCase().includes(datainput.toLowerCase()) 
    //     })
    //     setDataSearch(data)
    // }


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
                    <SearchBox onChange={handleChange} value={searchValue}/>
                    {/* <Input placeholder='search product' onChange={(e)=>setDataInput(e.target.value)}/> */}
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
                    {(dataSearch.length > 0 ? dataSearch : items).map((item) => (
                        <div className="item" key={item.id}>
                        <span className="item-name">{item.name}</span>
                        <div className="item-child">
                            <span>{convertIdr(item.hpp)}</span>
                            <span>{convertIdr(item.price)}</span>
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
