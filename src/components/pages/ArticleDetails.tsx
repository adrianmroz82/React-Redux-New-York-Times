import { useNavigate } from "react-router-dom";
import { Button, Card, CardImg } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { IArticle } from "../../types/app_types";
import { useCallback } from "react";

export const ArticleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article: IArticle = location.state.article;

  const largeImg =
    "https://static01.nyt.com/" + article.multimedia.find((img) => img.subtype === "jumbo")?.url;

  if (article.byline.original === null) {
    article.byline.original = "";
  }

  const handleClick = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <Card className="mx-5 mt-3">
      <Card.Title className="mt-3">Section: {article.section_name}</Card.Title>
      <Card.Text>Published {article.byline.original}</Card.Text>
      <Card.Text className="mx-3 mb-3">{article.lead_paragraph}</Card.Text>
      <CardImg src={largeImg} alt={article.multimedia[0].type}></CardImg>
      <Button className="mb-3 mt-3" onClick={handleClick}>
        Go back to all Articles
      </Button>
    </Card>
  );
};
