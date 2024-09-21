import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';
import { ToastSeverity } from './types';

const HIDE_TIMEOUT = 5000;

const useToast = () => {
  // Define the notify function that triggers a toast
  const notify = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) =>
    toast(
      <div
        className={clsx(
          'rounded-md p-4 text-center',
          getSeverityStyle(severity)
        )}
      >
        {message}
      </div>,
      {
        autoClose: HIDE_TIMEOUT,
        hideProgressBar: true,
        position: 'top-center',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );

  // Define styles based on the severity of the message
  const getSeverityStyle = (severity: ToastSeverity) => {
    switch (severity) {
      case 'success':
        return 'text-theme-light-white bg-theme-light-primary';
      case 'error':
        return 'text-theme-light-primary bg-theme-light-danger';
      case 'warning':
        return 'text-theme-light-primary bg-theme-light-quaternary';
      case 'info':
        return 'text-theme-light-white bg-theme-light-secondary';
      default:
        return 'text-theme-light-white bg-theme-light-primary';
    }
  };

  // Return ToastContainer to be rendered globally, and the notify function
  return { ToastContainer, notify };
};

export default useToast;
