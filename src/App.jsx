import { ArticleDetails } from "./components/pages/ArticleDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Articles } from "./components/Articles";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Articles />} />
          <Route path="article/:id" element={<ArticleDetails />} />
          <Route path="interactive/:id" element={<ArticleDetails />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};
