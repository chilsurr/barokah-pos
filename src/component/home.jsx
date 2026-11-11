import { Button, Row, Col, Input } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import "../style/home.css"
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated, } from "../utils/auth";
import { getProduct, getClosing } from "../utils/api";
import { convertIdr } from "../utils/curency";
import SearchBox from "../utils/search";

import dayjs from "dayjs";




function Home() {
    const navigate = useNavigate();
    const location = useLocation()
    const [cart, setCart] = useState([])
    const [isClosing, setIsClosing] = useState("")

    function goToPayment() {
        if (cart.length < 1) {
            alert('keranjang tidak boleh kosong')
        } else {
            navigate("payment/", { state: { cart } })
        }
    }

    const [items, setItems] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) => {
        const value = e.target.value
        setSearchValue(value)
        const data = items.filter((item) => {
            return item.name.toLowerCase().includes(value.toLowerCase())
        })
        setDataSearch(data)
    }
    // const handleSearch = (datainput)=>{
    //     const data = items.filter((item)=>{
    //         return item.name.toLowerCase().includes(datainput.toLowerCase()) 
    //     })
    //     setDataSearch(data)
    // }


    useEffect(() => {
        const checkAuth = async () => {
            const isauth = await isAuthenticated()

            getClosing().then((result) => {
                const today = dayjs().format("YYYY-MM-DD")
                setIsClosing(result.data.some((data) => data.created_at == today))
            })
            if (isauth.status === 200) {
                getProduct().then((result) => {
                    setItems(result)
                })
                if (location.state?.cartPayment) {
                    setCart(location.state.cartPayment)
                }
            } else {
                navigate("/login")
            }
        }
        checkAuth()
    }, [])



    const totalCart = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.qty);
        }, 0);

    };

    const handleCart = (product) => {
        setCart(prevCart => {
            const found = prevCart.find((item) => item.name == product.name)
            if (found) {
                return prevCart.map(item =>
                    item.name === product.name
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, qty: 1 }];
            }
        })
    }

    const [count, setCount] = useState(5);

    const increase = (index) => {
        setCart(cart.map((item, i) =>
            i === index ? { ...item, qty: item.qty + 1 } : item
        ));
    };
    const decline = (index) => {
        const updated = cart
            .map((item, i) =>
                i === index ? { ...item, qty: item.qty - 1 } : item
            )
            .filter(item => item.qty > 0);

        setCart(updated);
    };




    return (
        <Row style={{ height: '100%', margin: 0 }}>
            <Col xs={24} sm={24} md={14} lg={15} xl={16} className='left-col'>
                <div className='search-item'>
                    <SearchBox onChange={handleChange} value={searchValue} />
                    {/* <Input placeholder='search product' onChange={(e)=> handleSearch(e.target.value)} /> */}
                </div>
                <div className="products">
                    {/* {items.map((item) => (
                        <div className="item" key={item.id}>
                        <span>{item.name}</span>
                        <div>
                            <span>{convertIdr(item.price)}</span>
                            <Button className='tambah-btn'onClick={() =>handleCart(item)}>Tambah</Button>
                        </div>
                        </div>
                    ))} */}
                    {(dataSearch.length > 0 ? dataSearch : items).map((item) => (
                        <div className="item" key={item.id}>
                            <span>{item.name}</span>
                            <div>
                                <span>{convertIdr(item.price)}</span>
                                <Button className='tambah-btn' onClick={() => handleCart(item)}>Tambah</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Col>
            <Col xs={24} sm={24} md={10} lg={9} xl={8} style={{ height: '100%' }}>
                <div className="sider">
                    <div className="summary">SUMMARY</div>
                    <div className="summary-header">
                        <span className='header-no'>NO</span>
                        <span className='header-name'>ITEM</span>
                        <span className='header-qty'>QTY</span>
                        <span className='header-price'>PRICE</span>
                    </div>
                    <div className="summary-items-list">
                        {cart.map((item, index) => (
                            <div className="summary-item" key={index}>
                                <span className='item-no'>{index + 1}</span>
                                <span className='item-name'>{item.name}</span>
                                <Button className="counter-btn" onClick={() => decline(index)}>
                                    <MinusOutlined />
                                </Button>
                                <span className='item-qty'>{item.qty}</span>
                                <Button className="counter-btn" onClick={() => increase(index)}>
                                    <PlusOutlined />
                                </Button>
                                <span className='item-price'>{convertIdr(item.price)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-footer">
                        <div className='summary-total'>
                            <div>TOTAL RUPIAH</div>
                            <div >
                                <span>Rp. </span>
                                <span>{convertIdr(totalCart())}</span>
                            </div>
                        </div>
                        <div className='summary-payment'>
                            <Button className={` ${isClosing ? ".disabled-payment-btn" : "choose-payment-btn"}`} disabled={isClosing} onClick={goToPayment}>PAYMENT</Button>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Home