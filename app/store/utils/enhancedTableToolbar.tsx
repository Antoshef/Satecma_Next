import PencilIcon from '/public/assets/svg/pencil.svg';
import TrashIcon from '/public/assets/svg/trash.svg';
import FilterIcon from '/public/assets/svg/filterHorizontal.svg';
import { FC, useState } from 'react';
import Image from 'next/image';
import Tooltip from '@/components/tooltip';
import DeleteModal from '@/components/modals/deleteModal';

interface EnhancedTableToolbarProps {
  title: string;
  isSelected: boolean;
  onEdit?: (edit: boolean) => void;
  onDelete?: () => void;
  selectedCount: number; // New prop to track the number of selected items
}

export const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  title,
  isSelected,
  onEdit,
  onDelete,
  selectedCount // Destructure the new prop
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
    onDelete?.();
  };

  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected
          ? 'bg-theme-light-quaternary dark:bg-theme-dark-quaternary'
          : 'bg-theme-light-background dark:bg-theme-dark-background'
      }`}
    >
      <div className="flex-1">
        <h2
          className={`${
            isSelected
              ? 'text-theme-light-primary dark:text-theme-dark-primary'
              : 'text-theme-light-secondary dark:text-theme-dark-secondary'
          } text-lg font-medium`}
        >
          {title}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        {isSelected ? (
          <>
            {selectedCount === 1 && (
              <button
                onClick={() => onEdit?.(true)}
                className="p-2 rounded-full hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary relative group"
              >
                <Tooltip text="Редакция">
                  <Image src={PencilIcon} alt="Редакция" />
                </Tooltip>
              </button>
            )}
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-full hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary relative group"
            >
              <Tooltip text="Изтриване">
                <Image src={TrashIcon} alt="Изтриване" />
              </Tooltip>
            </button>
          </>
        ) : (
          <button className="p-2 rounded-full hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary relative group">
            <Tooltip text="Филтър">
              <Image src={FilterIcon} alt="Филтър" />
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
