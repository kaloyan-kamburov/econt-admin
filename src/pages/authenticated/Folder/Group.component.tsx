import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//icons
import iconMap from "../../../Icons/map.svg";
import { IconDots, IconPlus } from "../../../Icons/icons";

//MUI component
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

//custom components
import AddGroup from "./Group.add.component";
import MoveGroup from "./Group.move.component";
import EditGroup from "./Group.edit.component";
import ArchiveGroup from "./Group.archive.component";
import PublishGroup from "./Group.publish.component";
import UnpublishGroup from "./Group.unpublish.component";
import DeleteGroup from "./Group.delete.component";
import Modal from "../../../components/common/Modal/Modal.component";

//icons
import { IconGroup, IconGroupAdd, IconGroupUnpublished } from "../../../Icons/icons";

//theme
import { bgSections, btnContainedPrimaryBgColor, lightColor } from "../../../styles/theme";

const GroupWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bg-wrapper {
    width: 144px;
    height: 174px;
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
    top: 60px;
    left: 83px;
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
    top: 36px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 2;
    align-items: center;
    transform: translateX(11px);
    max-width: 110px;
    text-align: center;

    span {
      font-size: 15px;
      line-height: 25px;
      color: ${btnContainedPrimaryBgColor};
      font-weight: 600;
      margin-top: 7px;
    }
  }

  .file-count {
    width: 18px;
    position: absolute;
    top: 20px;
    left: 47px;
    color: ${bgSections};
    font-size: 13px;
    z-index: 1;
    font-weight: 600;
    text-align: center;
  }

  .menu-wrapper {
    position: absolute;
    top: 10px;
    left: 150px;
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

const renderBackground = (isAdd: boolean, published: boolean) =>
  isAdd ? <IconGroupAdd /> : published ? <IconGroup /> : <IconGroupUnpublished />;

interface Props {
  isAdd?: boolean;
  title?: string;
  archived?: boolean;
  published: boolean;
}

const Folder: React.FC<Props> = ({ isAdd = false, title, archived, published }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [modalAddGroup, setModalAddGroup] = useState<boolean>(false);
  const [modalEditGroup, setModalEditGroup] = useState<boolean>(false);
  const [modalMoveGroup, setModalMoveGroup] = useState<boolean>(false);
  const [modalArchiveGroup, setModalArchiveGroup] = useState<boolean>(false);
  const [modalPublishGroup, setModalPublishGroup] = useState<boolean>(false);
  const [modalUnublishGroup, setModalUnublishGroup] = useState<boolean>(false);
  const [modalDeleteGroup, setModalDeleteGroup] = useState<boolean>(false);

  return (
    <>
      <GroupWrapper className={archived ? "archived" : ""}>
        {isAdd && (
          <div
            className="add-wrapper"
            onClick={() => setModalAddGroup(true)}
          >
            <IconPlus />
            <span className="text-add">{t("pages.folder.addGroup")}</span>
          </div>
        )}
        <div className={`bg-wrapper${!isAdd ? " default" : ""}`}>
          {renderBackground(isAdd, published)}
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
                        setModalEditGroup(true);
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
                        published ? setModalUnublishGroup(true) : setModalPublishGroup(true);
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
                        // setModalArchiveFolder(true);
                        setModalMoveGroup(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.move")}
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        setModalArchiveGroup(true);
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
                        setModalDeleteGroup(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.delete")}
                    </Button>
                  </div>
                )}
              </div>
              <div className="file-count">99</div>
            </>
          )}
        </div>
        <div className="content">{!isAdd && <span>Услуги от България</span>}</div>
      </GroupWrapper>

      {modalAddGroup && (
        <Modal
          title={t("pages.folder.addGroup")}
          closeFn={() => setModalAddGroup(false)}
          small
        >
          <>
            <AddGroup closeFn={() => setModalAddGroup(false)} />
          </>
        </Modal>
      )}

      {modalEditGroup && (
        <Modal
          title={t("pages.folder.changeGroup")}
          closeFn={() => setModalEditGroup(false)}
          small
        >
          <>
            <EditGroup closeFn={() => setModalEditGroup(false)} />
          </>
        </Modal>
      )}

      {modalMoveGroup && (
        <Modal
          title={t("pages.folder.moveGroup")}
          closeFn={() => setModalMoveGroup(false)}
          small
        >
          <>
            <MoveGroup closeFn={() => setModalMoveGroup(false)} />
          </>
        </Modal>
      )}

      {modalArchiveGroup && (
        <Modal
          closeFn={() => {
            setModalArchiveGroup(false);
          }}
        >
          <ArchiveGroup
            closeFn={() => {
              setModalArchiveGroup(false);
            }}
            groupForArchive={"asd"}
          />
        </Modal>
      )}
      {modalPublishGroup && (
        <Modal
          closeFn={() => {
            setModalPublishGroup(false);
          }}
          title={t("pages.category.confirmPublish")}
          large
        >
          <PublishGroup
            closeFn={() => {
              setModalPublishGroup(false);
            }}
          />
        </Modal>
      )}
      {modalUnublishGroup && (
        <Modal
          closeFn={() => {
            setModalUnublishGroup(false);
          }}
        >
          <UnpublishGroup
            closeFn={() => {
              setModalUnublishGroup(false);
            }}
            group={"asd"}
          />
        </Modal>
      )}
      {modalDeleteGroup && (
        <Modal
          closeFn={() => {
            setModalDeleteGroup(false);
          }}
        >
          <DeleteGroup
            closeFn={() => {
              setModalDeleteGroup(false);
            }}
            folder={"Забравени предмети"}
          />
        </Modal>
      )}
    </>
  );
};

export default Folder;
