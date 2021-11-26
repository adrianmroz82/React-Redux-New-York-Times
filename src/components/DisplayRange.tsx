import { useAppSelector } from "../app/hooks";
import { getPage } from "../features/articles/articlesSlice";

export const DisplayRange = () => {
  const page = useAppSelector(getPage);

  let firstItem = 10 * (page - 1) + 1;
  let lastItem = page * 10;

  return (
    <>
      <h5 className="mb-3">
        Displaying articles {firstItem} - {lastItem} of 100
      </h5>
    </>
  );
};
