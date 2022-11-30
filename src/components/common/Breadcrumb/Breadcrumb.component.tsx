import React from "react";
import styled from "styled-components";

//MUI icons
import ChevronRight from "@mui/icons-material/ChevronRight";

const BreadcrumbWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: calc(2 * var(--atom));
  height: calc(5 * var(--atom));

  .text {
    margin-right: calc(2.4 * var(--atom));
    backgound: red;
    display: flex;
    align-items: center;
    &:last-of-type {
      margin: 0;
    }
  }

  .separator {
    // display: flex;
    align-items: center;
    margin-right: calc(2.4 * var(--atom));
  }
`;

interface Props {
  routePath: string[];
}

const Breadcrumb: React.FC<Props> = ({ routePath }) => {
  return (
    <BreadcrumbWrapper>
      {routePath.map((path, i) => (
        <>
          <div className="text">{path}</div>
          {i < routePath.length - 1 && (
            <div className="separator">
              <ChevronRight />
            </div>
          )}
        </>
      ))}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
