import { Layout, Button,Row, Col,Input } from "antd";
import { useNavigate } from "react-router-dom";
import "../style/payment.css"
import logo from "../../src/assets/logo-remove.png"

function Payment() {
    const Navigate = useNavigate()
    function backToHome(){
        Navigate("/")
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
                    <div className="header-item-receipe">
                        <span className='header-item-receipe-no'>NO</span>
                        <span className='header-item-receipe-name'>ITEM</span>
                        <span className='header-item-receipe-qty'>QTY</span>
                        <span className='header-item-receipe-price'>PRICE</span>
                    </div>
                    <div className="item-receipe">
                        <span className='item-receipe-no'>1</span>
                        <span className='item-receipe-name'>Lorem ipsum dolor sit amet.</span>
                        <span className='item-receipe-qty'>1</span>
                        <span className='item-receipe-price'>17.500</span>
                    </div>
                </div>
                <div className="total-receipe">
                    <div>
                        <span>TOTAL</span>
                        <span>3</span>
                        <span>35.500</span>
                    </div>
                    <div>
                        <span>CASH</span>
                        <span>35.500</span>
                    </div>
                    <div>
                        <span>CHANGE</span>
                        <span>14.500</span>
                    </div>
                </div>
                <div className="date-receipe">
                    <span>Tgl.  180525</span>
                    <span>11:12:23</span>
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
                    <Input/>
                </div>
                <div className="payment-input">
                    <div className="money-predict">
                        <Button className="money-predict-btn" >5.000</Button>
                        <Button className="money-predict-btn" >10.000</Button>
                        <Button className="money-predict-btn" >20.000</Button>
                        <Button className="money-predict-btn" >50.000</Button>
                        <Button className="money-predict-btn" >100.000</Button>
                    </div>
                    <div className="money-input">
                        <Input/>
                        <Button className="process-btn">PROCESS</Button>
                    </div>
                </div>
            </div>
            <div className="payment-down">
                <Row className="row-payment-down">
                    <Col className="col-payment-info" span={14}>
                        <div className="payment-info">
                            <div className="row-payment-info">
                                <span>Total</span>
                                <span>0</span>
                            </div>
                            <div className="row-payment-info">
                                <span>Cash</span>
                                <span>0</span>
                            </div>
                            <div className="row-payment-info">
                                <span>Wallet</span>
                                <span>0</span>
                            </div>
                            <div className="row-payment-info">
                                <span>Change</span>
                                <span>0</span>
                            </div>
                        </div>
                        <div className="payment-options">
                            <Button className="payment-options-btn">CASH</Button>
                            <Button className="payment-options-btn">WALLET</Button>
                            <div className="payment-actions">
                                <Button className="back-actions-btn" onClick={backToHome}>BACK</Button>
                                <Button className="payment-actions-btn">PAYMENT</Button>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-keypad" span={10}>
                        <div className="keypad-panel">
                            <div className="keypad-operation">
                                <span>Clear</span>
                                <span>Del</span>
                                <span>Enter</span>
                            </div>
                            <div className="keypad-number">
                                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '00', '000'].map((key) => (
                                    <span key={key} >{key}</span>
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