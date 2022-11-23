import React from "react";
import styled from "styled-components";

//MUI components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

//icons
import { IconClose } from "../../../Icons/icons";

//theme
import { linkColor } from "../../../styles/theme";

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;

  .icon-delete {
    max-width: calc(18 * var(--atom));
    max-hegiht: calc(21.2 * var(--atom));
  }

  h6 {
    font-size: calc(5.6 * var(--atom));
    line-height: calc(6.8 * var(--atom));
    margin: calc(4 * var(--atom)) 0;
    font-weight: 300;
  }

  span {
    font-size: calc(3.6 * var(--atom));
    line-height: calc(5.2 * var(--atom));

    strong {
      color: ${linkColor};
    }
  }

  .btns-wrapper {
    display: flex;
    margin-top: calc(5 * var(--atom));

    button {
      margin: calc(2 * var(--atom));
      padding: calc(1.6 * var(--atom)) calc(6 * var(--atom));
    }
  }
`;

interface Props {
  title?: string;
  closeFn: () => void;
  children: React.ReactNode;
  small?: boolean;
  large?: boolean;
  xxl?: boolean;
}

const Modal: React.FC<Props> = ({ title = "", closeFn = () => {}, children, small = false, large = false, xxl = false }) => {
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open
      classes={{
        paper: xxl ? "xxl" : large ? "large" : small ? "small" : "big",
      }}
      transitionDuration={0}
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={closeFn}
          sx={{ marginLeft: "auto" }}
        >
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ModalContent>{children}</ModalContent>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
