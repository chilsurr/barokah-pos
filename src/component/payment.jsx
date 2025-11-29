import { Layout, Button,Row, Col,Input } from "antd";
import "../style/payment.css"
function Payment() {
    return(
      <Row className="row-payment">
        <Col className="left-col-payment" span={6}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sed.</Col>
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
                        <Button className="process-btn">process</Button>
                    </div>
                </div>
            </div>
            <div className="payment-down">
                <Row className="row-payment-down">
                    <Col style={{backgroundColor:"red"}} span={14}></Col>
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