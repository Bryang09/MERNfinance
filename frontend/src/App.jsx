import { BrowserRouter } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

// components
import Home from "./pages/Home";
import Demo from "./pages/Demo/DemoOverview";
import DemoTransaction from "./pages/Demo/DemoTranactions";
import DemoInvestments from "./pages/Demo/DemoInvestments";
import DemoDebts from "./pages/Demo/DemoDebts";
import Signup from "./pages/Signup";
import AppHome from "./pages/app/AppHome";
import Transactions from "./pages/app/Transactions";
import Investments from "./pages/app/Investments";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/transactions" element={<DemoTransaction />} />
        <Route path="demo/investments" element={<DemoInvestments />} />
        <Route path="demo/debts" element={<DemoDebts />} />

        {/*  */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/overview" element={<AppHome />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/investments" element={<Investments />} />
      </Routes>
    </>
  );
}

export default App;
