import { EnhancedMode } from '@/products/utils/types';
import { Dispatch, SetStateAction } from 'react';

export const GenericFormActions = (
  submitHandler: () => void,
  setMode: Dispatch<SetStateAction<EnhancedMode>>
) => (
  <div className="col-span-2 flex justify-end space-x-4">
    <button
      onClick={() => setMode(EnhancedMode.None)}
      className="px-4 py-2 bg-theme-light-secondary dark:bg-theme-dark-secondary text-white rounded-md shadow-sm hover:bg-theme-light-tertiary dark:hover:bg-theme-dark-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-secondary dark:focus:ring-theme-dark-secondary"
    >
      Откажи
    </button>
    <button
      onClick={submitHandler}
      className="px-4 py-2 bg-theme-light-primary dark:bg-theme-dark-primary text-white rounded-md shadow-sm hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-primary dark:focus:ring-theme-dark-primary"
    >
      Запиши
    </button>
  </div>
);
