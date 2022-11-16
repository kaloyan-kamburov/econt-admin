import React from "react";
import { useIsFetching, useIsMutating } from "react-query";
import styled from "styled-components";

//MUI components
import CircularProgress from "@mui/material/CircularProgress";

const LoaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.85);
  z-index: 9998;

  &.in-modal {
    position: absolute;
  }
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  transform: translate(-50%, -50%);
  span {
    top: 50%;
    left: 50%;
    margin: -25px;
  }
  &.big {
    span {
      margin-top: -50px;
    }
  }
`;

interface Props {
  showExplicit?: boolean;
  inModal?: boolean;
  big?: boolean;
}

const Loader: React.FC<Props> = ({ showExplicit, big = false, inModal = false }) => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return showExplicit || isFetching || isMutating ? (
    <LoaderWrapper className={inModal ? "in-modal" : ""}>
      <InnerWrapper className={big ? "big" : ""}>
        <CircularProgress size={big ? 100 : 50} />
      </InnerWrapper>
    </LoaderWrapper>
  ) : null;
};

export default Loader;
