import { Layout } from "antd"
// import  CountUp  from "react-countup";
import { Outlet, useNavigate,useLocation} from "react-router-dom";
import logo from "../src/assets/logo-remove.png"
import logoDashboard from "../src/assets/dashboard.png"
import pos from "../src/assets/computer.png"
import revenue from "../src/assets/revenue.png"
import perform from "../src/assets/perform.png"
import transaction from "../src/assets/transaction.png"






function MainDashboard() {
  const navigate = useNavigate()
  const locations = useLocation()

    return (
        <>
            <Layout className="container-dashboard">

                <div className="main-dashboard">
                    <div className="sidebar-dashboard">
                        <div className="sidebar-header">
                            <img src={logo} alt="" />
                            <span>Barokah</span>
                        </div>
                        <div className="sidebar-section">
                            <div className="sidebar-item" onClick={()=> navigate("")}>
                                <img src={logoDashboard} alt="" />
                                <span>Dashboard</span>
                            </div>
                            <div className="sidebar-item" onClick={()=> navigate("/")}>
                                <img src={pos} alt="" />
                                <span>POS</span>
                            </div>
                            <div className={locations.pathname === "/home-dashboard/" ? "btn-active-dashboard" : "sidebar-item"} onClick={()=> navigate("home-dashboard/")}>
                                <img src={transaction} alt="" />
                                <span>Transaction</span>
                            </div>
                            <div className={locations.pathname === "/revenue-dashboard" ? "btn-active-dashboard" : "sidebar-item"} onClick={()=> navigate("revenue-dashboard")}>
                                <img src={revenue} alt="" />
                                <span>Revenue</span>
                            </div>
                            <div className={locations.pathname === "\/items-dashboard" ? "btn-active-dashboard" : "sidebar-item"} onClick={()=> navigate("items-dashboard")}>
                                <img src={perform} alt="" />
                                <span>Perform Items</span>
                            </div>
                        </div>

                    </div>

                    <div className="content-dashboard">
                      <Outlet/>                     
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default MainDashboard

