import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

//MUI icons
import ChevronRight from "@mui/icons-material/ChevronRight";

//styles
import { linkColor } from "../../../styles/theme"

const BreadcrumbWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: calc(6 * var(--atom));
  height: calc(5 * var(--atom));

  .text {
    margin-right: calc(2.4 * var(--atom));
    backgound: red;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:last-of-type {
      margin: 0;
    }
    &:hover {
      text-decoration: underline;
      color: ${linkColor};
    }
  }

  .separator {
    // display: flex;
    align-items: center;
    margin-right: calc(2.4 * var(--atom));
  }
`;

export type Path = {
  id: number | string;
  name: string;
  type: string;
}

interface Props {
  routePath: Path[];
}

const Breadcrumb: React.FC<Props> = ({ routePath }) => {
  const navigate = useNavigate();
  return (
    <BreadcrumbWrapper>
      {routePath.map((path, i) => (
        <React.Fragment key={i}>
          <div className="text" onClick={() => navigate(`/categories/${path.id}`)}>{path.name}</div>
          {i < routePath.length - 1 && (
            <div className="separator">
              <ChevronRight />
            </div>
          )}
        </React.Fragment>
      ))}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
