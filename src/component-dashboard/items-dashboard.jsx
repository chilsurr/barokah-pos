import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, Cell, Pie, PieChart } from 'recharts';
import { DatePicker, Button } from "antd";
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { getOrderDetail } from '../utils/api';
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
    // Sembunyikan label jika porsi terlalu kecil (< 4%) agar tidak tumpang tindih
    if ((percent ?? 0) < 0.04) {
        return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

function ItemsDashboard({ isAnimationActive = true }) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [growthData, setGrowthData] = useState([]);
    const [disgrowthData, setDisgrowthData] = useState([]);
    const [firstDate, setFirstDate] = useState();
    const [lastDate, setLastDate] = useState();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await isAuthenticated();
            if (isAuth.status === 200) {
                getOrderDetail().then((result) => {
                    const date1 = dayjs().format("YYYY-MM-01");
                    const date2 = dayjs().format("YYYY-MM-DD");
                    const allData = result.data || [];
                    const filteredThisMonth = allData.filter(item => item.created_at >= date1 && item.created_at <= date2);


                    setFirstDate(date1);
                    setLastDate(date2);
                    setData(allData);

                    // Agregasi jumlah item per produk
                    const aggregated = Object.values(
                        filteredThisMonth.reduce((accum, item) => {
                            if (!accum[item.product.id]) {
                                accum[item.product.id] = { ...item };
                            } else {
                                accum[item.product.id].quantity += item.quantity;
                            }
                            return accum;
                        }, {})
                    );

                    // Urutkan dari penjualan tertinggi ke terendah
                    const sortData = aggregated.sort((a, b) => b.quantity - a.quantity);

                    // Top 10 barang terlaris (Growth)
                    const growth = sortData.slice(0, 10).map((item, index) => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        index: index + 1
                    }));

                    // 10 barang paling sedikit terjual (Disgrowth)
                    const disgrowth = sortData.slice(-10).map((item, index) => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        index: index + 1
                    }));

                    setGrowthData(growth);
                    setDisgrowthData(disgrowth);
                });
            } else {
                navigate("/login");
            }
        };
        checkAuth();
    }, [navigate]);

    const onChange1 = (date, dateString) => {
        setFirstDate(dateString);
    };

    const onChange2 = (date, dateString) => {
        setLastDate(dateString);
    };

    const handleProcess = (first, last) => {
        if (!data || !first || !last) return;

        const dataFilter = data.filter(item => item.created_at >= first && item.created_at <= last);

        const aggregated = Object.values(
            dataFilter.reduce((accum, item) => {
                if (!accum[item.product.id]) {
                    accum[item.product.id] = { ...item };
                } else {
                    accum[item.product.id].quantity += item.quantity;
                }
                return accum;
            }, {})
        );

        const sortData = aggregated.sort((a, b) => b.quantity - a.quantity);

        const growth = sortData.slice(0, 10).map((item, index) => ({
            name: item.product.name,
            quantity: item.quantity,
            index: index + 1
        }));

        const disgrowth = sortData.slice(-10).map((item, index) => ({
            name: item.product.name,
            quantity: item.quantity,
            index: index + 1
        }));

        setGrowthData(growth);
        setDisgrowthData(disgrowth);
    };

    return (
        <div className="items-dashboard-container">
            {/* Filter Tanggal */}
            <div className="date-input-dashboard">
                <DatePicker className="date-picker" placeholder="Tanggal Mulai" value={firstDate ? dayjs(firstDate) : null} onChange={onChange1} />
                <DatePicker className="date-picker" placeholder="Tanggal Akhir" value={lastDate ? dayjs(lastDate) : null} onChange={onChange2} />
                <Button className="btn-proces-items" onClick={() => handleProcess(firstDate, lastDate)}>
                    Process
                </Button>
            </div>

            {/* Bar Charts Section */}
            <div className="bar-chart">
                <div className="bar-chart-card">
                    <div className="chart-header-title">Items Growth (Top 10)</div>
                    <BarChart
                        style={{ width: '100%', maxHeight: '40vh', aspectRatio: 1.618, margin: '10px 0' }}
                        responsive
                        data={growthData}
                        margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis width="auto" />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="quantity"
                            name="Items Growth"
                            fill="#2E7D32"
                            animationDuration={1000}
                            radius={[5, 5, 0, 0]}
                        />
                    </BarChart>
                </div>

                <div className="bar-chart-card">
                    <div className="chart-header-title">Items Disgrowth (Lowest 10)</div>
                    <BarChart
                        style={{ width: '100%', maxHeight: '40vh', aspectRatio: 1.618, margin: '10px 0' }}
                        responsive
                        data={disgrowthData}
                        margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis width="auto" />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="quantity"
                            name="Items Disgrowth"
                            fill="#00695C"
                            animationDuration={1000}
                            radius={[5, 5, 0, 0]}
                        />
                    </BarChart>
                </div>
            </div>

            {/* Pie Charts & Ranking Lists Section */}
            <div className="pie-chart">
                {/* Proporsi Items Growth */}
                <div className="pie-section">
                    <div className="header-items">Proporsi Items Growth</div>
                    <div className="pie-content-wrapper">
                        <div className="chart-item-pie">
                            <PieChart style={{ width: '100%', maxWidth: '260px', maxHeight: '260px', aspectRatio: 1 }} responsive>
                                <Pie
                                    data={growthData}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    fill="#2E7D32"
                                    dataKey="quantity"
                                    animationDuration={1000}
                                    isAnimationActive={isAnimationActive}
                                >
                                    {growthData.map((entry, index) => (
                                        <Cell key={`cell-growth-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                        <div className="list-item-growth">
                            {growthData.map((item, index) => (
                                <div className="list-item" key={`item-growth-${item.name}-${index}`}>
                                    <span>{index + 1 + ". " + item.name}</span>
                                    <span>{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Proporsi Items Disgrowth */}
                <div className="pie-section">
                    <div className="header-items">Proporsi Items Disgrowth</div>
                    <div className="pie-content-wrapper">
                        <div className="chart-item-pie">
                            <PieChart style={{ width: '100%', maxWidth: '260px', maxHeight: '260px', aspectRatio: 1 }} responsive>
                                <Pie
                                    data={disgrowthData}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    fill="#00695C"
                                    dataKey="quantity"
                                    animationDuration={1000}
                                    isAnimationActive={isAnimationActive}
                                >
                                    {disgrowthData.map((entry, index) => (
                                        <Cell key={`cell-disgrowth-${index}`} fill={COLORS2[index % COLORS2.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                        <div className="list-item-disgrowth">
                            {disgrowthData.map((item, index) => (
                                <div className="list-item" key={`item-disgrowth-${item.name}-${index}`}>
                                    <span>{index + 1 + ". " + item.name}</span>
                                    <span>{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemsDashboard;
