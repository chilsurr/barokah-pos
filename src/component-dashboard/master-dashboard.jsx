import { Layout, DatePicker, Button, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CountUp from "react-countup";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

import income from "../assets/income.png";
import profit from "../assets/profit.png";
import struk from "../assets/transaction.png";
import item from "../assets/item.png";

import { getClosing, getOrderDetail } from "../utils/api";
import { isAuthenticated } from "../utils/auth";

function MasterDashboard() {
    const navigate = useNavigate();
    const Count = CountUp.default || CountUp;

    // State untuk data API mentah
    const [rawClosing, setRawClosing] = useState([]);
    const [rawOrderDetail, setRawOrderDetail] = useState([]);

    // State filter tanggal
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");

    // State data ringkasan kartu utama
    const [summaryData, setSummaryData] = useState({
        inc: 0,
        prf: 0,
        std: 0,
        itm: 0
    });

    // State data grafik AreaChart (Income & Profit dari getClosing)
    const [areaChartData, setAreaChartData] = useState([]);

    // State data Items Growth & Disgrowth (dari getOrderDetail)
    const [bestSellersData, setBestSellersData] = useState([]);
    const [lowSellersData, setLowSellersData] = useState([]);

    // Data static mock khusus Line Chart Order (sesuai Ketentuan 4: JANGAN diubah)
    const dataOrders = [
        { name: "1", online: 2000, offline: 1500 },
        { name: "2", online: 2300, offline: 1700 },
        { name: "3", online: 2600, offline: 1900 },
        { name: "4", online: 2900, offline: 2100 },
        { name: "5", online: 3200, offline: 2300 },
        { name: "6", online: 3500, offline: 2500 },
        { name: "7", online: 3800, offline: 2700 },
        { name: "8", online: 4100, offline: 2900 },
        { name: "9", online: 3800, offline: 2700 },
        { name: "10", online: 3500, offline: 2500 },
        { name: "11", online: 3200, offline: 2300 },
        { name: "12", online: 3000, offline: 2100 },
        { name: "13", online: 3300, offline: 2400 },
        { name: "14", online: 3600, offline: 2600 },
        { name: "15", online: 3900, offline: 2800 },
        { name: "16", online: 4200, offline: 3000 },
        { name: "17", online: 4500, offline: 3200 },
        { name: "18", online: 4800, offline: 3400 },
        { name: "19", online: 5100, offline: 3600 },
        { name: "20", online: 5400, offline: 3800 },
        { name: "21", online: 5700, offline: 4000 },
        { name: "22", online: 5400, offline: 3800 },
        { name: "23", online: 5100, offline: 3600 },
        { name: "24", online: 4800, offline: 3400 },
        { name: "25", online: 4500, offline: 3200 },
        { name: "26", online: 4200, offline: 3000 },
        { name: "27", online: 4600, offline: 3300 },
        { name: "28", online: 5000, offline: 3600 },
        { name: "29", online: 5400, offline: 3900 },
        { name: "30", online: 5800, offline: 4200 },
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

    // Validasi rentang tanggal (Ketentuan 2)
    const validateDateRange = (startDateStr, endDateStr) => {
        if (!startDateStr || !endDateStr) {
            message.warning("Silakan pilih tanggal mulai dan tanggal akhir terlebih dahulu!");
            return false;
        }

        const start = dayjs(startDateStr);
        const end = dayjs(endDateStr);

        if (!start.isValid() || !end.isValid()) {
            message.error("Format tanggal tidak valid!");
            return false;
        }

        if (start.isAfter(end, "day")) {
            message.error("Tanggal awal tidak boleh lebih besar dari tanggal akhir!");
            return false;
        }

        // Maksimal rentang 31 hari inklusif
        const diffDays = end.diff(start, "day") + 1;
        if (diffDays > 31) {
            message.error("Rentang tanggal maksimal adalah 31 hari!");
            return false;
        }

        return true;
    };

    // Fungsi pemrosesan dan agregasi data
    const processDashboardData = (closingList, orderDetailList, startDateStr, endDateStr) => {
        // 1. Filter getClosing sesuai range tanggal
        const filteredClosing = (closingList || []).filter(item => {
            if (!item.created_at) return false;
            const itemDate = dayjs(item.created_at).format("YYYY-MM-DD");
            return itemDate >= startDateStr && itemDate <= endDateStr;
        });

        // 2. Mapping & Agregasi ringkasan (Ketentuan 1):
        // Income -> inc
        // Profit -> prf
        // Struk -> std
        // Item -> itm
        const totals = filteredClosing.reduce(
            (acc, item) => {
                acc.inc += Number(item.inc) || 0;
                acc.prf += Number(item.prf) || 0;
                acc.std += Number(item.std) || 0;
                acc.itm += Number(item.itm) || 0;
                return acc;
            },
            { inc: 0, prf: 0, std: 0, itm: 0 }
        );
        setSummaryData(totals);

        // 3. Agregasi data grafik AreaChart (Income & Profit per tanggal)
        const groupedChart = {};
        filteredClosing.forEach(item => {
            const dateKey = dayjs(item.created_at).format("YYYY-MM-DD");
            const displayName = dayjs(item.created_at).format("DD/MM");
            if (!groupedChart[dateKey]) {
                groupedChart[dateKey] = {
                    key: dateKey,
                    name: displayName,
                    income: 0,
                    profit: 0
                };
            }
            groupedChart[dateKey].income += Number(item.inc) || 0;
            groupedChart[dateKey].profit += Number(item.prf) || 0;
        });

        const chartList = Object.values(groupedChart).sort((a, b) =>
            a.key.localeCompare(b.key)
        );
        setAreaChartData(chartList);

        // 4. Data Items Growth & Disgrowth dari getOrderDetail (Ketentuan 3)
        const filteredDetails = (orderDetailList || []).filter(item => {
            if (!item.created_at) return false;
            const itemDate = dayjs(item.created_at).format("YYYY-MM-DD");
            return itemDate >= startDateStr && itemDate <= endDateStr;
        });

        const productSales = {};
        filteredDetails.forEach(item => {
            if (!item.product) return;
            const prodId = item.product.id;
            if (!productSales[prodId]) {
                productSales[prodId] = {
                    id: prodId,
                    name: item.product.name,
                    quantity: 0
                };
            }
            productSales[prodId].quantity += Number(item.quantity) || 0;
        });

        const sortedProducts = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);

        // Top 10 Best Seller (Growth)
        const growth = sortedProducts.slice(0, 8);
        // 10 Lowest Seller (Disgrowth)
        const disgrowth = sortedProducts.slice(-8);

        setBestSellersData(growth);
        setLowSellersData(disgrowth);
    };

    // Load data awal (bulan berjalan)
    useEffect(() => {
        const loadInitialData = async () => {
            const isAuth = await isAuthenticated();
            if (isAuth.status !== 200) {
                navigate("/login/");
                return;
            }

            const defaultStart = dayjs().format("YYYY-MM-01");
            const defaultEnd = dayjs().format("YYYY-MM-DD");
            setFirstDate(defaultStart);
            setLastDate(defaultEnd);

            try {
                const [closingRes, orderDetailRes] = await Promise.all([
                    getClosing(),
                    getOrderDetail()
                ]);

                const closingData = closingRes?.data || [];
                const orderDetailData = orderDetailRes?.data || [];

                setRawClosing(closingData);
                setRawOrderDetail(orderDetailData);

                processDashboardData(closingData, orderDetailData, defaultStart, defaultEnd);
            } catch (error) {
                console.error("Gagal mengambil data dari API:", error);
                message.error("Gagal memuat data dari server!");
            }
        };

        loadInitialData();
    }, [navigate]);

    // Handler tombol Process
    const handleProcess = async () => {
        if (!validateDateRange(firstDate, lastDate)) {
            return;
        }

        try {
            const [closingRes, orderDetailRes] = await Promise.all([
                getClosing(),
                getOrderDetail()
            ]);

            const closingData = closingRes?.data || [];
            const orderDetailData = orderDetailRes?.data || [];

            setRawClosing(closingData);
            setRawOrderDetail(orderDetailData);

            processDashboardData(closingData, orderDetailData, firstDate, lastDate);
            message.success("Data berhasil diperbarui!");
        } catch (error) {
            console.error("Gagal memperbarui data:", error);
            // Fallback memproses data lokal jika request gagal
            processDashboardData(rawClosing, rawOrderDetail, firstDate, lastDate);
        }
    };

    return (
        <Layout className="master-dashboard-container">
            {/* Filter Tanggal */}
            <div className="date-input-dashboard">
                <DatePicker
                    className="date-picker"
                    placeholder="Tanggal Mulai"
                    value={firstDate ? dayjs(firstDate) : null}
                    onChange={(date) => setFirstDate(date ? date.format("YYYY-MM-DD") : "")}
                />
                <DatePicker
                    className="date-picker"
                    placeholder="Tanggal Akhir"
                    value={lastDate ? dayjs(lastDate) : null}
                    onChange={(date) => setLastDate(date ? date.format("YYYY-MM-DD") : "")}
                />
                <Button className="btn-proces-items" onClick={handleProcess}>
                    Process
                </Button>
            </div>

            {/* Kartu Ringkasan (Ketentuan 1) */}
            <section className="data-header">
                <div className="main-data-section income">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={income} alt="Income" />
                        </div>
                        <span>Total Income</span>
                    </div>
                    <div className="data-value">
                        <Count end={summaryData.inc} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>{firstDate} s/d {lastDate}</span>
                    </div>
                </div>

                <div className="main-data-section profit">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={profit} alt="Profit" />
                        </div>
                        <span>Total Profit</span>
                    </div>
                    <div className="data-value">
                        <Count end={summaryData.prf} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>{firstDate} s/d {lastDate}</span>
                    </div>
                </div>

                <div className="main-data-section struk">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={struk} alt="Struk" />
                        </div>
                        <span>Total Struk</span>
                    </div>
                    <div className="data-value">
                        <Count end={summaryData.std} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>{firstDate} s/d {lastDate}</span>
                    </div>
                </div>

                <div className="main-data-section items">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={item} alt="Items" />
                        </div>
                        <span>Total items</span>
                    </div>
                    <div className="data-value">
                        <Count end={summaryData.itm} duration={1.3} separator="." />
                    </div>
                    <div className="growth-indikator">
                        <span>{firstDate} s/d {lastDate}</span>
                    </div>
                </div>
            </section>

            {/* Konten Grafik & Daftar Barang */}
            <section className="data-content">
                <div className="data-linechart">
                    {/* Area Chart: Income & Profit Real dari getClosing */}
                    <div className="linechart-profit">
                        <AreaChart
                            style={{ width: '100%', maxWidth: '100%', maxHeight: '45vh', aspectRatio: 1.618 }}
                            responsive
                            data={areaChartData}
                            margin={{
                                top: 20,
                                right: 10,
                                left: 10,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis width="auto" />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="income" name="Income" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="profit" name="Profit" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.6} />
                        </AreaChart>
                    </div>

                    {/* Line Chart: Order (Ketentuan 4: JANGAN diubah) */}
                    <div className="linechart-orders">
                        <LineChart
                            style={{ width: '100%', maxWidth: '100%', maxHeight: '45vh', aspectRatio: 1.618 }}
                            responsive
                            data={dataOrders}
                            margin={{
                                top: 20,
                                right: 10,
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
                        </LineChart>
                    </div>
                </div>

                {/* Items Growth (Best Seller) & Items Disgrowth (Low Seller) dari getOrderDetail (Ketentuan 3) */}
                <div className="data-items">
                    <div className="best-seller">
                        <div className="header-items">Items Best Seller (Growth)</div>
                        {bestSellersData.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "12px" }}>
                                Tidak ada data
                            </div>
                        ) : (
                            bestSellersData.map((itemObj, index) => (
                                <div className="list-item" key={`growth-${itemObj.id || itemObj.name}-${index}`}>
                                    <span>{index + 1 + ". " + itemObj.name}</span>
                                    <span>{itemObj.quantity}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="low-seller">
                        <div className="header-items">Items Low Seller (Disgrowth)</div>
                        {lowSellersData.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "12px", color: "#888", fontSize: "12px" }}>
                                Tidak ada data
                            </div>
                        ) : (
                            lowSellersData.map((itemObj, index) => (
                                <div className="list-item" key={`disgrowth-${itemObj.id || itemObj.name}-${index}`}>
                                    <span>{index + 1 + ". " + itemObj.name}</span>
                                    <span>{itemObj.quantity}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default MasterDashboard;