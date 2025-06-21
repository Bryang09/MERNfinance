import { BrowserRouter } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

// components
import Home from "./pages/Home";
import Demo from "./pages/Demo/DemoOverview";
import DemoTransaction from "./pages/Demo/DemoTranactions";
import DemoInvestments from "./pages/Demo/DemoInvestments";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/transactions" element={<DemoTransaction />} />
        <Route path="demo/investments" element={<DemoInvestments />} />
      </Routes>
    </>
  );
}

export default App;
