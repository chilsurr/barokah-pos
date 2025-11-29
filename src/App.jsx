import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import MainLayout from './main-layout'
import Home from "./component/home";
import Payment from "./component/payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="payment/" element={<Payment/>}/>
        </Route>
      </Routes>
    </Router>
    
  )
}

export default App
