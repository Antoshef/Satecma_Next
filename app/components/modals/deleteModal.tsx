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
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/3">
        <div className="bg-gray-900 p-4">
          <h2 className="text-white text-lg font-semibold">
            Потвърдете изтриването
          </h2>
        </div>
        <div className="p-4">
          <p>Сигурни ли сте, че искате да изтриете този елемент?</p>
        </div>
        <div className="flex justify-end p-4 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Отказ
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Изтрий
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
