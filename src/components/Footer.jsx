import { useAppSelector } from "../app/hooks";
import { getData } from "../features/articles/articlesSlice";

export const Footer = () => {
  const data = useAppSelector(getData);
  const footer = data.copyright;

  return <footer className="m-4">{footer}</footer>;
};
