import Image from 'next/image';
import SquareArrowLeft from '/public/assets/svg/square-alt-arrow-left.svg';
import SquareArrowRight from '/public/assets/svg/square-alt-arrow-right.svg';
import SquareDoubleArrowLeft from '/public/assets/svg/square-double-alt-arrow-left.svg';
import SquareDoubleArrowRight from '/public/assets/svg/square-double-alt-arrow-right.svg';

interface RowsPerPageProps {
  rowsPerPage: number;
  page: number;
  data: object[];
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

export const RowsPerPage = ({
  data,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage
}: RowsPerPageProps) => {
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="flex justify-between items-center p-4 bg-theme-light-background dark:bg-theme-dark-background">
      <div>
        <label className="mr-2 text-base text-theme-light-primary dark:text-theme-dark-primary">
          Брой редове:
        </label>
        <select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          className="border rounded p-1 text-base text-center text-theme-light-primary dark:text-theme-dark-primary bg-theme-light-background dark:bg-theme-dark-background border-theme-light-secondary dark:border-theme-dark-secondary"
          style={{ backgroundImage: 'none' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex align-middle">
        {page > 0 && (
          <button
            onClick={() => handleChangePage(null, 0)}
            className="p-0 border-none rounded cursor-pointer"
          >
            <Image
              src={SquareDoubleArrowLeft}
              alt="first page"
              width={36}
              height={36}
            />
          </button>
        )}
        <button
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 0}
          className="p-0 border-none rounded mr-2 cursor-pointer"
        >
          <Image
            src={SquareArrowLeft}
            alt="previous page"
            width={36}
            height={36}
          />
        </button>
        <span className="self-center text-base text-theme-light-primary dark:text-theme-dark-primary">
          Страница {page + 1} от {totalPages}
        </span>
        <button
          onClick={() => handleChangePage(null, page + 1)}
          disabled={page >= totalPages - 1}
          className="p-0 border-none rounded cursor-pointer ml-2"
        >
          <Image
            src={SquareArrowRight}
            alt="next page"
            width={36}
            height={36}
          />
        </button>
        {page < totalPages - 1 && (
          <button
            onClick={() => handleChangePage(null, totalPages - 1)}
            className="p-0 border-none rounded cursor-pointer"
          >
            <Image
              src={SquareDoubleArrowRight}
              alt="last page"
              width={36}
              height={36}
            />
          </button>
        )}
      </div>
    </div>
  );
};
