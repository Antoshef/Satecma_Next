import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { ToastMessage } from "./types";

const HIDE_TIMEOUT = 5000;

const useToast = () => {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
      }, HIDE_TIMEOUT);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const Toast = () => (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!message}
      autoHideDuration={HIDE_TIMEOUT}
    >
      <Alert
        severity={message?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message?.text}
      </Alert>
    </Snackbar>
  );

  return { Toast, setMessage };
};

export default useToast;
