import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

//components
import Logo from "../Logo/Logo.component";

import { bgHeaders } from "../../../styles/theme";

const SidebarWrapper = styled.aside`
  width: calc(47.4 * var(--atom));
  min-height: 100vh;
  background: ${bgHeaders};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  padding: calc(3.4 * var(--atom)) calc(6.4 * var(--atom));

  > a svg {
    max-width: calc(30.8 * var(--atom));
    max-height: calc(6.4 * var(--atom));
  }
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
