import { Layout } from "antd"
import income from "../assets/income.png"
import profit from "../assets/profit.png"
import struk from "../assets/transaction.png"
import item from "../assets/item.png"
import CountUp from "react-countup";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Area, AreaChart, Brush,} from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';


function MasterDashboard() {

    const data = [
        // 1–8 naik
        { name: "1", income: 2000, profit: 1500 },
        { name: "2", income: 2300, profit: 1700 },
        { name: "3", income: 2600, profit: 1900 },
        { name: "4", income: 2900, profit: 2100 },
        { name: "5", income: 3200, profit: 2300 },
        { name: "6", income: 3500, profit: 2500 },
        { name: "7", income: 3800, profit: 2700 },
        { name: "8", income: 4100, profit: 2900 },

        // 9–12 turun
        { name: "9", income: 3800, profit: 2700 },
        { name: "10", income: 3500, profit: 2500 },
        { name: "11", income: 3200, profit: 2300 },
        { name: "12", income: 3000, profit: 2100 },

        // 13–21 naik lebih tinggi dari tanggal 1
        { name: "13", income: 3300, profit: 2400 },
        { name: "14", income: 3600, profit: 2600 },
        { name: "15", income: 3900, profit: 2800 },
        { name: "16", income: 4200, profit: 3000 },
        { name: "17", income: 4500, profit: 3200 },
        { name: "18", income: 4800, profit: 3400 },
        { name: "19", income: 5100, profit: 3600 },
        { name: "20", income: 5400, profit: 3800 },
        { name: "21", income: 5700, profit: 4000 },

        // 22–26 turun
        { name: "22", income: 5400, profit: 3800 },
        { name: "23", income: 5100, profit: 3600 },
        { name: "24", income: 4800, profit: 3400 },
        { name: "25", income: 4500, profit: 3200 },
        { name: "26", income: 4200, profit: 3000 },

        // 27–30 naik kembali
        { name: "27", income: 4600, profit: 3300 },
        { name: "28", income: 5000, profit: 3600 },
        { name: "29", income: 5400, profit: 3900 },
        { name: "30", income: 5800, profit: 4200 },
    ];

    const dataOrders = [
        { name: "1", online: 2000, offline: 1500 },
        { name: "2", online: 2300, offline: 1700 },
        { name: "3", online: 2600, offline: 1900 },
        { name: "4", online: 2900, offline: 2100 },
        { name: "5", online: 3200, offline: 2300 },
        { name: "6", online: 3500, offline: 2500 },
        { name: "7", online: 3800, offline: 2700 },
        { name: "8", online: 4100, offline: 2900 },

        // 9–12 turun
        { name: "9", online: 3800, offline: 2700 },
        { name: "10", online: 3500, offline: 2500 },
        { name: "11", online: 3200, offline: 2300 },
        { name: "12", online: 3000, offline: 2100 },

        // 13–21 naik lebih tinggi dari tanggal 1
        { name: "13", online: 3300, offline: 2400 },
        { name: "14", online: 3600, offline: 2600 },
        { name: "15", online: 3900, offline: 2800 },
        { name: "16", online: 4200, offline: 3000 },
        { name: "17", online: 4500, offline: 3200 },
        { name: "18", online: 4800, offline: 3400 },
        { name: "19", online: 5100, offline: 3600 },
        { name: "20", online: 5400, offline: 3800 },
        { name: "21", online: 5700, offline: 4000 },

        // 22–26 turun
        { name: "22", online: 5400, offline: 3800 },
        { name: "23", online: 5100, offline: 3600 },
        { name: "24", online: 4800, offline: 3400 },
        { name: "25", online: 4500, offline: 3200 },
        { name: "26", online: 4200, offline: 3000 },

        // 27–30 naik kembali
        { name: "27", online: 4600, offline: 3300 },
        { name: "28", online: 5000, offline: 3600 },
        { name: "29", online: 5400, offline: 3900 },
        { name: "30", online: 5800, offline: 4200 },
    ];



    const bestSellers = [
        { name: "Indomie Goreng Original", quantity: 1250 },
        { name: "Aqua Air Mineral 600ml", quantity: 1100 },
        { name: "Teh Botol Sosro 450ml", quantity: 980 },
        { name: "Ultra Milk Coklat 250ml", quantity: 920 },
        { name: "Beras Premium 5kg", quantity: 870 },
        { name: "Gula Pasir 1kg", quantity: 830 },
        { name: "Minyak Goreng 1L", quantity: 790 },
        { name: "Telur Ayam 1kg", quantity: 760 },
        { name: "Roti Tawar Gandum", quantity: 720 },
        { name: "Pop Mie Rasa Ayam", quantity: 690 }
    ];


    const lowSellers = [
        { name: "Sarden Kaleng Extra Pedas", quantity: 85 },
        { name: "Kacang Almond Panggang 200g", quantity: 72 },
        { name: "Sereal Gandum Plain", quantity: 65 },
        { name: "Biskuit Diet Tinggi Serat", quantity: 58 },
        { name: "Susu Kedelai Original 1L", quantity: 54 },
        { name: "Cuka Apel Organik", quantity: 49 },
        { name: "Madu Hutan Premium 500ml", quantity: 43 },
        { name: "Teh Hijau Celup Tanpa Gula", quantity: 37 },
        { name: "Keripik Singkong Balado Besar", quantity: 32 },
        { name: "Permen Jahe Tradisional", quantity: 28 }
    ];

    const CustomizedLabel = ({ x, y, stroke, value }) => {
        return (
            <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value}
            </text>
        );
    };

    const CustomizedAxisTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {payload.value}
            </text>
            </g>
        );  
    };

