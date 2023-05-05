import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import "./styles/App.css";
import CompanyPage from "./pages/CompanyPage";
// import BannerBackground from "./components/BannerBackground";

const App: FC = () => {
  return (
    <Router>
      <Header title="" />
      {/* <BannerBackground/> */}
      <Routes>
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/code-customer" element={<CompanyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
