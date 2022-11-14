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
