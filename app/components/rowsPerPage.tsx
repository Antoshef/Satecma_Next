interface RowsPerPageProps {
  rowsPerPage: number;
  page: number;
  data: readonly object[];
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
            className="p-0 border-none rounded cursor-pointer text-theme-light-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              id="square-double-alt-arrow-left"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM16.0303 9.53033C16.3232 9.23744 16.3232 8.76256 16.0303 8.46967C15.7374 8.17678 15.2626 8.17678 14.9697 8.46967L11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L14.9697 15.5303C15.2626 15.8232 15.7374 15.8232 16.0303 15.5303C16.3232 15.2374 16.3232 14.7626 16.0303 14.4697L13.5607 12L16.0303 9.53033ZM12.0303 8.46967C12.3232 8.76256 12.3232 9.23744 12.0303 9.53033L9.56066 12L12.0303 14.4697C12.3232 14.7626 12.3232 15.2374 12.0303 15.5303C11.7374 15.8232 11.2626 15.8232 10.9697 15.5303L7.96967 12.5303C7.67678 12.2374 7.67678 11.7626 7.96967 11.4697L10.9697 8.46967C11.2626 8.17678 11.7374 8.17678 12.0303 8.46967Z"
                clipRule="evenodd"
              ></path>
              <defs>
                <linearGradient
                  id="a"
                  x1="12"
                  x2="12"
                  y1="2"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#854D9C"></stop>
                  <stop offset="1" stopColor="#CD4ED3"></stop>
                </linearGradient>
              </defs>
            </svg>
          </button>
        )}
        <button
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 0}
          className="p-0 border-none rounded mr-2 cursor-pointer text-theme-light-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 24 24"
            id="square-alt-arrow-left"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447ZM14.0303 8.46967C14.3232 8.76256 14.3232 9.23744 14.0303 9.53033L11.5607 12L14.0303 14.4697C14.3232 14.7626 14.3232 15.2374 14.0303 15.5303C13.7374 15.8232 13.2626 15.8232 12.9697 15.5303L9.96967 12.5303C9.82902 12.3897 9.75 12.1989 9.75 12C9.75 11.8011 9.82902 11.6103 9.96967 11.4697L12.9697 8.46967C13.2626 8.17678 13.7374 8.17678 14.0303 8.46967Z"
              clipRule="evenodd"
            ></path>
            <defs>
              <linearGradient
                id="a"
                x1="12"
                x2="12"
                y1="2"
                y2="22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#854D9C"></stop>
                <stop offset="1" stopColor="#CD4ED3"></stop>
              </linearGradient>
            </defs>
          </svg>
        </button>
        <span className="self-center text-base text-theme-light-primary dark:text-theme-dark-secondary">
          Страница {page + 1} от {totalPages}
        </span>
        <button
          onClick={() => handleChangePage(null, page + 1)}
          disabled={page >= totalPages - 1}
          className="p-0 border-none rounded cursor-pointer ml-2  text-theme-light-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 24 24"
            id="square-alt-arrow-right"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM9.96967 15.5303C9.67678 15.2374 9.67678 14.7626 9.96967 14.4697L12.4393 12L9.96967 9.53033C9.67678 9.23744 9.67678 8.76256 9.96967 8.46967C10.2626 8.17678 10.7374 8.17678 11.0303 8.46967L14.0303 11.4697C14.171 11.6103 14.25 11.8011 14.25 12C14.25 12.1989 14.171 12.3897 14.0303 12.5303L11.0303 15.5303C10.7374 15.8232 10.2626 15.8232 9.96967 15.5303Z"
              clipRule="evenodd"
            ></path>
            <defs>
              <linearGradient
                id="a"
                x1="12"
                x2="12"
                y1="2"
                y2="22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#854D9C"></stop>
                <stop offset="1" stopColor="#CD4ED3"></stop>
              </linearGradient>
            </defs>
          </svg>
        </button>
        {page < totalPages - 1 && (
          <button
            onClick={() => handleChangePage(null, totalPages - 1)}
            className="p-0 border-none rounded cursor-pointer text-theme-light-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              id="square-double-alt-arrow-right"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12ZM7.96967 9.53033C7.67678 9.23744 7.67678 8.76256 7.96967 8.46967C8.26256 8.17678 8.73744 8.17678 9.03033 8.46967L12.0303 11.4697C12.3232 11.7626 12.3232 12.2374 12.0303 12.5303L9.03033 15.5303C8.73744 15.8232 8.26256 15.8232 7.96967 15.5303C7.67678 15.2374 7.67678 14.7626 7.96967 14.4697L10.4393 12L7.96967 9.53033ZM11.9697 8.46967C11.6768 8.76256 11.6768 9.23744 11.9697 9.53033L14.4393 12L11.9697 14.4697C11.6768 14.7626 11.6768 15.2374 11.9697 15.5303C12.2626 15.8232 12.7374 15.8232 13.0303 15.5303L16.0303 12.5303C16.3232 12.2374 16.3232 11.7626 16.0303 11.4697L13.0303 8.46967C12.7374 8.17678 12.2626 8.17678 11.9697 8.46967Z"
                clipRule="evenodd"
              ></path>
              <defs>
                <linearGradient
                  id="a"
                  x1="12"
                  x2="12"
                  y1="2"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#854D9C"></stop>
                  <stop offset="1" stopColor="#CD4ED3"></stop>
                </linearGradient>
              </defs>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
