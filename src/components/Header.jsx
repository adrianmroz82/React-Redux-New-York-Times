import "../App.css";
import { DisplayRange } from "./DisplayRange";

export const Header = () => {
  return (
    <>
      <header className="m-2 pb-2 pt-2 fs-1 page-title">The New York Times</header>
      <DisplayRange />
    </>
  );
};
