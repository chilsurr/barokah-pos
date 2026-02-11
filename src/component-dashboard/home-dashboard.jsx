import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Line, LineChart } from 'recharts';
import { DatePicker  } from "antd"
import CountUp from "react-countup";
import { getClosing } from '../utils/api';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';


function HomeDashboard() {
    const navigate = useNavigate()
    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];
    
    

    const growth_data = [
        { pv: 280 },
        { pv: 40 },
        { pv: 180 },
        { pv: 360 },
        { pv: 100 },
        { pv: 240 },
        { pv: 230 },
    ];

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    const Count = CountUp.default

    const [dataRender,setDataRender] = useState({
        std : 0,
        itm : 0,
    })
    const [newData, setNewData] = useState([]) 
    const data = newData.map((item,index) =>({
            name: bulan[index],
            STD: item.std,
            ITM: item.itm,
    }))

    useEffect(()=>{
        const checkAuth = async()  =>{
            const isauth = await isAuthenticated()
            if (isauth.status === 200) {
                getClosing().then((result) => {
                    setNewData(result.data)
                    console.log(result.data)
                    const std = result.data.reduce((total,item) => total + item.std,0)
                    const itm = result.data.reduce((total,item) => total + item.itm,0)

                    setDataRender({
                        std : std,
                        itm : itm,
                    })
                })
    
            }else{
                navigate("/login/")
            }  
        }
        checkAuth()
    },[]) 
    
    console.log(dataRender)

    return(
        <>
            <div className="date-input-dashboard">
                <DatePicker className="close-input" onChange={onChange} />
                <DatePicker className="close-input" onChange={onChange} />
                {/* <Button className="btn-process-dashboard">Process</Button> */}
                </div>
                <div className="chart">

                        <BarChart
                            style={{
                                width: '100%', maxWidth:'100%', maxHeight:'50vh', aspectRatio:1.618,margin:'10px 0'
                            }}
                            responsive
                            data={data}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis width="auto" />
                            {/* <Tooltip /> */}
                            <Legend />
                            <Bar dataKey="ITM" fill="#2E7D32" animationDuration={1000} activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[5, 5, 0, 0]} />
                            <Bar dataKey="STD" fill="#66BB6A" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
                        </BarChart> 

                </div>
                <div className="data-transaction">
                <div className="data-section">
                    <span>Total STD</span>
                    
                    <div className="total-data"> 
                        <Count end={148} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last month</div>
                        <LineChart
                        style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                        data={growth_data}
                        >
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
                        </LineChart>

                </div>

                <div className="data-section">
                    <span>Total ITM</span>
                    <div className="total-data">
                        <Count end={253} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last month</div>
                        <LineChart
                        style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                        data={growth_data}
                        >
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
                        </LineChart>

                </div>
            </div>
        </>
    )
    
}

export default HomeDashboard