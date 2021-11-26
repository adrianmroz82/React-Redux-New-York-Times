import { useAppSelector } from "../app/hooks";
import { getCopyright } from "../features/articles/articlesSlice";

export const Footer = () => {
  const copyright = useAppSelector(getCopyright);

  return (
    <>
      <footer className="m-4">{copyright}</footer>
    </>
  );
};
