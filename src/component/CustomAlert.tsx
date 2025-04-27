import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type CustomAlertProps = {
  open: boolean; // Quản lý trạng thái hiển thị
  severity: "success" | "error" | "info" | "warning"; // Mức độ thông báo
  message: string; // Nội dung thông báo
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  open,
  severity,
  message,
}) => {
  const [showAlert, setShowAlert] = useState(open);

  // Sử dụng useEffect để ẩn alert sau 2 giây
  useEffect(() => {
    if (open) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false); // Ẩn alert sau 2 giây
      }, 2000);
      return () => clearTimeout(timer); // Dọn dẹp khi component unmount hoặc alert bị tắt
    }
  }, [open]);

  return (
    <Snackbar
      open={showAlert} // Điều khiển việc hiển thị Snackbar
      autoHideDuration={2000} // Ẩn sau 2 giây
      onClose={() => setShowAlert(false)} // Khi đóng, ẩn Snackbar
    >
      <Alert onClose={() => setShowAlert(false)} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
