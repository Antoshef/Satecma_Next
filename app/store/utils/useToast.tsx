import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";

const HIDE_TIMEOUT = 5000;

const useToast = () => {
  // Define the notify function that triggers a toast
  const notify = (
    message: string,
    severity: "success" | "error" | "warning" | "info",
  ) => {
    toast(
      <div className={clsx("p-4 rounded-md", getSeverityStyle(severity))}>
        {message}
      </div>,
      {
        autoClose: HIDE_TIMEOUT,
        hideProgressBar: true,
        position: "top-center",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      },
    );
  };

  // Define styles based on the severity of the message
  const getSeverityStyle = (
    severity: "success" | "error" | "warning" | "info",
  ) => {
    switch (severity) {
      case "success":
        return "text-green-500 bg-grey-500";
      case "error":
        return "text-red-500 bg-grey-500";
      case "warning":
        return "text-yellow-500 bg-light-grey-500";
      case "info":
        return "text-blue-500 bg-grey-500";
      default:
        return "text-gray-500 bg-grey-500";
    }
  };

  // Return ToastContainer to be rendered globally, and the notify function
  const Toast = () => <ToastContainer />;

  return { Toast, notify };
};

export default useToast;
