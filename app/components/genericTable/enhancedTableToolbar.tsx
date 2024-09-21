import DeleteModal from '@/components/modals/deleteModal';
import Tooltip from '@/components/tooltip';
import { EnhancedMode } from '@/products/utils/types';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface EnhancedTableToolbarProps {
  title: string;
  isSelected: boolean;
  mode?: EnhancedMode;
  setMode?: Dispatch<SetStateAction<EnhancedMode>>;
  deleteHandler?: () => void;
  selectedCount: number;
}

export const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  title,
  isSelected,
  deleteHandler,
  setMode,
  selectedCount
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    deleteHandler?.();
  };

  return (
    <div
      className={`flex items-center justify-between p-2 rounded-t-xl ${
        isSelected
          ? 'bg-theme-light-quaternary dark:bg-theme-dark-quaternary'
          : 'bg-theme-light-quaternary dark:bg-theme-dark-background'
      }`}
    >
      <div className="flex-1">
        <h2
          className={`${
            isSelected
              ? 'text-theme-light-primary dark:text-theme-dark-primary'
              : 'text-theme-light-primary dark:text-theme-dark-secondary'
          } text-lg font-medium`}
        >
          {title}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() =>
            setMode?.((prev) =>
              prev === EnhancedMode.Create
                ? EnhancedMode.None
                : EnhancedMode.Create
            )
          }
          className="p-2 rounded-full relative group text-theme-light-primary"
        >
          <Tooltip text="Създаване">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Tooltip>
        </button>
        {isSelected ? (
          <>
            {selectedCount === 1 && (
              <button
                onClick={() =>
                  setMode?.((prev) =>
                    prev === EnhancedMode.Edit
                      ? EnhancedMode.None
                      : EnhancedMode.Edit
                  )
                }
                className="p-2 rounded-full relative group text-theme-light-primary"
              >
                <Tooltip text="Редакция">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Tooltip>
              </button>
            )}
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-full relative group text-theme-light-primary"
            >
              <Tooltip text="Изтриване">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Tooltip>
            </button>
          </>
        ) : (
          <button className="p-2 rounded-full relative group text-theme-light-primary">
            <Tooltip text="Филтър">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </Tooltip>
          </button>
        )}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
