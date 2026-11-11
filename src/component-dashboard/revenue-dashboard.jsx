import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Line, LineChart } from "recharts";
import { DatePicker, Button } from "antd";
import CountUp from "react-countup";

import { getClosing } from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import dayjs from "dayjs";


function determineGranularity(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!start.isValid() || !end.isValid()) {
        return null;
    }

    // Jika berbeda tahun → year
    if (start.year() !== end.year()) {
        return "year";
    }

    // Jika berbeda bulan → month
    if (start.month() !== end.month()) {
        return "month";
    }

    // Jika masih dalam bulan yang sama → day
    return "day";
}


function aggregateData(data, startDate, endDate, granularity) {
    if (!startDate || !endDate || !granularity) {
        return [];
    }

    const start = dayjs(startDate);
    const end = dayjs(endDate);

    // Filter data sesuai tanggal yang dipilih user
    const filteredData = data.filter((item) => {
        const date = dayjs(item.created_at);

        return (
            date.isValid() &&
            (date.isAfter(start, "day") || date.isSame(start, "day")) &&
            (date.isBefore(end, "day") || date.isSame(end, "day"))
        );
    });

    const groupedData = {};

    filteredData.forEach((item) => {
        const date = dayjs(item.created_at);

        let key;
        let name;

        if (granularity === "day") {
            key = date.format("YYYY-MM-DD");
            name = date.format("DD MMM");
        }

        if (granularity === "month") {
            key = date.format("YYYY-MM");
            name = date.format("MMMM");
        }

        if (granularity === "year") {
            key = date.format("YYYY");
            name = date.format("YYYY");
        }

        if (!groupedData[key]) {
            groupedData[key] = {
                key,
                name,
                INC: 0,
                HPP: 0,
                PRF: 0,
            };
        }

        groupedData[key].INC += Number(item.inc) || 0;
        groupedData[key].HPP += Number(item.hpp) || 0;
        groupedData[key].PRF += Number(item.prf) || 0;
    });

    return Object.values(groupedData).sort((a, b) =>
        a.key.localeCompare(b.key)
    );
}


