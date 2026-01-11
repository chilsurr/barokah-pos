import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Line, LineChart } from 'recharts';
import { DatePicker  } from "antd"
import CountUp from "react-countup";

function RevenueDashboard() {

    const data = [
        {
            name: 'Jan',
            HPP: 15000000,
            INCOME: 20000000,
            PL: 5000000,
        },
        {
            name: 'Feb',
            HPP: 38000000,
            INCOME: 40000000,
            PL: 2000000,
        },
        {
            name: 'Mar',
            HPP: 26000000,
            INCOME: 34000000,
            PL: 8000000,
        },
        {
            name: 'Apr',
            HPP: 25000000,
            INCOME: 37000000,
            PL: 12000000,
        },
        {
            name: 'Mei',
            HPP: 32000000,
            INCOME: 36000000,
            PL: 4000000,
        },
        {
            name: 'Jun',
            HPP: 22000000,
            INCOME: 39000000,
            PL: 17000000,
        },
        {
            name: 'Jul',
            HPP: 26000000,
            INCOME: 42000000,
            PL: 16000000,
        },
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
                    <Bar dataKey="HPP" fill="#2E7D32" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
                    <Bar dataKey="INCOME" fill="#66BB6A" animationDuration={1000} activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[5, 5, 0, 0]} />
                    <Bar dataKey="PL" fill="#43A047" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
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
                    data={growth_data}
                    >
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
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
                    data={growth_data}
                    >
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
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
                    data={growth_data}
                    >
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </div>
            </div>
        </>
    )
    
}

export default RevenueDashboard