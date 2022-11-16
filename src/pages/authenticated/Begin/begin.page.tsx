import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//custom components
import Item from "./Item.component";
import AddCategory from "./AddCategory.component";
import Modal from "../../../components/common/Modal/Modal.component";
import Loader from "../../../components/common/Loader/Loader.component";

//icons
import iconTrash from "../../../Icons/trash.svg";

//hooks
import useAuth from "../../../hooks/useAuth";

//theme
import { bgSections, btnContainedPrimaryBgColor, linkColor } from "../../../styles/theme";

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
  const { t, i18n } = useTranslation();
  const [modalCreateCategory, setModalCreateCategory] = useState<boolean>(false);
  const [modalDeleteCategory, setModalDeleteCategory] = useState<boolean>(false);
  const [categoryForDelete, setCategoryForDelete] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xl={3}
          lg={4}
          md={6}
          xs={12}
        >
          <Item
            isAdd
            addItem={() => setModalCreateCategory(true)}
          />
        </Grid>
        <Grid
          item
          xl={3}
          lg={4}
          md={6}
          xs={12}
        >
          <Item
            editItem={() => setModalCreateCategory(true)}
            deleteItem={() => {
              setModalDeleteCategory(true);
              setCategoryForDelete("Услуги от България");
            }}
          />
        </Grid>
      </Grid>

      {modalCreateCategory && (
        <Modal
          title={t("pages.home.addCategory")}
          closeFn={() => setModalCreateCategory(false)}
        >
          <>
            <AddCategory />
            {/* <Loader showExplicit inModal /> */}
          </>
        </Modal>
      )}
      {modalDeleteCategory && (
        <Modal closeFn={() => setModalDeleteCategory(false)}>
          <>
            <img
              className="icon-delete"
              src={iconTrash}
              alt="delete"
            />
            <h6>{t("pages.home.deleteCategory")}</h6>
            <span>
              <Trans
                i18nKey="pages.home.deleteCategoryQuestion"
                tOptions={{ category: categoryForDelete }}
              >
                <strong />
              </Trans>
            </span>
            <div className="btns-wrapper">
              <Button
                variant="contained"
                color="error"
                type="submit"
                size="large"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setModalDeleteCategory(false);
                  }, 1000);
                }}
              >
                {t("common.delete")}
              </Button>
              <Button
                variant="contained"
                color="info"
                type="submit"
                size="large"
                onClick={() => setModalDeleteCategory(false)}
              >
                {t("common.cancel")}
              </Button>
            </div>
            {loading && (
              <Loader
                showExplicit
                inModal
              />
            )}
          </>
        </Modal>
      )}
    </>
  );
};

export default PageBegin;
