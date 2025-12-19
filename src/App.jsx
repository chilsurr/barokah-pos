import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import MainLayout from './main-layout'
import Home from "./component/home";
import Payment from "./component/payment";
import ItemsSales from "./component/items-sales";
import Pkm from "./component/pkm";
import Stock from "./component/stock";
import ReportSales from "./component/report-sales";
import Login from "./component/login";

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
          <Route path="report-sales/" element={<ReportSales/>}/>
          <Route path="login/" element={<Login/>}/>
        </Route>
      </Routes>
    </Router>
    
  )
}

export default App
