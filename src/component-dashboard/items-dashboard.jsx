import { Cell, Pie, PieChart } from 'recharts';
import { DatePicker,Layout  } from "antd"

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
  "#E65100", // oranye gelap 1
  "#EF6C00", // oranye gelap 2
  "#F57C00", // oranye medium 1
  "#FB8C00", // oranye medium 2
  "#FF9800", // oranye medium 3
  "#FFA726", // oranye terang 1
  "#FFB74D", // oranye terang 2
  "#FFCA28", // kuning-oranye 1
  "#FFD54F", // kuning-oranye 2
  "#FFE082"  // kuning-oranye paling terang

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

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const itemsgrowth = [
        { name: "Indomie Goreng", value: 1200 },
        { name: "Aqua Botol 600ml", value: 980 },
        { name: "Teh Kotak Sosro", value: 860 },
        { name: "Susu UHT", value: 740 },
        { name: "Roti Tawar", value: 620 },
        { name: "Gula Pasir", value: 580 },
        { name: "Telur Ayam", value: 540 },
        { name: "Beras 5kg", value: 430 },
        { name: "Minyak Goreng", value: 390 },
        { name: "Snack Chitato", value: 310 },
    ];

    const itemsDisgrowth = [
        { name: "Snack Lays", value: 150 },
        { name: "Susu Kental Manis", value: 120 },
        { name: "Teh Pucuk", value: 110 },
        { name: "Roti Manis", value: 90 },
        { name: "Permen Mint", value: 80 },
        { name: "Minyak Goreng 1L", value: 75 },
        { name: "Biskuit Marie", value: 60 },
        { name: "Cokelat Batangan", value: 50 },
        { name: "Gula Pasir", value: 45 },
        { name: "Air Mineral Gelas", value: 40 },
    ];

    return(
         <>
            <div className="date-input-dashboard">
                <DatePicker className="close-input" onChange={onChange} />
                <DatePicker className="close-input" onChange={onChange} />
                <Layout>
                    <div className="list-items">
                        <div className="list-item-growth">
                            {itemsgrowth.map((item,index)=>(
                                <div className='list-item' key={item.name + index}>
                                    <span>{item.name}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="list-item-disgrowth" >
                            {itemsDisgrowth.map((item,index)=>(
                                <div className='list-item'key={item.name + index}>
                                    <span>{item.name}</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Layout>
                <div className="chart-items">
                    <div className="chart-item-growth" style={{ width: '100%', height: 300 }}>
                        <PieChart style={{ width: '100%', maxWidth: '400px', maxHeight: '50vh', aspectRatio: 1 }} responsive>
                            <Pie
                                data={itemsgrowth}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                fill="#8884d8"
                                dataKey="value"
                                isAnimationActive={isAnimationActive}
                            >
                                {itemsgrowth.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS1[index % COLORS1.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                    <div className="chart-item-disgrowth" style={{ width: '100%', height: 300 }}>
                        <PieChart style={{ width: '100%', maxWidth: '400px', maxHeight: '50vh', aspectRatio: 1 }} responsive>
                            <Pie
                                data={itemsDisgrowth}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                fill="#8884d8"
                                dataKey="value"
                                isAnimationActive={isAnimationActive}
                            >
                                {itemsDisgrowth.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS2[index % COLORS2.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemsDashboard
