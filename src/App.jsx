import "./App.css";
import { Header } from "./components/Header";
import { DetailedInformations } from "./components/pages/DetailedInformations";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Articles } from "./components/Articles";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" exact element={<Articles />} />
          <Route path="/detailed" element={<DetailedInformations />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};
