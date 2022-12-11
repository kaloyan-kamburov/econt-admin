import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//MUI components
import Button from "@mui/material/Button";

//components
import Logo from "../../../components/common/Logo/Logo.component";

//icons
import { IconSearch, EcontLogo2 } from "../../../Icons/icons";
import flags from "../../../Icons/flags/flags";

//styles
import { bgSections, inputBorder, bgForms, footerBg, dragActive } from "../../../styles/theme";

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
    float: left;
    width: 100%;
    // display: flex;
    flex-wrap: wrap;
    // align-items: flex-start;
    // justify-content: space-between;
    padding-top: calc(6 * var(--atom));
    &:after {
      content: "";
      width: 100%;
      height: 1px;
      display: block;
    }
  }
  .item {
    box-shadow: 0px 2.59488px 7.78464px rgba(0, 0, 0, 0.15);
    transform-origin: center;
    float: left;
    width: 31%;
    margin-right: 2%;
    flex: 1 1 1;
    margin-bottom: 3%;
    padding: calc(2 * var(--atom));
    height: calc(21 * var(--atom));
    &:nth-last-child(3n) {
      margin-righht: 2%;
    }
    &:nth-last-child(-n+3) {
      // margin-bottom :0;
    }
  }

  .item-content {
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
    // padding: 0 calc(4 * var(--atom));
    justify-content: space-between;
    button {
      width: auto;
      padding: 0 calc(4 * var(--atom));
      // margin-right: calc(4 * var(--atom));
    }
  }
`;

// type PublishItem = {
//   id: string | number;
//   published: boolean;
// }

interface Props {
  closeFn: () => void;
  items?: any[];
  publishItem: any;
  publishFn: () => void;
}

const PublishPreview: React.FC<Props> = ({ closeFn, items, publishItem, publishFn }) => {
  const { t, i18n } = useTranslation();
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
          //   ref={contentRef}
        >
          {/* <pre>{JSON.stringify(items, null, 4)}</pre> */}
          {Array.isArray(items) &&
            items
              .filter((item: any) => item.published || item.id === publishItem.id)
              .map((item: any) => (
                <div
                  className="item"
                  key={item.id}
                >
                  <div className="item-content">
                    <img
                      src={item?.image?.path}
                      alt={item?.item?.alt}
                    />
                    <span className="title">{item?.["name:bg"]}</span>
                    <span className="description">{item?.["description:bg"]}</span>
                  </div>
                </div>
              ))}
          {/* <div className="item">
            <div className="item-content">
              <img
                src={publishItem?.image?.path}
                alt={publishItem?.publishItem?.alt}
              />
              <span className="title">{publishItem?.["name:bg"]}</span>
              <span className="description">
                {publishItem?.["description:bg"]}
              </span>
            </div>
          </div> */}
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
            onClick={publishFn}
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

export default PublishPreview;
