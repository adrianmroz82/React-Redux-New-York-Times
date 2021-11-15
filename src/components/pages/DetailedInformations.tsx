import { useNavigate } from "react-router-dom";
import { Button, Card, CardImg } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { IArticle } from "../../types/app_types";

export const DetailedInformations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article: IArticle = location.state.article;

  const imgUrl = "https://static01.nyt.com/";
  const largeImg = imgUrl + article.multimedia.find((img) => img.subtype === "jumbo")?.url;

  if (article.byline.original === null) {
    article.byline.original = "";
  }

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Card style={{ marginRight: 50, marginLeft: 50 }}>
        <Card.Title style={{ marginTop: 10 }}>Section: {article.section_name}</Card.Title>
        <Card.Text>Published {article.byline.original}</Card.Text>
        <Card.Text style={{ marginRight: 30, marginLeft: 30, marginBottom: 20 }}>
          {article.lead_paragraph}
        </Card.Text>
        <CardImg src={largeImg} alt={article.multimedia[0].type}></CardImg>
        <Button className="mb-3" onClick={handleClick}>
          Go back to all Articles
        </Button>
      </Card>
    </>
  );
};
