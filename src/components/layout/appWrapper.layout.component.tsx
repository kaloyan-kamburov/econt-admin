import React from "react";
import styled from "styled-components";

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
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AppWrapper: React.FC<Props> = ({ children }) => {
  // const auth = useAuth();

  return (
    <OuterContainer>
      {/* {auth.user && auth.role && <TopBar />} */}
      <ContentWrapper>{children}</ContentWrapper>
    </OuterContainer>
  );
};

export default AppWrapper;
