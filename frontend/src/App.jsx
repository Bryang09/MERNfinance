import { BrowserRouter } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

// components
import Home from "./pages/Home";
import Demo from "./pages/Demo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
