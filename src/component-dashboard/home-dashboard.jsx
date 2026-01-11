import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Line, LineChart } from 'recharts';
import { DatePicker  } from "antd"
import CountUp from "react-countup";

function HomeDashboard() {

    const data = [
        {
            name: 'Jan',
            STD: 4200,
            AVC: 3100,
            ITM: 8900,
        },
        {
            name: 'Feb',
            STD: 3800,
            AVC: 2900,
            ITM: 8900,
        },
        {
            name: 'Mar',
            STD: 4600,
            AVC: 3400,
            ITM: 8900,
        },
        {
            name: 'Apr',
            STD: 5000,
            AVC: 3700,
            ITM: 8900,
        },
        {
            name: 'Mei',
            STD: 4800,
            AVC: 3600,
            ITM: 8900,
        },
        {
            name: 'Jun',
            STD: 5200,
            AVC: 3900,
            ITM: 8900,
        },
        {
            name: 'Jul',
            STD: 5600,
            AVC: 4200,
            ITM: 8900,
        },
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
                            <Bar dataKey="AVC" fill="#2E7D32" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
                            <Bar dataKey="ITM" fill="#66BB6A" animationDuration={1000} activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[5, 5, 0, 0]} />
                            <Bar dataKey="STD" fill="#43A047" animationDuration={1000} activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[5, 5, 0, 0]} />
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
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>

                </div>
                <div className="data-section">
                    <span>Total AVC</span>
                    <div className="total-data">
                        <Count end={36000} duration={1.3} separator="." />
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
                    <span>Total ITM</span>
                    <div className="total-data">
                        <Count end={253} duration={1.3} separator="." />
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

export default HomeDashboard