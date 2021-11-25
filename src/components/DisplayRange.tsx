import { useAppSelector } from "../app/hooks";

export const DisplayRange = () => {
  const page = useAppSelector((state) => state.articles.page);

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
