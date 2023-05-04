import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import "./styles/App.css";

const App: FC = () => {
  return (
    <Router>
      <Header title="" />
      <Routes>
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
