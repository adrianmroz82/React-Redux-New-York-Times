import React, { useCallback, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { IArticle } from "../types/app_types";
import { fetchPosts, getAllArticles, getPage } from "../features/articles/articlesSlice";
import { Header } from "./Header";
import { Pagination } from "./Pagination";
import newyorktimeslogo from "../assets/images/newyorktimeslogo.png";
import { useDispatch } from "react-redux";

export const Articles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useAppSelector(getAllArticles);
  const page = useAppSelector(getPage);

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, []);

  const showMoreDetails = (article: IArticle, _id: string) => {
    let id = _id.replaceAll(/nyt:\/\//g, "");
    navigate(id, {
      state: {
        article,
      },
    });
  };

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).onerror = null;
    (e.target as HTMLImageElement).src = newyorktimeslogo;
  }, []);

  const handleShowMore = useCallback((article, _id) => () => showMoreDetails(article, _id), []);

  return (
    <>
      <Header />
      {data.length > 0 &&
        data.map((article: IArticle, index: number) => {
          const { pub_date, multimedia, web_url, abstract, headline, _id } = article;
          const date = new Date(pub_date);
          const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          const correctDate = date.toLocaleDateString("en-US", options);
          const smallImg =
            "https://static01.nyt.com/" + multimedia.find((img) => img.subtype === "thumbnail")?.url;

          return (
            <React.Fragment key={index}>
              <Container className="w-75">
                <Row>
                  <Card className="align-items-stretch border-primary mb-3">
                    <Row className="g-0">
                      <Col md={2} className="mx-auto d-block">
                        <img onError={handleError} className="mt-1" src={smallImg} alt="article_image" />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Link target="_blank" rel="noreferrer" className="text-dark" href={web_url}>
                            <Card.Title>{headline.main}</Card.Title>
                          </Card.Link>
                          <Card.Text>{abstract}</Card.Text>
                          <Card.Text>
                            <small className="text-muted">Published on {correctDate}</small>
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col md={2}>
                        <Button onClick={handleShowMore(article, _id)} variant="primary" className="x-3 my-1">
                          See more
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Row>
              </Container>
            </React.Fragment>
          );
        })}
      <Pagination page={page} />
    </>
  );
};
