import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Cell, Pie, PieChart } from 'recharts';
import { DatePicker,Button  } from "antd"
import CountUp from "react-countup";
import { useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

import { getOrderDetail } from '../utils/api';
import { useState } from 'react';

import dayjs from 'dayjs';

const RADIAN = Math.PI / 180;
const COLORS1 = [
  "#1B5E20", // hijau gelap 1
  "#2E7D32", // hijau gelap 2
  "#357A44", // hijau gelap 3
  "#388E3C", // hijau medium 1
  "#43A047", // hijau medium 2
  "#4CAF50", // hijau medium 3
  "#66BB6A", // hijau cerah 1
  "#81C784", // hijau cerah 2
  "#A5D6A7", // hijau cerah 3
  "#C8E6C9"  // hijau paling terang

];
const COLORS2 = [
   "#004D40", // biru-hijau gelap 1
    "#00695C", // biru-hijau gelap 2
    "#00796B", // biru-hijau medium 1
    "#00897B", // biru-hijau medium 2
    "#009688", // biru-hijau medium 3 (teal)
    "#26A69A", // biru-hijau terang 1
    "#4DB6AC", // biru-hijau terang 2
    "#80CBC4", // biru-hijau muda 1
    "#B2DFDB", // biru-hijau muda 2
    "#E0F2F1"  // biru-hijau paling terang
];


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

function ItemsDashboard( { isAnimationActive = true }) {

    const [data,setData] = useState() 
    const navigate = useNavigate()
    const [growthData,setGrowthData] = useState([])
    const [disgrowthData,setDisgrowthData] = useState([])
    console.log(growthData)
    console.log(disgrowthData)

    useEffect(()=>{
        const checkAuth = async() =>{
                    const isAuth = await isAuthenticated()
                    if(isAuth.status === 200){
                        getOrderDetail().then((result)=>{
                            const date1 = dayjs().format("YYYY-MM-"+'01')
                            const date2 = dayjs().format("YYYY-MM-DD")
                            console.log(`${date1} - ${date2}`)
                            const data = result.data.filter(item => item.created_at >= date1 && item.created_at <= date2)
                            setData(result.data)
                            console.log(result.data)
                            console.log(data)
                            const newData = Object.values(
                                data.reduce((accum,item)=>{
                                    if(!accum[item.product.id]){
                                        accum[item.product.id] = {...item}
                                    }else{
                                        accum[item.product.id].quantity += item.quantity 
                                    }
                                    return accum
                                },{})
                            )
                            // console.log(newData)
                            const sortData = newData.sort((a,b) => b.quantity - a.quantity)

                            const dumyGrowth = newData.slice(0,10)
                            const dumyDisgrowth = newData.slice(-10)
                            const growth = []
                            const disgrowth  = []
                            dumyGrowth.map((item,index) =>{
                                const dumy = {
                                    name: item.product.name,
                                    quantity:item.quantity,
                                    index: index + 1
                                }
                                disgrowth.push(dumy)
                            })

                            dumyDisgrowth.map((item,index) =>{
                                const dumy = {
                                    name: item.product.name,
                                    quantity:item.quantity,
                                    index: index + 1
                                }
                                growth.push(dumy)
                            })
                            setGrowthData(growth)
                            setDisgrowthData(disgrowth)
                            // setData(newData)
                        })
                    }else{
                        navigate("/login")
                        console.log('login false')
                    }
                }
                checkAuth()
    },[])

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
        // setDataFilter(dataDumy)

        const newData = Object.values(
            dataDumy.reduce((accum,item)=>{
                if(!accum[item.product.id]){
                    accum[item.product.id] = {...item}
                }else{
                    accum[item.product.id].quantity += item.quantity 
                }
                return accum
            },{})
        )
        // console.log(newData)
        const sortData = newData.sort((a,b) => b.quantity - a.quantity)

        const dumyGrowth = newData.slice(0,10)
        const dumyDisgrowth = newData.slice(-10)
        const growth = []
        const disgrowth  = []
        dumyGrowth.map((item,index) =>{
            const dumy = {
                name: item.product.name,
                quantity:item.quantity,
                index: index + 1
            }
            disgrowth.push(dumy)
        })

        dumyDisgrowth.map((item,index) =>{
            const dumy = {
                name: item.product.name,
                quantity:item.quantity,
                index: index + 1
            }
            growth.push(dumy)
        })
        setGrowthData(growth)
        setDisgrowthData(disgrowth)
    }


    const Count = CountUp.default
    return(
         <>
            <div className="date-input-dashboard">
                <DatePicker className="date-picker" onChange={onChange1} />
                <DatePicker className="date-picker" onChange={onChange2} />
                <Button className='btn-proces-items' onClick={()=> handleProcess(firstDate,lastDate)}>Process</Button>
                <div className="bar-chart">
                    <BarChart
                        style={{
                            width: '40%', maxWidth:'50%', maxHeight:'40vh', aspectRatio:1.618,margin:'10px 0'
                        }}
                        responsive
                        data={growthData}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis width="auto" />
                        {/* <Tooltip /> */}
                        <Legend />
                        <Bar dataKey="quantity" name="Items Disgrowth" fill="#2E7D32" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
                    </BarChart> 
                    <BarChart
                        style={{
                            width: '40%', maxWidth:'50%', maxHeight:'40vh', aspectRatio:1.618, margin:'10px 0'
                        }}
                        responsive
                        data={disgrowthData}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis width="auto" />
                        {/* <Tooltip /> */}
                        <Legend />
                        <Bar dataKey="quantity" name="Items Growth" fill="#00695C" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
                    </BarChart> 

                </div>
                <div className="pie-chart">
                    <div className="growth">
                        <div className="chart-item-growth" style={{ width: '300px', height: 300 }}>
                            <PieChart style={{ width: '100%', maxWidth: '350px', maxHeight: '50vh', aspectRatio: 1 }} responsive>
                                <Pie
                                    data={growthData}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    fill="#8884d8"
                                    dataKey="quantity"
                                    animationDuration={1000}
                                    isAnimationActive={isAnimationActive}
                                >
                                    {growthData.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS1[index % COLORS1.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="list-item-growth">
                            {growthData.map((item,index)=>(
                                <div className='list-item' key={item.name + index}>
                                    <span>{index + 1 +". "+ item.name}</span>
                                    <span>{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="disgrowth">
                        <div className="chart-item-disgrowth" style={{ width: '300px', height: 300}}>
                            <PieChart style={{ width: '100%', maxWidth: '350px', maxHeight: '50vh', aspectRatio: 1 }} responsive>
                                <Pie
                                    data={disgrowthData}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    fill="#8884d8"
                                    dataKey="quantity"
                                    animationDuration={1000}
                                    isAnimationActive={isAnimationActive}
                                >
                                    {disgrowthData.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS2[index % COLORS2.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="list-item-disgrowth" >
                            {disgrowthData.map((item,index)=>(
                                <div className='list-item'key={item.name + index}>
                                    <span>{index + 1 +". "+ item.name}</span>
                                    <span>{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemsDashboard
