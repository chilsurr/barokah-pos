import { Layout, Button,Row, Col,Input } from "antd";
import { useNavigate, useLocation, Navigate,} from "react-router-dom";
import "../style/payment.css"
import logo from "../../src/assets/logo-remove.png"
import { useState,useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import { postOrder,postOrderDetail, getProduct,putProduct } from "../utils/api";
import { nanoid } from 'nanoid'
import { Result } from "antd";
import { Alert } from "antd";

function Payment() {
    const navigate = useNavigate()
    const Location = useLocation()
    const cartPayment = Location.state?.cart || []
    const [cashInput,setCashInput] = useState(0)
    const [date,setDate] = useState({date:"",time:""})

    function backToHome(){
        navigate("/", {state:{cartPayment}})
    }
    const [noBon,setNoBon] = useState([])
    const [dataUser,setDataUser] = useState([])
    const [totalCart,setTotalCart] = useState()
    const handleTotalCart = () =>{
        const result = cartPayment.reduce((total,item) =>{
            return total + (item.price * item.qty)
        }, 0)
        setTotalCart(result)
    }

    useEffect(()=>{
        const checkAuth = async()  =>{
            const isauth = await isAuthenticated()
            setDataUser(isauth.data)
            if (isauth.status === 200) {
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
                const dd = String(today.getDate()).padStart(2, '0');
        
                const hh = String(today.getHours()).padStart(2, '0');
                const min = String(today.getMinutes()).padStart(2, '0');
                const ss = String(today.getSeconds()).padStart(2, '0');
            
                const formatDate = `${yyyy}${mm}${dd}`;
                const formattime = `${hh}:${min}:${ss}`;
                setDate({
                    date: formatDate,
                    time: formattime
                }); 
                setNoBon(isauth.data.id +'-'+ dd + mm+ nanoid(4).toUpperCase() )
                handleTotalCart()
            }else{
                navigate("/login")
            }  
        }
        checkAuth()
    },[])


    const [isProcesed,setIsProcesed] =useState (false)
    const [resultPayment, setResultPayment] = useState({total:0, cash:0, change:0})
    const handleProcess = ()=>{
        const total = totalCart
        const cash  = cashInput
        const change = cash - total  
        setResultPayment({
            total : total,
            cash : cash,
            change : change
        })
        setIsProcesed(true)
    }

    const handleMoneyPreset = (value) =>{
        setCashInput ((prevValue) => {
            return prevValue + value 
        })
    }

    const handlekeypad = (value) =>{
        setCashInput ((prevValue) => {
            const newValue = prevValue.toString() + value.toString()
            return parseInt(newValue)
        })
    }

    const handleClear = () =>{
        setCashInput(0)
        setIsProcesed(false)
    }

    const handleDelete = () =>{
        setCashInput( (prevValue) =>{
            const str = String(prevValue);
            const sliced = str.slice(0, -1);
            return sliced ? parseInt(sliced) : 0;
        })
    }

    const handlePayment = async() =>{
        if(resultPayment.total == 0){
            alert("Uang cutomer tidak boleh 0")
        }else if(resultPayment.cash < resultPayment.total){
            alert('uang customer tidak boleh kurang')
        }else{
            try {
                 alert(`invoice: ${noBon} total: ${resultPayment.total}`)

                 const dataorder = {
                     'invoice' : noBon,
                     'total' : resultPayment.total,
                     'user' : dataUser.id
                 }
                 console.log(dataorder)
                const result = await postOrder(dataorder)
                const orderId = result.data.id
                console.log(orderId)
                cartPayment.map((item)=>{
                    const dataOrderDetail = {
                        // 'order' : orderId,
                        'product' : item.id,
                        'quantity' : item.qty,
                        'price' : item.price * item.qty,
                    }
                    console.log(dataOrderDetail)
                    getProduct().then((result) =>{
                        const data = result
                        const cuki = data.find( product => product.id == item.id )
                        if(cuki){
                            putProduct(cuki.id,{
                                stock : cuki.stock -= item.qty
                            })
                            console.log('berhasil edit pak')
                        }
                    })
                    const result = postOrderDetail(dataOrderDetail)
                })
                
                // navigate("/")
            } catch (error) {
                console.log(error)
            }
           
        }
    }

    return(
      <Row className="row-payment">
        <Col className="left-col-payment" span={6}>
            <div className="receipe">
                <div className="header-receipe">
                    <img className="logo-receipe" src={logo} alt="" />
                    <div className="adress-receipe">
                        <div>
                            <div>Jl. Anggrek Blok C No. 8, Kel. Lestari,</div>
                            <div>Kec. Harmoni Surabaya, Jawa Timur 60123</div>
                            <div>083887962456</div>
                        </div>
                    </div>
                </div>
                <div className="items-receipe">
                    <div className="no-bon">
                        <span>NO BON :</span>
                        <span>{noBon}</span>
                    </div>
                    <div className="header-item-receipe">
                        <span className='header-item-receipe-no'>NO</span>
                        <span className='header-item-receipe-name'>ITEM</span>
                        <span className='header-item-receipe-qty'>QTY</span>
                        <span className='header-item-receipe-price'>PRICE</span>
                    </div>
                    {cartPayment.map((item,index) => {
                        return(
                            <div className="item-receipe" key={index}>
                                <span className='item-receipe-no'>{index + 1}</span>
                                <span className='item-receipe-name'>{item.name}</span>
                                <span className='item-receipe-qty'>{item.qty}</span>
                                <span className='item-receipe-price'>{item.price}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="total-receipe">
                    <div>
                        <span>TOTAL</span>
                        <span>{cartPayment.reduce((total,item)=> total+item.qty ,0)}</span>
                        <span>{totalCart}</span>
                    </div>
                    <div>
                        <span>CASH</span>
                        <span>{isProcesed?resultPayment.cash:0}</span>
                    </div>
                    <div>
                        <span>CHANGE</span>
                        <span>{isProcesed?resultPayment.change:0}</span>
                    </div>
                </div>
                <div className="date-receipe">
                    <span>Tgl : {date.date}</span>
                    <span>{date.time}</span>
                </div>
                <div className="sosmed-receipe">
                    <div>
                        <div>Follow Me</div>
                        <div>Ig : @barkahmart</div>
                        <div>Tiktok : Barokahmart_</div>
                    </div>
                </div>
            </div>
        </Col>
        <Col className="right-col-payment" span={18}>
            <div className="payment-top">
                <div className="payment-total">
                    <span>TOTAL</span>
                    <div className="amount-total">{isProcesed?resultPayment.change :totalCart * -1}</div>
                </div>
                <div className="payment-input">
                    <div className="money-preset">
                        <Button className="money-preset-btn" onClick={()=> handleMoneyPreset(5000)} >5.000</Button>
                        <Button className="money-preset-btn" onClick={()=> handleMoneyPreset(10000)} >10.000</Button>
                        <Button className="money-preset-btn" onClick={()=> handleMoneyPreset(20000)} >20.000</Button>
                        <Button className="money-preset-btn" onClick={()=> handleMoneyPreset(50000)} >50.000</Button>
                        <Button className="money-preset-btn" onClick={()=> handleMoneyPreset(100000)} >100.000</Button>
                    </div>
                    <div className="money-input">
                        <Input readOnly value={cashInput}/>
                        <Button className="process-btn"  onClick={()=> handleProcess()}>PROCESS</Button>
                    </div>
                </div>
            </div>
            <div className="payment-down">
                <Row className="row-payment-down">
                    <Col className="col-payment-info" span={14}>
                        <div className="payment-info">
                            <div className="row-payment-info">
                                <span>Total</span>
                                <span>{resultPayment.total}</span>
                            </div>
                            <div className="row-payment-info">
                                <span>Cash</span>
                                <span>{isProcesed?resultPayment.cash:0}</span>
                            </div>
                            <div className="row-payment-info">
                                <span>Wallet</span>
                                <span>0</span>
                            </div>
                            <div className="row-payment-info">
                                <span>Change</span>
                                <span>{isProcesed?resultPayment.change:0}</span>
                            </div>
                        </div>
                        <div className="payment-options">
                            <Button className="payment-options-btn">CASH</Button>
                            <Button className="payment-options-btn">WALLET</Button>
                            <div className="payment-actions">
                                <Button className="back-actions-btn" onClick={backToHome}>BACK</Button>
                                <Button className="payment-actions-btn" onClick={()=> handlePayment()}>PAYMENT</Button>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-keypad" span={10}>
                        <div className="keypad-panel">
                            <div className="keypad-operation">
                                <span onClick={()=> handleClear()}>Clear</span>
                                <span onClick={()=> handleDelete()}>Del</span>
                                <span onClick={()=> handleProcess()}>Enter</span>
                            </div>
                            <div className="keypad-number">
                                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '000'].map((key) => (
                                    <span key={key} onClick={()=> handlekeypad(key)}>{key}</span>
                                ))}
                            </div>                            
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
      </Row>
    )
}

export default Payment