import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";

//custom components
import Item from "./Item.component";

//icons
import iconPlus from "../../../Icons/plus.svg";

//hooks
import useAuth from "../../../hooks/useAuth";

//theme
import {
  bgSections,
  btnContainedPrimaryBgColor,
  linkColor,
} from "../../../styles/theme";

const ItemAdd = styled.div`
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

    &:focus + .sub-menu {
      display: flex;
    }
  }

  .sub-menu {
    display: none;
    position: absolute;
    top: 35px;
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

const PageBegin: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item lg={3} md={4} xs={12}>
        <Item isAdd />
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
        <Item />
      </Grid>
    </Grid>
  );
};

export default PageBegin;
