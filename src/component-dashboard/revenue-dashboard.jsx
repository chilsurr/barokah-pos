import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Line, LineChart } from 'recharts';
import { DatePicker  } from "antd"
import CountUp from "react-countup";

import { getClosing } from '../utils/api';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { isAuthenticated } from "utils/auth";
import { isAuthenticated } from '../utils/auth';

function RevenueDashboard() {
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
        { pv: 30 },
        { pv: 140 },
        { pv: 180 },
        { pv: 360 },
        { pv: 120 },
        { pv: 340 },
        { pv: 160 },
    ];


    const [data,setData] = useState({
            inc : 0,
            hpp : 0,
            prf : 0,
        })
        const [newData, setNewData] = useState([]) 
        const dataChartBar = newData.map((item,index) =>({
                name: bulan[index],
                INC: item.inc,
                HPP: item.hpp,
                PRF: item.prf,
        }))

        const dataLineInc = newData.map((item) =>({
            value : item.inc
        }))
        const dataLineHpp = newData.map((item) =>({
            value : item.hpp
        }))
        const dataLinePrf = newData.map((item) =>({
            value : item.prf
        }))
    
        useEffect(()=>{
            const checkAuth = async()  =>{
                const isauth = await isAuthenticated()
                if (isauth.status === 200) {
                    getClosing().then((result) => {
                        setNewData(result.data)
                        console.log(result.data)
                        const inc = result.data.reduce((total,item) => total + item.inc,0)
                        const hpp = result.data.reduce((total,item) => total + item.hpp,0)
                        const prf = result.data.reduce((total,item) => total + item.prf,0)
    
                        setData({
                            inc : inc,
                            hpp : hpp,
                            prf : prf,
                        })
                    })
        
                }else{
                    navigate("/login/")
                }  
            }
            checkAuth()
        },[]) 

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const Count = CountUp.default
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
                    data={dataChartBar}
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
                    <Bar dataKey="HPP" fill="#2E7D32" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
                    <Bar dataKey="INC" fill="#66BB6A" animationDuration={1000} activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[5, 5, 0, 0]} />
                    <Bar dataKey="PRF" fill="#43A047" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
                </BarChart> 
                </div>
                <div className="data-transaction">
                <div className="data-section">
                    <span>Total HPP</span>
                    
                    <div className="total-data">
                        <Count end={52000000} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last month</div>
                    <LineChart
                    style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                    data={dataLineHpp}
                    >
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </div>
                <div className="data-section">
                    <span>Total INCOME</span>
                    <div className="total-data">
                        <Count end={76000000} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last month</div>
                    <LineChart
                    style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                    data={dataLineInc}
                    >
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </div>
                <div className="data-section">
                    <span>Total PL</span>
                    <div className="total-data">
                        <Count end={24000000} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last month</div>
                    <LineChart
                    style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                    data={dataLinePrf}
                    >
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </div>
            </div>
        </>
    )
    
}

export default RevenueDashboard