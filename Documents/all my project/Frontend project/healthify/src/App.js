import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Invoice from "./pages/Finance/Invoice";
import ChangePassword from "./pages/Auth/ChangePassword/ChangePassword";

const App = () => {
  return (
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sidebar" element={<Sidebar/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/change-password" element={<ChangePassword/>} />



          

      </Routes>
    </BrowserRouter>
  );
};

export default App;
