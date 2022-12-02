import React, { useCallback, useState, useEffect, useLayoutEffect, createRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//MUI components
import Button from "@mui/material/Button";

//components
import Logo from "../../../components/common/Logo/Logo.component";

//icons
import iconMap from "../../../Icons/map.svg";
import flags from "../../../Icons/flags/flags";
import IconSearch from "../../../Icons/search.icon";
import EcontLogo2 from "../../../Icons/econt-logo2";

//hooks
import { useWindowSize } from "../../../hooks/hooks";

//styles
import { dragActive } from "../../../styles/theme";
// import "../../../grid.css";

import { bgSections, inputBorder, bgForms, footerBg } from "../../../styles/theme";

const PreviewWrapper = styled.div`
  width: 100%;
  max-width: calc(147 * var(--atom));
  margin-bottom: calc(4 * var(--atom));
  .top-bar {
    width: 100%;
    height: calc(8.4 * var(--atom));
    background: ${bgSections};
    box-shadow: 0px 2.59488px 7.78464px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 calc(2.4 * var(--atom));

    .logo-wrapper {
      width: calc(20 * var(--atom));

      svg {
        width: 100%;
      }
    }

    .right-content-wrapper {
      display: flex;
      .search-field {
        width: calc(38 * var(--atom));
        height: calc(6.4 * var(--atom));
        border: 1px solid ${inputBorder};
        border-radius: calc(0.8 * var(--atom));
        padding: 0 calc(2 * var(--atom));
        display: flex;
        align-items: center;
        span {
          font-size: calc(2 * var(--atom));
          font-style: italic;
          margin-left: var(--atom);
        }
      }

      .lang-field {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: var(--atom);

        .lang {
          width: calc(7.4 * var(--atom));
          height: calc(5.1 * var(--atom));
          display: flex;
          align-items: center;
          border: 2px solid ${bgForms};
          justify-content: center;
          border-radius: 3px;

          svg {
            max-width: 100%;
            max-height: 100%;
          }

          &.active {
            background: ${dragActive};
          }
        }
      }
    }
  }
  .content {
    padding: calc(2.6 * var(--atom));
    background: ${bgSections};
  }
  .category {
    box-shadow: 0px 2.59488px 7.78464px rgba(0, 0, 0, 0.15);
    transform-origin: center;
    cursor: grab;

    &:active {
      cursor: grabbing;
      background: ${dragActive};
    }
  }

  .category-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    img {
      max-width: 40%;
      height: 40%;
    }

    .title {
      font-size: calc(2.5 * var(--atom));
      line-height: calc(3.5 * var(--atom));
    }

    .description {
      font-size: calc(2 * var(--atom));
      line-height: calc(3 * var(--atom));
    }
  }

  footer {
    width: 100%;
    height: calc(6.4 * var(--atom));
    background: ${footerBg};
    padding 0 calc(2.4 * var(--atom));
    display: flex;
    align-items: center;
    span {
      font-size: calc(2.4 * var(--atom));
      margin-left: calc(2 * var(--atom));
    }
  }
`;

const BtnsWrapper = styled.div`
  width: 100%;
  background: ${bgForms};
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(12.8 * var(--atom));
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 1;
  .content {
    display: flex;
    width: 100%;
    padding: 0 calc(4 * var(--atom));
    justify-content: flex-start;
    button {
      width: auto;
      padding: 0 calc(4 * var(--atom));
      margin-right: calc(4 * var(--atom));
    }
  }
`;

interface Props {
  closeFn: () => void;
}

const GroupDelete: React.FC<Props> = ({ closeFn }) => {
  const [width, setWidth] = useState<number>(100);
  const [rowHeight, setRowHeight] = useState<number>(180);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const contentRef: any = createRef();

  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (contentRef.current && windowWidth && windowHeight) {
      setWidth(contentRef.current.offsetWidth - 25);
      setRowHeight(Math.round((contentRef.current.offsetWidth * 0.85) / 3) - 25);
    }
  }, [contentRef?.current?.offsetWidth, windowWidth, windowHeight]);

  return (
    <>
      <PreviewWrapper>
        <div className="top-bar">
          <div className="logo-wrapper">
            <Logo />
          </div>
          <div className="right-content-wrapper">
            <div className="search-field">
              <IconSearch />
              <span>{t("form.labels.search")}</span>
            </div>
            <div className="lang-field">
              <div className={`lang${i18n.language === "bg" ? " active" : ""}`}>
                <flags.bg />
              </div>
              <div className={`lang${i18n.language === "en" ? " active" : ""}`}>
                <flags.en />
              </div>
            </div>
          </div>
        </div>
        <div
          className="content"
          ref={contentRef}
        >
          <div
            key="a"
            className="category"
          >
            <div className="category-content">
              <img
                alt="Icon map"
                src={iconMap}
              />
              <span className="title">
                Услуги от България
                <br />
                (Непубликуван)
              </span>
              <span className="description">Lorem ipsum dolor sit amet</span>
            </div>
          </div>
          <div
            key="b"
            className="category"
          >
            <div className="category-content">
              <img
                alt="Icon map"
                src={iconMap}
              />
              <span className="title">
                Услуги от България
                <br />
                (Непубликуван)
              </span>
              <span className="description">Lorem ipsum dolor sit amet</span>
            </div>
          </div>
          <div
            key="c"
            className="category"
          >
            <div className="category-content">
              <img
                alt="Icon map"
                src={iconMap}
              />
              <span className="title">
                Услуги от България
                <br />
                (Непубликуван)
              </span>
              <span className="description">Lorem ipsum dolor sit amet</span>
            </div>
          </div>
          <div
            key="d"
            className="category"
          >
            <div className="category-content">
              <img
                alt="Icon map"
                src={iconMap}
              />
              <span className="title">
                Услуги от България
                <br />
                (Непубликуван)
              </span>
              <span className="description">Lorem ipsum dolor sit amet</span>
            </div>
          </div>
        </div>
        <footer>
          <EcontLogo2 />
          <span>{t("common.copyright")}</span>
        </footer>
      </PreviewWrapper>
      <BtnsWrapper>
        <div className="content">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            onClick={() => {}}
          >
            {t("common.changeAndPublish")}
          </Button>
          <Button
            variant="text"
            color="primary"
            size="large"
            onClick={closeFn}
          >
            {t("common.cancel")}
          </Button>
        </div>
      </BtnsWrapper>
    </>
  );
};

export default GroupDelete;
