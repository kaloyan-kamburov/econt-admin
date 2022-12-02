import React, { useEffect } from "react";
import styled from "styled-components";

//components
import Header from "../common/Header/Header.component";
import Sidebar from "../common/Sidebar/Sidebar.component";

//hooks
import useAuth from "../../hooks/useAuth";

interface Props {
  children: JSX.Element;
}

const OuterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  flex: 1;
  display: flex;
  position: relative;
`;

const InnerContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  flex: 1;
  padding: 20px;
  .page-wrapper {
    .grabbable,
    .btn-add {
      max-width: 30.3%;
      min-width: 30.3%;
      margin: 1.5%;
    }
    &.xxl {
      .grabbable,
      .btn-add {
        max-width: 18%;
        min-width: 18%;
        margin: 1%;
      }
      @media (max-width: 1560px) {
        .grabbable,
        .btn-add {
          max-width: 23%;
          min-width: 23%;
          margin: 1%;
        }
      }
      @media (max-width: 1280px) {
        .grabbable,
        .btn-add {
          max-width: 30.3%;
          min-width: 30.3%;
          margin: 1.5%;
        }
      }
      @media (max-width: 991px) {
        .grabbable,
        .btn-add {
          max-width: 48%;
          min-width: 48%;
          margin: 1%;
        }
      }
      @media (max-width: 768px) {
        .grabbable,
        .btn-add {
          max-width: 100%;
          min-width: 100%;
          margin: 0 0 3% 0;
        }
      }
    }
    @media (max-width: 991px) {
      .grabbable,
      .btn-add {
        max-width: 48%;
        min-width: 48%;
        margin: 1%;
      }
    }
    @media (max-width: 768px) {
      .grabbable,
      .btn-add {
        max-width: 100%;
        min-width: 100%;
        margin: 0 0 3% 0;
      }
    }
  }
`;

const AppWrapper: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  return (
    <OuterContainer>
      <ContentWrapper>
        {user && <Sidebar />}
        <InnerContentWrapper>
          {user && <Header />}
          <PageWrapper>{children}</PageWrapper>
        </InnerContentWrapper>
      </ContentWrapper>
    </OuterContainer>
  );
};

export default AppWrapper;
