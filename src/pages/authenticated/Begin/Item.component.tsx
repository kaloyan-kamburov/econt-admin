import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//icons
import iconMap from "../../../Icons/map.svg";
import iconPlus from "../../../Icons/plus.svg";

//MUI component
import Button from "@mui/material/Button";

//theme
import {
  bgSections,
  btnContainedPrimaryBgColor,
  linkColor,
} from "../../../styles/theme";

const ItemElement = styled.div`
  background: ${bgSections};
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  min-height: 258px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &.btn-add {
    background: transparent;
    border: 1px dashed ${btnContainedPrimaryBgColor};
    box-shadow: none;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 300;

    img {
      margin-bottom: 8px;
      max-width: 140px;
    }

    .title {
      font-size: 24px;
      line-height: 32px;
    }

    .description {
      font-size: 18px;
      line-height: 26px;
    }
  }

  .text-add {
    color: ${linkColor};
    font-weight: 600;
  }

  .btn-menu {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    img {
      margin: 0 !important;
    }

    &.active {
      path {
        fill: ${linkColor};
      }
    }
  }

  .sub-menu {
    display: flex;
    position: absolute;
    top: 40px;
    right: 10px;
    background: ${bgSections};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    flex-direction: column;

    button {
      font-size: 20px;
      line-height: 27px;
      padding: 0 15px;
    }
  }
`;

interface Props {
  isAdd?: boolean;
}

const Item: React.FC<Props> = ({ isAdd = false }) => {
  const { t } = useTranslation();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  return (
    <ItemElement className={isAdd ? "btn-add" : ""}>
      <div className="content">
        {isAdd ? (
          <>
            <img alt="Icon plus" src={iconPlus} />
            <span className="text-add">{t("pages.home.add")}</span>
          </>
        ) : (
          <>
            <img alt="Icon map" src={iconMap} />
            <span className="title">
              Услуги от България
              <br />
              (Непубликуван)
            </span>
            <span className="description">Lorem ipsum dolor sit amet</span>

            <button
              className={`btn-menu${menuOpened ? " active" : ""}`}
              onClick={() => setMenuOpened(!menuOpened)}
            >
              <svg
                width="16"
                height="4"
                viewBox="0 0 16 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C12 1.46957 12.2107 0.96086 12.5858 0.585787C12.9609 0.210714 13.4696 0 14 0C14.5304 0 15.0391 0.210714 15.4142 0.585787C15.7893 0.96086 16 1.46957 16 2C16 2.53043 15.7893 3.03914 15.4142 3.41421C15.0391 3.78929 14.5304 4 14 4C13.4696 4 12.9609 3.78929 12.5858 3.41421C12.2107 3.03914 12 2.53043 12 2ZM6 2C6 1.46957 6.21071 0.96086 6.58579 0.585787C6.96086 0.210714 7.46957 0 8 0C8.53043 0 9.03914 0.210714 9.41421 0.585787C9.78929 0.96086 10 1.46957 10 2C10 2.53043 9.78929 3.03914 9.41421 3.41421C9.03914 3.78929 8.53043 4 8 4C7.46957 4 6.96086 3.78929 6.58579 3.41421C6.21071 3.03914 6 2.53043 6 2ZM0 2C0 1.46957 0.210714 0.96086 0.585786 0.585787C0.960859 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.96086 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.960859 3.78929 0.585786 3.41421C0.210714 3.03914 0 2.53043 0 2Z"
                  fill="#212121"
                />
              </svg>
            </button>
            {menuOpened && (
              <div className="sub-menu">
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{ borderRadius: 0 }}
                  onClick={() => console.log("dsa")}
                >
                  {t("common.change")}
                </Button>
                <Button
                  variant="text"
                  color="error"
                  size="small"
                  sx={{ borderRadius: 0 }}
                  onClick={() => console.log("dsa")}
                >
                  {t("common.delete")}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </ItemElement>
  );
};

export default Item;
