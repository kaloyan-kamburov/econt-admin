import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

//components
import Logo from "../Logo/Logo.component";

import { bgHeaders } from "../../../styles/theme";

const SidebarWrapper = styled.aside`
  width: 237px;
  min-height: 100vh;
  background: ${bgHeaders};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  padding: 17px 32px;
`;

const Sidebar: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <SidebarWrapper>
      <Link to="/home">
        <Logo />
      </Link>
    </SidebarWrapper>
  );
};

export default Sidebar;