function RevenueDashboard() {
    const navigate = useNavigate();

    const [dataRender, setDataRender] = useState({
        inc: 0,
        hpp: 0,
        prf: 0,
    });

    const [data, setData] = useState([]);

    const [chartData, setChartData] = useState([]);

    const [firstDate, setFirstDate] = useState();
    const [lastDate, setLastDate] = useState();

    const [granularity, setGranularity] = useState(null);


    const onChange1 = (date, dateString) => {
        setFirstDate(dateString);
    };


    const onChange2 = (date, dateString) => {
        setLastDate(dateString);
    };


    const handleProcess = () => {
        if (!firstDate || !lastDate) {
            return;
        }

        const start = dayjs(firstDate);
        const end = dayjs(lastDate);

        if (!start.isValid() || !end.isValid()) {
            return;
        }

        if (start.isAfter(end, "day")) {
            return;
        }

        // Tentukan granularitas berdasarkan tanggal
        const selectedGranularity = determineGranularity(
            firstDate,
            lastDate
        );

        // Filter + aggregate data
        const aggregatedData = aggregateData(
            data,
            firstDate,
            lastDate,
            selectedGranularity
        );

        setGranularity(selectedGranularity);
        setChartData(aggregatedData);

        // Total data dari hasil aggregation
        const inc = aggregatedData.reduce(
            (total, item) => total + item.INC,
            0
        );

        const hpp = aggregatedData.reduce(
            (total, item) => total + item.HPP,
            0
        );

        const prf = aggregatedData.reduce(
            (total, item) => total + item.PRF,
            0
        );

        setDataRender({
            inc,
            hpp,
            prf,
        });
    };


    useEffect(() => {
        const checkAuth = async () => {
            const isauth = await isAuthenticated();

            if (isauth.status === 200) {
                getClosing().then((result) => {
                    const resultData = result.data || [];

                    setData(resultData);

                    // Default dashboard menggunakan bulan berjalan
                    const date1 = dayjs().startOf("month");
                    const date2 = dayjs();


                    // const defaultStart = dayjs().format("YYYY-MM-01");
                    // const defaultEnd = dayjs().format("YYYY-MM-DD");
                    setFirstDate(date1);
                    setLastDate(date2);

                    const thisMonthData = resultData.filter((item) => {
                        const date = dayjs(item.created_at);

                        return (
                            date.isValid() &&
                            (
                                date.isAfter(date1, "day") ||
                                date.isSame(date1, "day")
                            ) &&
                            (
                                date.isBefore(date2, "day") ||
                                date.isSame(date2, "day")
                            )
                        );
                    });

                    // Total bulan berjalan
                    const inc = thisMonthData.reduce(
                        (total, item) =>
                            total + (Number(item.inc) || 0),
                        0
                    );

                    const hpp = thisMonthData.reduce(
                        (total, item) =>
                            total + (Number(item.hpp) || 0),
                        0
                    );

                    const prf = thisMonthData.reduce(
                        (total, item) =>
                            total + (Number(item.prf) || 0),
                        0
                    );

                    setDataRender({
                        inc,
                        hpp,
                        prf,
                    });

                    // Default chart per tanggal
                    const defaultChartData = aggregateData(
                        resultData,
                        date1.format("YYYY-MM-DD"),
                        date2.format("YYYY-MM-DD"),
                        "day"
                    );

                    setChartData(defaultChartData);
                    setGranularity("day");
                });
            } else {
                navigate("/login/");
            }
        };

        checkAuth();
    }, [navigate]);


    const Count = CountUp.default;


    const dataLineHpp = chartData
        .slice(-5)
        .map((item) => ({
            value: item.HPP,
        }));


    const dataLineInc = chartData
        .slice(-5)
        .map((item) => ({
            value: item.INC,
        }));


    const dataLinePrf = chartData
        .slice(-5)
        .map((item) => ({
            value: item.PRF,
        }));


    return (
        <>
            <div className="date-input-dashboard">

                <DatePicker
                    className="date-picker"
                    value={firstDate ? dayjs(firstDate) : null}
                    onChange={onChange1}
                />

                <DatePicker
                    className="date-picker"
                    value={lastDate ? dayjs(lastDate) : null}
                    onChange={onChange2}
                />

                <Button
                    className="btn-proces-items"
                    onClick={handleProcess}
                >
                    Process
                </Button>

            </div>


            <div className="chart">

                <BarChart
                    style={{
                        width: "100%",
                        maxWidth: "100%",
                        maxHeight: "50vh",
                        aspectRatio: 1.618,
                        margin: "10px 0",
                    }}
                    responsive
                    data={chartData}
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

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="HPP"
                        fill="#2E7D32"
                        animationDuration={1000}
                        activeBar={{
                            fill: "pink",
                            stroke: "blue",
                        }}
                        radius={[5, 5, 0, 0]}
                    />

                    <Bar
                        dataKey="INC"
                        fill="#66BB6A"
                        animationDuration={1000}
                        activeBar={{
                            fill: "gold",
                            stroke: "purple",
                        }}
                        radius={[5, 5, 0, 0]}
                    />

                    <Bar
                        dataKey="PRF"
                        fill="#43A047"
                        animationDuration={1000}
                        activeBar={{
                            fill: "pink",
                            stroke: "blue",
                        }}
                        radius={[5, 5, 0, 0]}
                    />

                </BarChart>

            </div>


            <div className="data-transaction">

                <div className="data-section">

                    <span>Total HPP</span>

                    <div className="total-data">
                        <Count
                            end={dataRender.hpp}
                            duration={1.3}
                            separator="."
                        />
                    </div>

                    <div className="growth">
                        5 increased from last month
                    </div>

                    <LineChart
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            maxHeight: "100px",
                            aspectRatio: 1.618,
                        }}
                        data={dataLineHpp}
                    >

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                            animationDuration={1000}
                        />

                    </LineChart>

                </div>


                <div className="data-section">

                    <span>Total INCOME</span>

                    <div className="total-data">
                        <Count
                            end={dataRender.inc}
                            duration={1.3}
                            separator="."
                        />
                    </div>

                    <div className="growth">
                        5 increased from last days
                    </div>

                    <LineChart
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            maxHeight: "100px",
                            aspectRatio: 1.618,
                        }}
                        data={dataLineInc}
                    >

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                            animationDuration={1000}
                        />

                    </LineChart>

                </div>


                <div className="data-section">

                    <span>Total PL</span>

                    <div className="total-data">
                        <Count
                            end={dataRender.prf}
                            duration={1.3}
                            separator="."
                        />
                    </div>

                    <div className="growth">
                        5 increased from last days
                    </div>

                    <LineChart
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            maxHeight: "100px",
                            aspectRatio: 1.618,
                        }}
                        data={dataLinePrf}
                    >

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                            animationDuration={1000}
                        />

                    </LineChart>

                </div>

            </div>
        </>
    );
}


export default RevenueDashboard;





