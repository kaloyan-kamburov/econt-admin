import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//icons
import { Icon404 } from "../../../Icons/icons";

//hooks
import usePageError from "../../../hooks/usePageError";

//MUI components
import Button from "@mui/material/Button";

interface Props {}

const PageErrorWrapper = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  background: rgba(227, 227, 227, 0.8);

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
      margin: 0 calc(2 * var(--atom));
    }

    > svg {
      width: 100%;
    }

    .btns-wrapper {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }
`;

const PageError: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { errorMsg, setVisibleError, retryFn } = usePageError();
  return (
    <PageErrorWrapper>
      <div className="content">
        <Icon404 />
        <span>{t("common.errorGettingData")}</span>
        <div className="btns-wrapper">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            onClick={() => {
              setVisibleError(false);
              if (typeof retryFn.execute === "function") {
                retryFn.execute();
              }
            }}
          >
            {t("common.tryAgain")}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="large"
            onClick={() => {
              setVisibleError(false);
            }}
          >
            {t("common.close")}
          </Button>
        </div>
      </div>
    </PageErrorWrapper>
  );
};

export default PageError;
