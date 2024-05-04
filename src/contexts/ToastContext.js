import { createContext, useState, useContext } from "react";
import SimpleSnackbar from "../components/SnackBar";
export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnack = (message) => {
    setOpen(true);
    setMessage(message);
  };

  const hideSnack = () => {
    setOpen(false);
  };
  return (
    <ToastContext.Provider value={{ showSnack }}>
      <SimpleSnackbar
        showSnack={open}
        handleClose={hideSnack}
        message={message}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
