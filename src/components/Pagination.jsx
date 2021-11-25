import { useState, useEffect } from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import { fetchPosts } from "../features/articles/articlesSlice";
import { useAppDispatch } from "../app/hooks";
import "../App.css";

export const Pagination = ({ page }) => {
  const dispatch = useAppDispatch();

  const handlePreviousPage = () => {
    setCurrentButton((previousBtn) => (previousBtn <= 1 ? previousBtn : previousBtn - 1));
  };

  const handleNextPage = () => {
    setCurrentButton((previousBtn) => (previousBtn >= numberOfPages.length ? previousBtn : previousBtn + 1));
  };

  const numberOfPages = [];
  for (let i = 1; i <= 10; i++) {
    numberOfPages.push(i);
  }

  const [currentBtn, setCurrentButton] = useState(page);
  const [arrOfVisibleButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let currentPages = [arrOfVisibleButtons];
    let dots = "...";

    if (numberOfPages.length < 6) {
      currentPages = numberOfPages;
    } else if (currentBtn >= 1 && currentBtn <= 3) {
      currentPages = [1, 2, 3, 4, dots, numberOfPages.length];
    } else if (currentBtn === 4) {
      const startItems = numberOfPages.slice(0, 5);
      currentPages = [...startItems, dots, numberOfPages.length];
    } else if (currentBtn > 4 && currentBtn < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentBtn - 2, currentBtn);
      const sliced2 = numberOfPages.slice(currentBtn, currentBtn + 1);
      currentPages = [1, dots, ...sliced1, ...sliced2, dots, numberOfPages.length];
    } else if (currentBtn > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      currentPages = [1, dots, ...sliced];
    }

    setArrOfCurrButtons(currentPages);
    dispatch(fetchPosts(currentBtn));
  }, [currentBtn]);

  return (
    <BootstrapPagination>
      <BootstrapPagination.First
        className={currentBtn === 1 && "disabled"}
        onClick={handlePreviousPage}></BootstrapPagination.First>
      {arrOfVisibleButtons.map((item, index) => {
        if (typeof item !== "string") {
          return (
            <BootstrapPagination.Item
              key={index}
              className={currentBtn === item && "active"}
              onClick={() => setCurrentButton(item)}>
              {item}
            </BootstrapPagination.Item>
          );
        } else {
          return <BootstrapPagination.Ellipsis key={index} disabled />;
        }
      })}
      <BootstrapPagination.Last
        href="#"
        className={currentBtn === numberOfPages.length && "disabled"}
        onClick={handleNextPage}></BootstrapPagination.Last>
    </BootstrapPagination>
  );
};
