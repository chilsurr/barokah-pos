import { Layout, Button,Row, Col,Input } from "antd";
import "../style/home.css"

function Home() {
    return(
        <Row style={{height: '100%'}}>
            <Col span={16} className='left-col'>
                <div className='search-item'>
                    <Input placeholder='search product' />
                </div>
                <div className="products">
                    <div className="item">
                        <span>gula</span>
                        <div>
                            <span>Rp. 17.500</span>
                            <Button className='tambah-btn'>Tambah</Button>
                        </div>
                    </div>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div className="item" key={index}>
                        <span>gula</span>
                        <div>
                            <span>Rp. 17.500</span>
                            <Button className='tambah-btn'>Tambah</Button>
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
                        <div className="summary-item">
                            <span className='item-no'>1</span>
                            <span className='item-name'>Lorem ipsum dolor sit amet.</span>
                            <span className='item-qty'>1</span>
                            <span className='item-price'>17.500</span>
                        </div>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className="summary-item" key={index}>
                                <span className='item-no'>1</span>
                                <span className='item-name'>Lorem ipsum dolor sit amet.</span>
                                <span className='item-qty'>1</span>
                                <span className='item-price'>17.500</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-footer">
                        <div className='summary-total'>
                            <div>TOTAL RUPIAH</div>
                            <div >
                                <span>Rp. </span>
                                <span>0</span>
                            </div>
                        </div>
                        <div className='summary-payment'>
                            <Button className='choose-payment-btn'>PAYMENT</Button>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Home