import { Layout } from "antd"
import income from "../assets/income.png"


function MasterDashboard() {
 return(
    <>
        <Layout  className="master-dashboard-container">
            <section className="data-header">
                <div className="main-data-section">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={income} alt="" />
                        </div>
                        <span>Total Income</span>
                    </div>
                    <div className="data-value">
                        <span>12.000.000</span>
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
                <div className="main-data-section">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={income} alt="" />
                        </div>
                        <span>Total Income</span>
                    </div>
                    <div className="data-value">
                        <span>12.000.000</span>
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
                <div className="main-data-section">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={income} alt="" />
                        </div>
                        <span>Total Income</span>
                    </div>
                    <div className="data-value">
                        <span>12.000.000</span>
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
                <div className="main-data-section">
                    <div className="data-tittle">
                        <div className="border-icon">
                            <img src={income} alt="" />
                        </div>
                        <span>Total Income</span>
                    </div>
                    <div className="data-value">
                        <span>12.000.000</span>
                    </div>
                    <div className="growth-indikator">
                        <span>+17k in last day</span>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </Layout>
    </>
 )   
}

export default MasterDashboard