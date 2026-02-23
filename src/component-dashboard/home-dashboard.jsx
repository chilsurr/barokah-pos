import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Line, LineChart } from 'recharts';
import { DatePicker,Button  } from "antd"
import CountUp from "react-countup";
import { getClosing } from '../utils/api';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

import dayjs from 'dayjs';


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
    const Count = CountUp.default

    const [dataRender,setDataRender] = useState({
        std : 0,
        itm : 0,
    })
    const [data, setData] = useState([]) 
    const [dataThisMonth, setDataThisMonth] = useState([]) 
    const [dataFilter, setDataFilter] = useState([]) 
    const dataBar = (dataFilter.length > 0 ? dataFilter : dataThisMonth).map((item,index) =>({
            name: bulan[index],
            STD: item.std,
            ITM: item.itm,
    }))

    console.log(dataThisMonth)
    const dataLineStd = (dataFilter.length > 0 ? dataFilter : dataThisMonth).slice(-5).map((item) =>({
        value : item.std
    }))
    const dataLineItm = (dataFilter.length > 0 ? dataFilter : dataThisMonth).slice(-5).map((item) =>({
        value : item.itm
    }))
    console.log(dataLineItm)

    
    const handleProcess = (first, last)=>{
        const dataDumy =  data.filter(item => item.created_at >= first && item.created_at <= last)
        setDataFilter(dataDumy)

        const std = dataDumy.reduce((total,item) => total + item.std,0)
        const itm = dataDumy.reduce((total,item) => total + item.itm,0)

        setDataRender({
            std : std,
            itm : itm,
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
                    setData(result.data)
                    setDataThisMonth(data)
                    console.log(result.data)
                    const std = data.reduce((total,item) => total + item.std,0)
                    const itm = data.reduce((total,item) => total + item.itm,0)

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
                <DatePicker className="date-picker" onChange={onChange1} />
                <DatePicker className="date-picker" onChange={onChange2} />
                <Button className='btn-proces-items'onClick={()=> handleProcess(firstDate,lastDate)}>Process</Button>
                </div>
                <div className="chart">

                        <BarChart
                            style={{
                                width: '100%', maxWidth:'100%', maxHeight:'50vh', aspectRatio:1.618,margin:'10px 0'
                            }}
                            responsive
                            data={dataBar}
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
                        <Count end={dataRender.std} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last days</div>
                        <LineChart
                        style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                        data={dataLineStd}
                        >
                            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
                        </LineChart>

                </div>

                <div className="data-section">
                    <span>Total ITM</span>
                    <div className="total-data">
                        <Count end={dataRender.itm} duration={1.3} separator="." />
                    </div>
                    <div className="growth">5 increased from last days</div>
                        <LineChart
                        style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                        data={dataLineItm}
                        >
                            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
                        </LineChart>

                </div>
            </div>
        </>
    )
    
}

export default HomeDashboard