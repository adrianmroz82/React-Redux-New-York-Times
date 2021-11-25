import "./App.css";
import { Header } from "./components/Header";
import { ArticleDetails } from "./components/pages/ArticleDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Articles } from "./components/Articles";
import { Pagination } from "./components/Pagination";
import { useAppSelector } from "./app/hooks";

export const App = () => {
  const page = useAppSelector((state) => state.articles.page);

  return (
    <div className="App">
      <Header path="/" />
      <Router>
        <Routes>
          <Route path="/" exact element={<Articles />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
        </Routes>
      </Router>
      <Pagination page={page} />
      <Footer />
    </div>
  );
};
