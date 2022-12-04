import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Icon404 from "../../Icons/404.icon";

//MUI components
import Button from "@mui/material/Button";

const PageNotFoundWrapper = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(4 * var(--atom));
    max-width: calc(120 * var(--atom));

    span {
      font-size: calc(10.4 * var(--atom));
      line-height: calc(12 * var(--atom));
      margin: calc(4 * var(--atom)) 0;
      font-weight: 300;
      text-align: center;
    }

    button {
      width: auto;
    }
  }

  > svg {
    width: 100%;
  }
`;

interface Props {}

const PageNotFound: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <PageNotFoundWrapper className="page-wrapper">
      <div className="content">
        <Icon404 />
        <span>{t("pages.404.notFoundMessage")}</span>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          onClick={() => navigate("/")}
        >
          {t("pages.404.backToHome")}
        </Button>
      </div>
    </PageNotFoundWrapper>
  );
};

export default PageNotFound;
