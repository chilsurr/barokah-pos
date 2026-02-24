import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import { Layout } from "antd"

import MainLayout from './main-layout'
import MainDashboard from "./main-dashboard";
import Home from "./component/home";
import Payment from "./component/payment";
import ItemsSales from "./component/items-sales";
import Pkm from "./component/pkm";
import Stock from "./component/stock";
import Login from "./login";

import MasterDashboard from "./component-dashboard/master-dashboard";
import HomeDashboard from "./component-dashboard/home-dashboard";
import RevenueDashboard from "./component-dashboard/revenue-dashboard";
import ItemsDashboard from "./component-dashboard/items-dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="payment/" element={<Payment/>}/>
          <Route path="items-sales/" element={<ItemsSales/>}/>
          <Route path="pkm/" element={<Pkm/>}/>
          <Route path="stock/" element={<Stock/>}/>
        </Route>
        <Route path="login/" element={<Login/>}/>
        <Route element={<MainDashboard/>}>
          <Route path="master-dashboard/" element={<MasterDashboard/>}></Route>
          <Route path="home-dashboard/" element={<HomeDashboard/>}/>
          <Route path="revenue-dashboard/" element={<RevenueDashboard/>}/>
          <Route path="items-dashboard/" element={<ItemsDashboard/>}/>
        </Route>
      </Routes>
    </Router>
    
  )
}

export default App