// console.log(CountUp)
    
    const Count = CountUp.default



 return(
    <>
        <Layout  className="master-dashboard-container">
            <section className="data-header">
                <div className="main-data-section income">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={income} alt="" />
                        </div>
                        <span>Total Income</span>
                    </div>
                    <div className="data-value">
                        <Count end={12000000} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
                <div className="main-data-section profit">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={profit} alt="" />
                        </div>
                        <span>Total Profit</span>
                    </div>
                    <div className="data-value">
                        <Count end={6000000} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
                <div className="main-data-section struk">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={struk} alt="" />
                        </div>
                        <span>Total Struk</span>
                    </div>
                    <div className="data-value">
                        <Count end={1200} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
                <div className="main-data-section items">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={item} alt="" />
                        </div>
                        <span>Total items</span>
                    </div>
                    <div className="data-value">
                        <Count end={1700} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
            </section>
            <section className="data-content">
                <div className="data-linechart">
                    <div className="linechart-profit">
                        <AreaChart
                            style={{ width: '100%', maxWidth: '100%', maxHeight: '40vh', aspectRatio: 1.618 }}
                            responsive
                            data={data}
                            margin={{
                                top: 20,
                                right: 0,
                                left: 10,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="profit" stroke="#82ca9d" fill="#82ca9d" />
                            {/* <RechartsDevtools /> */}
                        </AreaChart>
                    </div>
                    <div className="linechart-orders">
                        <LineChart
                            style={{ width: '100%', maxWidth: '100%', maxHeight: '40vh', aspectRatio: 1.618 }}
                            responsive
                            data={dataOrders}
                            margin={{
                                top: 20,
                                right: 0,
                                left: 10,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" height={40} tick={CustomizedAxisTick} />
                            <YAxis width="auto" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="online" stroke="#1B5E20" label={CustomizedLabel} />
                            <Line type="monotone" dataKey="offline" stroke="#81C784" />
                            {/* <RechartsDevtools /> */}
                        </LineChart>
                    </div>
                </div>
                <div className="data-items">
                    <div className="best-seller">
                        <div className="header-items">Items Best Seller</div>
                        {bestSellers.map((item,index)=>(
                            <div className='list-item'key={item.name + index}>
                                <span>{index + 1 +". "+ item.name}</span>
                                <span>{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="low-seller">
                        <div className="header-items">Items Low Seller</div>
                        {lowSellers.map((item,index)=>(
                            <div className='list-item'key={item.name + index}>
                                <span>{index + 1 +". "+ item.name}</span>
                                <span>{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    </>
 )   
}

export default MasterDashboard