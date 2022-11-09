import React from "react";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import {
  informationColor,
  informationBgColor,
  successColor,
  successBgColor,
  errorColor,
  errorBgColor,
} from "../../../styles/theme";
import IconError from "@mui/icons-material/Error";
import IconCheckCircle from "@mui/icons-material/CheckCircle";
import IconInfo from "@mui/icons-material/Info";
import IconClose from "@mui/icons-material/Close";

interface Props {}

const Toast: React.FC<Props> = () => (
  <Toaster
    position="bottom-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      duration: 6000,
      style: {
        background: informationBgColor,
        color: informationColor,
        boxShadow: "none",
        borderRadius: 0,
        padding: "3px 5px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: informationColor,
      },
      icon: <IconInfo />,

      success: {
        style: {
          background: successBgColor,
          color: successColor,
          borderColor: successColor,
        },
        icon: <IconCheckCircle />,
      },

      error: {
        style: {
          background: errorBgColor,
          color: errorColor,
          borderColor: errorColor,
        },
        icon: <IconError />,
      },
    }}
  >
    {(t: any) => (
      <ToastBar toast={t}>
        {({ icon, message }) => (
          <>
            {icon}
            {message}
            {t.type !== "loading" && (
              <IconClose
                onClick={() => toast.dismiss(t.id)}
                style={{
                  maxWidth: "15px",
                  cursor: "pointer",
                }}
              />
            )}
          </>
        )}
      </ToastBar>
    )}
  </Toaster>
);

export default Toast;
