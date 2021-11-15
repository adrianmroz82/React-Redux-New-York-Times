import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DisplayRange } from "./DisplayRange";
import { useAppSelector } from "../app/hooks";
import { IArticle } from "../types/app_types";
import { getAllArticles } from "../features/articles/articlesSlice";
import newyorktimeslogo from "../assets/images/newyorktimeslogo.png";

export const Articles = () => {
  const data = useAppSelector(getAllArticles);
  const navigate = useNavigate();

  const showMoreDetails = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, article: IArticle) => {
    navigate("/detailed", {
      state: {
        article,
      },
    });
  };

  return (
    <>
      <DisplayRange />
      {data.length > 0 &&
        data.map((article: IArticle, index: number) => {
          const { pub_date, multimedia, web_url, abstract, headline } = article;
          const date = new Date(pub_date);
          const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          const correctDate = date.toLocaleDateString("en-US", options);
          const imgUrl = "https://static01.nyt.com/";
          const smallImg = imgUrl + multimedia.find((img) => img.subtype === "thumbnail")?.url;

          return (
            <React.Fragment key={index}>
              <Container className="w-75">
                <Row>
                  <Card className="align-items-stretch border-primary mb-3">
                    <Row className="g-0">
                      <Col md={2} className="mx-auto d-block">
                        <img
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = newyorktimeslogo;
                          }}
                          className="mt-1"
                          src={smallImg}
                          alt="article_image"
                        />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Link target="_blank" rel="noreferrer" className="text-dark" href={web_url}>
                            <Card.Title>{headline.main}</Card.Title>
                          </Card.Link>
                          <Card.Text>{abstract}</Card.Text>
                          <Card.Text>
                            <small className="text-muted">Pulishsed on {correctDate}</small>
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col md={2}>
                        <Button
                          onClick={(e) => showMoreDetails(e, article)}
                          variant="primary"
                          className="btn px-3 mt-1 mb-1 btn">
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
    </>
  );
};
