
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
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

    // Berbeda tahun
    if (start.year() !== end.year()) {
        return "year";
    }

    // Berbeda bulan
    if (start.month() !== end.month()) {
        return "month";
    }

    // Masih dalam bulan yang sama
    return "day";
}


function aggregateData(data, startDate, endDate, granularity) {
    if (!startDate || !endDate || !granularity) {
        return [];
    }

    const start = dayjs(startDate);
    const end = dayjs(endDate);

    // Filter berdasarkan range tanggal terlebih dahulu
    const filteredData = data.filter((item) => {
        const date = dayjs(item.created_at);

        return (
            date.isValid() &&
            (
                date.isAfter(start, "day") ||
                date.isSame(start, "day")
            ) &&
            (
                date.isBefore(end, "day") ||
                date.isSame(end, "day")
            )
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
                STD: 0,
                ITM: 0
            };
        }

        groupedData[key].STD += Number(item.std) || 0;
        groupedData[key].ITM += Number(item.itm) || 0;
    });

    return Object.values(groupedData).sort((a, b) =>
        a.key.localeCompare(b.key)
    );
}


function HomeDashboard() {
    const navigate = useNavigate();

    const [firstDate, setFirstDate] = useState();
    const [lastDate, setLastDate] = useState();

    const [dataRender, setDataRender] = useState({
        std: 0,
        itm: 0
    });

    const [data, setData] = useState([]);

    const [chartData, setChartData] = useState([]);

    const [granularity, setGranularity] = useState(null);


    const Count = CountUp.default;


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

        // Tentukan granularitas
        const selectedGranularity = determineGranularity(
            firstDate,
            lastDate
        );

        // Filter dan aggregate data
        const aggregatedData = aggregateData(
            data,
            firstDate,
            lastDate,
            selectedGranularity
        );

        setGranularity(selectedGranularity);
        setChartData(aggregatedData);

        // Hitung total dari hasil aggregation
        const std = aggregatedData.reduce(
            (total, item) => total + item.STD,
            0
        );

        const itm = aggregatedData.reduce(
            (total, item) => total + item.ITM,
            0
        );

        setDataRender({
            std,
            itm
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

                    // Total STD bulan berjalan
                    const std = thisMonthData.reduce(
                        (total, item) =>
                            total + (Number(item.std) || 0),
                        0
                    );

                    // Total ITM bulan berjalan
                    const itm = thisMonthData.reduce(
                        (total, item) =>
                            total + (Number(item.itm) || 0),
                        0
                    );

                    setDataRender({
                        std,
                        itm
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


    const dataLineStd = chartData
        .slice(-5)
        .map((item) => ({
            value: item.STD
        }));


    const dataLineItm = chartData
        .slice(-5)
        .map((item) => ({
            value: item.ITM
        }));


    return (
        <>
            <div className="date-input-dashboard">

                <DatePicker className="date-picker" placeholder="Tanggal Mulai" value={firstDate ? dayjs(firstDate) : null} onChange={onChange1} />
                <DatePicker className="date-picker" placeholder="Tanggal Akhir" value={lastDate ? dayjs(lastDate) : null} onChange={onChange2} />

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
                        margin: "10px 0"
                    }}
                    responsive
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis width="auto" />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="ITM"
                        fill="#2E7D32"
                        animationDuration={1000}
                        activeBar={{
                            fill: "gold",
                            stroke: "purple"
                        }}
                        radius={[5, 5, 0, 0]}
                    />

                    <Bar
                        dataKey="STD"
                        fill="#66BB6A"
                        animationDuration={1000}
                        activeBar={{
                            fill: "pink",
                            stroke: "blue"
                        }}
                        radius={[5, 5, 0, 0]}
                    />

                </BarChart>

            </div>


            <div className="data-transaction">

                <div className="data-section">

                    <span>Total STD</span>

                    <div className="total-data">
                        <Count
                            end={dataRender.std}
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
                            aspectRatio: 1.618
                        }}
                        data={dataLineStd}
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

                    <span>Total ITM</span>

                    <div className="total-data">
                        <Count
                            end={dataRender.itm}
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
                            aspectRatio: 1.618
                        }}
                        data={dataLineItm}
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


export default HomeDashboard;