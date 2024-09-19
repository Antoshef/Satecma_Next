import { FC } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-theme-light-white dark:bg-theme-dark-background rounded-lg overflow-hidden shadow-lg w-1/3">
        <div className="bg-theme-light-primary dark:bg-theme-dark-primary p-4">
          <h2 className="text-theme-light-white dark:text-theme-dark-primary text-lg font-semibold">
            Потвърдете изтриването
          </h2>
        </div>
        <div className="p-4">
          <p className="text-theme-light-primary dark:text-theme-dark-primary">
            Сигурни ли сте, че искате да изтриете този елемент?
          </p>
        </div>
        <div className="flex justify-end p-4 space-x-2">
          <button
            onClick={onClose}
            className="bg-theme-light-secondary dark:bg-theme-dark-secondary hover:bg-theme-light-tertiary dark:hover:bg-theme-dark-tertiary text-theme-light-primary dark:text-theme-dark-primary font-semibold py-2 px-4 rounded"
          >
            Отказ
          </button>
          <button
            onClick={onConfirm}
            className="bg-theme-light-danger hover:bg-theme-light-quaternary text-theme-light-primary font-semibold py-2 px-4 rounded"
          >
            Изтрий
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
