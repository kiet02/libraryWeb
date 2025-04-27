import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import SnackbarAlert from "./SnackbarAlert";

// Define type for the alert context
type AlertContextType = {
  showAlert: (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => void;
  hideAlert: () => void;
};

// Create a context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Define the type for children
type AlertProviderProps = {
  children: React.ReactNode; // Add children prop to allow nesting of components
};

// Create the provider component
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const showAlert = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const hideAlert = () => setOpen(false);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children} {/* Render the children components */}
      <SnackbarAlert
        open={open}
        message={message}
        severity={severity}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

// Custom hook to use alert context
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
