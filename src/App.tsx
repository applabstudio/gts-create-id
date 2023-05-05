import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import "./styles/App.css";
import CompanyPage from "./pages/CompanyPage";
import { Helmet } from 'react-helmet';
// import BannerBackground from "./components/BannerBackground";

const App: FC = () => {
  return (
    <Router>
      <Helmet>
        <title>Generatore commesse GTS</title>
        <meta name="description" content="Web App per commesse GTS" />
        <meta property="og:title" content="Generatore commesse GTS" />
        <meta property="og:description" content="La descrizione della tua pagina" />
        <meta property="og:image" content="public/images/generatorecommesse.png" />
      </Helmet>
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
