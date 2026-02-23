import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Line, LineChart } from 'recharts';
import { DatePicker,Button } from "antd"
import CountUp from "react-countup";

import { getClosing } from '../utils/api';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import dayjs from 'dayjs';



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


        const [dataRender,setDataRender] = useState({
            inc : 0,
            hpp : 0,
            prf : 0,
        })

        const [data,setData] = useState([])
        const [dataThisMonth, setDataThisMonth] = useState([]) 
        const [dataFilter,setDataFilter] = useState([])
        const dataChartBar = (dataFilter.length > 0 ? dataFilter : dataThisMonth).map((item,index) =>({
                name: bulan[index],
                INC: item.inc,
                HPP: item.hpp,
                PRF: item.prf,
        }))

        const dataLineInc = (dataFilter.length > 0 ? dataFilter : data).slice(-5).map((item) =>({
            value : item.inc
        }))
        const dataLineHpp = (dataFilter.length > 0 ? dataFilter : data).slice(-5).map((item) =>({
            value : item.hpp
        }))
        const dataLinePrf = (dataFilter.length > 0 ? dataFilter : data).slice(-5).map((item) =>({
            value : item.prf
        }))
        
        const [firstDate, setFirstDate] = useState()
        const [lastDate, setLastDate] = useState()
        const onChange1 = (date, dateString) => {
            console.log(dateString);
            setFirstDate(dateString)
        }
        const onChange2 = (date, dateString) => {
            console.log(dateString);
            setLastDate(dateString)
        }

        const handleProcess = (first, last)=>{
            const dataDumy =  data.filter(item => item.created_at >= first && item.created_at <= last)
            setDataFilter(dataDumy)

            const inc = dataDumy.reduce((total,item) => total + item.inc,0)
            const hpp = dataDumy.reduce((total,item) => total + item.hpp,0)
            const prf = dataDumy.reduce((total,item) => total + item.prf,0)

            setDataRender({
                inc : inc,
                hpp : hpp,
                prf : prf,
            })
        }

        useEffect(()=>{
            const checkAuth = async()  =>{
                const isauth = await isAuthenticated()
                if (isauth.status === 200) {
                    getClosing().then((result) => {
                        const date1 = dayjs().format("YYYY-MM-"+'01')
                        const date2 = dayjs().format("YYYY-MM-DD")
                        console.log(`${date1} - ${date2}`)
                        const data = result.data.filter(item => item.created_at >= date1 && item.created_at <= date2)
                        setDataThisMonth(data)
                        setData(result.data)
                        const inc = data.reduce((total,item) => total + item.inc,0)
                        const hpp = data.reduce((total,item) => total + item.hpp,0)
                        const prf = data.reduce((total,item) => total + item.prf,0)
    
                        setDataRender({
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

    const Count = CountUp.default
    return(
        <>
            <div className="date-input-dashboard">
                <DatePicker className="date-picker" onChange={onChange1} />
                <DatePicker className="date-picker" onChange={onChange2} />
                <Button className='btn-proces-items' onClick={()=> handleProcess(firstDate,lastDate)}>Process</Button>
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
                        <Count end={dataRender.hpp} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last month</div>
                    <LineChart
                    style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                    data={dataLineHpp}
                    >
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
                    </LineChart>
                </div>
                <div className="data-section">
                    <span>Total INCOME</span>
                    <div className="total-data">
                        <Count end={dataRender.inc} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last days</div>
                    <LineChart
                    style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                    data={dataLineInc}
                    >
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
                    </LineChart>
                </div>
                <div className="data-section">
                    <span>Total PL</span>
                    <div className="total-data">
                        <Count end={dataRender.prf} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last days</div>
                    <LineChart
                    style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                    data={dataLinePrf}
                    >
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
                    </LineChart>
                </div>
            </div>
        </>
    )
    
}

export default RevenueDashboard