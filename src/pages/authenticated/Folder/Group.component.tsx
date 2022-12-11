import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

//MUI components
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

//MUI icons
import OpenWith from "@mui/icons-material/OpenWith";

//custom components
import AddGroup from "./Group.add.component";
import EditGroup from "./Group.edit.component";
import ArchiveGroup from "./Group.archive.component";
import PublishGroup from "./Group.publish.component";
import UnpublishGroup from "./Group.unpublish.component";
import DeleteGroup from "./Group.delete.component";
import Modal from "../../../components/common/Modal/Modal.component";

//icons
import iconMap from "../../../Icons/map.svg";
import {
  IconDots,
  IconPlus,
  IconGroup,
  IconGroupAdd,
  IconGroupUnpublished,
} from "../../../Icons/icons";

//theme
import {
  bgSections,
  btnContainedPrimaryBgColor,
  lightColor,
  dragActive,
} from "../../../styles/theme";

//type
import { TFolder } from "../../../context/categories";

const GroupWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  &.non-published {
    .bg-wrapper {
      > svg,
      .img-wrapper {
        opacity: 0.5;
      }
    }
  }
  .drag-handle {
    position: absolute;
    top: 8px;
    left: 8px;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
  &.is-dragging {
    opacity: 0.5;
    // svg {
    //   path {
    //     fill: ${dragActive};
    //   }
    // }
  }
`;

const renderBackground = (isAdd: boolean, published: boolean) =>
  isAdd ? <IconGroupAdd /> : published ? <IconGroup /> : <IconGroupUnpublished />;

interface Props {
  isAdd?: boolean;
  data?: TFolder;
  published?: boolean;
  parentId?: number | null;
  categoryId: string | number;
  onAddGroup?: (folder?: TFolder) => void;
  onEditGroup?: (folder: TFolder, categoryId: number | string) => void;
  onDeleteGroup?: (folderId: number | string, categoryId: number | string) => void;
  groups?: TFolder[];
}

const Group: React.FC<Props> = ({
  isAdd = false,
  data,
  published,
  categoryId,
  parentId = null,
  onAddGroup,
  onEditGroup,
  onDeleteGroup,
  groups,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [modalCreateGroup, setModalCreateGroup] = useState<boolean>(false);
  const [modalEditGroup, setModalEditGroup] = useState<boolean>(false);
  const [modalPublishGroup, setModalPublishGroup] = useState<boolean>(false);
  const [modalUnublishGroup, setModalUnublishGroup] = useState<boolean>(false);
  const [modalArchiveGroup, setModalArchiveGroup] = useState<boolean>(false);
  const [modalDeleteGroup, setModalDeleteGroup] = useState<boolean>(false);

  return (
    <>
      <GroupWrapper
        className={`${isAdd ? "btn-add" : `${published ? "" : " non-published"}`}${
          isDragging ? " is-dragging" : ""
        }`}
        onDragOver={(e) => {
          if (!isAdd) {
            e.preventDefault();
            setIsDragging(true);
          }
        }}
        onDragLeave={() => !isAdd && setIsDragging(false)}
        onClick={() => isAdd && setModalCreateGroup(true)}
      >
        {isAdd && (
          <div className="add-wrapper">
            <IconPlus />
            <span className="text-add">{t("pages.folder.addGroup")}</span>
          </div>
        )}
        <div className={`bg-wrapper${!isAdd ? " default" : ""}`}>
          {renderBackground(isAdd, !!published)}
          {!isAdd && (
            <>
              <div
                className="img-wrapper"
                onClick={() => navigate(`/categories/${data?.category_id}/${data?.id}`)}
              >
                <LazyLoadImage
                  alt={data?.image?.alt}
                  src={data?.image?.path}
                  effect="opacity"
                />
              </div>

              <div className="drag-handle">
                <OpenWith />
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
                    {published ? (
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: 0,
                        }}
                        onClick={() => setModalUnublishGroup(true)}
                      >
                        {t("common.removeFromPublish")}
                      </Button>
                    ) : (
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: 0,
                        }}
                        onClick={() => {
                          setModalPublishGroup(true);
                        }}
                      >
                        {t("common.publish")}
                      </Button>
                    )}
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
            </>
          )}
        </div>
        <div className="content">{!isAdd && <span>{data?.["name:bg"]}</span>}</div>
      </GroupWrapper>
      {modalCreateGroup && (
        <Modal
          title={t("pages.folder.addGroup")}
          closeFn={() => setModalCreateGroup(false)}
        >
          <>
            <AddGroup
              categoryId={categoryId}
              parentId={parentId}
              closeFn={(newGroup?: TFolder) => {
                onAddGroup && onAddGroup(newGroup);
                setModalCreateGroup(false);
              }}
            />
          </>
        </Modal>
      )}
      {modalEditGroup && (
        <Modal
          title={t("pages.folder.changeGroup")}
          closeFn={() => {
            setModalEditGroup(false);
            setMenuOpened(false);
          }}
        >
          <>
            <EditGroup
              folderData={data}
              closeFn={(newGroupData?: TFolder) => {
                if (newGroupData) {
                  onEditGroup && onEditGroup(newGroupData, categoryId);
                }
                setModalEditGroup(false);
                setMenuOpened(false);
              }}
            />
            {/* <Loader showExplicit inModal /> */}
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
            folderForArchive={"asd"}
          />
        </Modal>
      )}
      {modalPublishGroup && (
        <Modal
          closeFn={() => {
            setModalPublishGroup(false);
            setMenuOpened(false);
          }}
          title={t("pages.folder.confirmPublish")}
        >
          <PublishGroup
            folderData={data}
            closeFn={(newGroupData?: TFolder) => {
              if (newGroupData) {
                onEditGroup && onEditGroup(newGroupData, categoryId);
              }
              setModalPublishGroup(false);
              setMenuOpened(false);
            }}
            groups={groups}
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
            folderData={data}
            closeFn={(newGroupData?: TFolder) => {
              if (newGroupData) {
                onEditGroup && onEditGroup(newGroupData, categoryId);
              }
              setModalPublishGroup(false);
              setMenuOpened(false);
            }}
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
            name={`${data?.["name:bg"]}`}
            id={data?.id || 0}
            closeFn={(folderId?: string | number) => {
              setModalDeleteGroup(false);
              onDeleteGroup && onDeleteGroup(+`${folderId}`, categoryId);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Group;
