import { Button,Row, Col,Input } from "antd";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import "../style/home.css"
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated, } from "../utils/auth";
import { getProduct } from "../utils/api";




function Home() {
    const navigate = useNavigate();
    const location =useLocation()
    const[cart, setCart] = useState([])

    function goToPayment() {
        if(cart.length < 1){
            alert('keranjang tidak boleh kosong')
        }else{
            navigate("payment/", {state:{cart}})
        }
    }

    const[items, setItems] = useState([])
    const[dataSearch, setDataSearch] = useState([])
    const handleSearch = (datainput)=>{
        const data = items.filter((item)=>{
            return item.name.toLowerCase().includes(datainput.toLowerCase()) 
        })
        setDataSearch(data)
    }


    useEffect(()=>{
        const checkAuth = async()  =>{
            const isauth = await isAuthenticated()

            if (isauth.status === 200) {

                getProduct().then((result)=>{
                    setItems(result)
                })
                if(location.state?.cartPayment){
                    setCart(location.state.cartPayment)
                }
            }else{
                navigate("/login")
            }  
        }
        checkAuth()
    },[])

    const totalCart = () => {
        return cart.reduce((total, item) => {
                return total + (item.price * item.qty);
            }, 0);
        
    }; 

    const handleCart = (product) =>{
        setCart( prevCart =>{
            const found = prevCart.find((item) => item.name == product.name)
            if(found){
                return prevCart.map(item =>
                    item.name === product.name
                    ? { ...item, qty: item.qty + 1 }
                    : item
                );
            } else{
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

    // const items = [
    //     { id: 1, name: "Minyak", price: 17500 ,qty: 1},
    //     { id: 2, name: "Gula", price: 14000 ,qty: 1},
    //     { id: 3, name: "Garam", price: 5000 ,qty: 1},
    //     { id: 4, name: "Telur", price: 28000 ,qty: 1},
    //     { id: 5, name: "Kopi", price: 12000 ,qty: 1},
    //     { id: 6, name: "Teh", price: 6000 ,qty: 1}
    // ];




    
    return(
        <Row style={{height: '100%'}}>
            <Col span={16} className='left-col'>
                <div className='search-item'>
                    <Input placeholder='search product' onChange={(e)=>handleSearch(e.target.value)} />
                </div>
                <div className="products">
                    {(dataSearch.length > 0 ? dataSearch : items).map((item) => (
                        <div className="item" key={item.id}>
                        <span>{item.name}</span>
                        <div>
                            <span>{item.price}</span>
                            <Button className='tambah-btn'onClick={() =>handleCart(item)}>Tambah</Button>
                        </div>
                        </div>
                    ))}
                </div>
            </Col>
            <Col span={8}>
                <div className="sider">
                    <div className="summary">SUMMARY</div>
                    <div className="summary-header">
                        <span className='header-no'>NO</span>
                        <span className='header-name'>ITEM</span>
                        <span className='header-qty'>QTY</span>
                        <span className='header-price'>PRICE</span>
                    </div>
                    <div className="summary-items-list">
                        {cart.map((item,index) => (
                            <div className="summary-item" key={index}>
                                <span className='item-no'>{index + 1}</span>
                                <span className='item-name'>{item.name}</span>
                                <Button className="counter-btn" onClick={()=> decline(index)}>
                                    <MinusOutlined />
                                </Button>
                                    <span className='item-qty'>{item.qty}</span>
                                <Button className="counter-btn" onClick={()=>increase(index)}>
                                    <PlusOutlined />
                                </Button>
                                <span className='item-price'>{item.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-footer">
                        <div className='summary-total'>
                            <div>TOTAL RUPIAH</div>
                            <div >
                                <span>Rp. </span>
                                <span>{totalCart()}</span>
                            </div>
                        </div>
                        <div className='summary-payment'>
                            <Button className='choose-payment-btn' onClick={goToPayment}>PAYMENT</Button>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Home