import { FC, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/UI/Header";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import "./styles/App.css";
import CompanyPage from "./pages/CompanyPage";
import { Helmet } from 'react-helmet';
import BottomTabBar from "./components/UI/BottomTabBar";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

const App: FC = () => {
  return (
    <Router>
      <Helmet>
        <title>Generatore commesse GTS</title>
        <meta name="description" content="Web App per commesse GTS" />
        <meta property="og:title" content="Generatore commesse GTS" />
        <meta property="og:description" content="La descrizione della tua pagina" />
      </Helmet>
      <Header title="" />
      <ScrollToTop />
      <Routes>
        <Route path="/commesse" element={<HistoryPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/code-customer" element={<CompanyPage />} />
      </Routes>
      <BottomTabBar/>
    </Router>
  );
};

export default App;
