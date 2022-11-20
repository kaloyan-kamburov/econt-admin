import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//icons
import iconMap from "../../../Icons/map.svg";
import { IconDots, IconPlus, IconFolder, IconAddFolder } from "../../../Icons/icons";

//MUI component
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

//custom components
import AddFolder from "./Folder.add.component";
import EditFolder from "./Folder.edit.component";
import ArchiveFolder from "./Folder.archive.component";
import PublishFolder from "./Folder.publish.component";
import UnpublishFolder from "./Folder.unpublish.component";
import DeleteFolder from "./Folder.delete.component";
import Modal from "../../../components/common/Modal/Modal.component";

//theme
import { bgSections, btnContainedPrimaryBgColor, lightColor } from "../../../styles/theme";

const FolderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bg-wrapper {
    width: 218px;
    height: 150px;
    position: relative;
    // background: red;

    &.default {
      > svg {
        position: relative;
        top: -8px;
        left: -11px;
      }
    }
  }

  .img-wrapper {
    position: absolute;
    width: 70px;
    height: 70px;
    cursor: pointer;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .content {
    padding-top: var(--atom);
    // padding-top: 14px;
    display: flex;
    justify-content: center;
    position: relative;
    z-intex: 1;
    span {
      //   font-size: calc(3 * var(--atom));
      //   line-height: calc(5 * var(--atom));
      font-size: 15px;
      line-height: 25px;
    }
  }

  .add-wrapper {
    position: absolute;
    top: 40px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 2;
    align-items: center;

    span {
      font-size: 15px;
      line-height: 25px;
      color: ${btnContainedPrimaryBgColor};
      font-weight: 600;
      margin-top: 7px;
    }
  }

  .menu-wrapper {
    position: absolute;
    top: 38px;
    left: 180px;
    z-index: 2;

    // .btn-menu {
    //   &.active {
    //     background: ${lightColor};
    //     opacity: 0.15;
    //   }
    // }

    .sub-menu {
      display: flex;
      position: absolute;
      // top: calc(8 * var(--atom));
      right: calc(2 * var(--atom));
      top: 30px;
      right: 10px;
      background: ${bgSections};
      box-shadow: 0px calc(0.8 * var(--atom)) calc(2.4 * var(--atom)) rgba(0, 0, 0, 0.15);
      border-radius: calc(0.8 * var(--atom));
      flex-direction: column;

      button {
        font-size: calc(4 * var(--atom));
        line-height: calc(5.4 * var(--atom));
        padding: 0 calc(3 * var(--atom));
        justify-content: flex-start;
        white-space: nowrap;
      }
    }
  }

  &.archived {
    .bg-wrapper {
      > svg,
      .img-wrapper {
        opacity: 0.5;
      }
    }
  }
`;

const renderBackground = (isAdd: boolean) => (isAdd ? <IconFolder /> : <IconAddFolder />);

interface Props {
  isAdd?: boolean;
  title?: string;
  archived?: boolean;
  published?: boolean;
}

const Folder: React.FC<Props> = ({ isAdd = false, title, archived, published }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [modalCreateFolder, setModalCreateFolder] = useState<boolean>(false);
  const [modalEditFolder, setModalEditFolder] = useState<boolean>(false);
  const [modalPublishFolder, setModalPublishFolder] = useState<boolean>(false);
  const [modalUnublishFolder, setModalUnublishFolder] = useState<boolean>(false);
  const [modalArchiveFolder, setModalArchiveFolder] = useState<boolean>(false);

  const [modalDeleteFolder, setModalDeleteFolder] = useState<boolean>(false);

  return (
    <>
      <FolderWrapper className={archived ? "archived" : ""}>
        {isAdd && (
          <div
            className="add-wrapper"
            onClick={() => setModalCreateFolder(true)}
          >
            <IconPlus />
            <span className="text-add">{t("pages.home.add")}</span>
          </div>
        )}
        <div className={`bg-wrapper${!isAdd ? " default" : ""}`}>
          {renderBackground(isAdd)}
          {!isAdd && (
            <>
              <div
                className="img-wrapper"
                onClick={() => navigate("/category/1/1")}
              >
                <img
                  src={iconMap}
                  alt="icon"
                />
              </div>
              <div className="menu-wrapper">
                <IconButton
                  className={`btn-menu${menuOpened ? " active" : ""}`}
                  onClick={() => setMenuOpened(!menuOpened)}
                >
                  <IconDots />
                </IconButton>
                {menuOpened && (
                  <div className="sub-menu">
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        setModalEditFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.change")}
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        published ? setModalUnublishFolder(true) : setModalPublishFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t(`common.${published ? "removeFromPublish" : "publish"}`)}
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        setModalArchiveFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.archive")}
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        setModalDeleteFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.delete")}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="content">{!isAdd && <span>Услуги от България</span>}</div>
      </FolderWrapper>

      {modalCreateFolder && (
        <Modal
          title={t("pages.category.addFolder")}
          closeFn={() => setModalCreateFolder(false)}
        >
          <>
            <AddFolder closeFn={() => setModalCreateFolder(false)} />
          </>
        </Modal>
      )}
      {modalEditFolder && (
        <Modal
          title={t("pages.category.changeFolder")}
          closeFn={() => setModalEditFolder(false)}
        >
          <>
            <EditFolder closeFn={() => setModalEditFolder(false)} />
            {/* <Loader showExplicit inModal /> */}
          </>
        </Modal>
      )}
      {modalArchiveFolder && (
        <Modal
          closeFn={() => {
            setModalArchiveFolder(false);
          }}
        >
          <ArchiveFolder
            closeFn={() => {
              setModalArchiveFolder(false);
            }}
            folderForArchive={"asd"}
          />
        </Modal>
      )}
      {modalPublishFolder && (
        <Modal
          closeFn={() => {
            setModalPublishFolder(false);
          }}
          title={t("pages.category.confirmPublish")}
          large
        >
          <PublishFolder
            closeFn={() => {
              setModalPublishFolder(false);
            }}
            // folderForArchive={"sda"}
          />
        </Modal>
      )}
      {modalUnublishFolder && (
        <Modal
          closeFn={() => {
            setModalUnublishFolder(false);
          }}
        >
          <UnpublishFolder
            closeFn={() => {
              setModalUnublishFolder(false);
            }}
            folder={""}
          />
        </Modal>
      )}
      {modalDeleteFolder && (
        <Modal
          closeFn={() => {
            setModalDeleteFolder(false);
          }}
        >
          <DeleteFolder
            closeFn={() => {
              setModalDeleteFolder(false);
            }}
            folder={"Забравени предмети"}
          />
        </Modal>
      )}
    </>
  );
};

export default Folder;
