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
import AddFolder from "./Folder.add.component";
import EditFolder from "./Folder.edit.component";
import ArchiveFolder from "./Folder.archive.component";
import PublishFolder from "./Folder.publish.component";
import UnpublishFolder from "./Folder.unpublish.component";
import DeleteFolder from "./Folder.delete.component";
import Modal from "../../../components/common/Modal/Modal.component";

//icons
import iconMap from "../../../Icons/map.svg";
import { IconDots, IconPlus, IconFolder, IconAddFolder } from "../../../Icons/icons";

//theme
import {
  bgSections,
  btnContainedPrimaryBgColor,
  lightColor,
  dragActive,
} from "../../../styles/theme";

//type
import { TFolder } from "../../../context/categories";

const FolderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: calc(4 * var(--atom));

  &.btn-add {
    cursor: pointer;
  }

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
      font-size: calc(3 * var(--atom));
      line-height: calc(5 * var(--atom));
      // font-size: 15px;
      // line-height: 25px;
      text-align: center;
      margin: calc(2 * var(--atom)) calc(5 * var(--atom));
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

const renderBackground = (isAdd: boolean) => (isAdd ? <IconFolder /> : <IconAddFolder />);

interface Props {
  isAdd?: boolean;
  data?: TFolder;
  published?: boolean;
  parentId?: number | null;
  categoryId: string | number;
  onAddFolder?: (folder?: TFolder) => void;
  onEditFolder?: (folder: TFolder, categoryId: number | string) => void;
  onDeleteFolder?: (folderId: number | string, categoryId: number | string) => void;
  folders?: TFolder[];
}

const Folder: React.FC<Props> = ({
  isAdd = false,
  data,
  published,
  categoryId,
  parentId = null,
  onAddFolder,
  onEditFolder,
  onDeleteFolder,
  folders,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [modalCreateFolder, setModalCreateFolder] = useState<boolean>(false);
  const [modalEditFolder, setModalEditFolder] = useState<boolean>(false);
  const [modalPublishFolder, setModalPublishFolder] = useState<boolean>(false);
  const [modalUnublishFolder, setModalUnublishFolder] = useState<boolean>(false);
  const [modalArchiveFolder, setModalArchiveFolder] = useState<boolean>(false);
  const [modalDeleteFolder, setModalDeleteFolder] = useState<boolean>(false);

  return (
    <>
      <FolderWrapper
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
        onClick={() => isAdd && setModalCreateFolder(true)}
      >
        {isAdd && (
          <div className="add-wrapper">
            <IconPlus />
            <span className="text-add">{t("common.addFolder")}</span>
          </div>
        )}
        <div className={`bg-wrapper${!isAdd ? " default" : ""}`}>
          {renderBackground(isAdd)}
          {!isAdd && (
            <>
              <div
                className="img-wrapper"
                onClick={() => navigate("/categories/1/1")}
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
                        setModalEditFolder(true);
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
                        onClick={() => setModalUnublishFolder(true)}
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
                          setModalPublishFolder(true);
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
        <div className="content">{!isAdd && <span>{data?.["name:bg"]}</span>}</div>
      </FolderWrapper>
      {modalCreateFolder && (
        <Modal
          title={t("pages.category.addFolder")}
          closeFn={() => setModalCreateFolder(false)}
        >
          <>
            <AddFolder
              categoryId={categoryId}
              parentId={parentId}
              closeFn={(newFolder?: TFolder) => {
                onAddFolder && onAddFolder(newFolder);
                setModalCreateFolder(false);
              }}
            />
          </>
        </Modal>
      )}
      {modalEditFolder && (
        <Modal
          title={t("pages.category.changeFolder")}
          closeFn={() => {
            setModalEditFolder(false);
            setMenuOpened(false);
          }}
        >
          <>
            <EditFolder
              folderData={data}
              closeFn={(newFolderData?: TFolder) => {
                if (newFolderData) {
                  onEditFolder && onEditFolder(newFolderData, categoryId);
                }
                setModalEditFolder(false);
                setMenuOpened(false);
              }}
            />
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
            setMenuOpened(false);
          }}
          title={t("pages.category.confirmPublish")}
        >
          <PublishFolder
            folderData={data}
            closeFn={(newFolderData?: TFolder) => {
              if (newFolderData) {
                onEditFolder && onEditFolder(newFolderData, categoryId);
              }
              setModalPublishFolder(false);
              setMenuOpened(false);
            }}
            folders={folders}
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
            folderData={data}
            closeFn={(newFolderData?: TFolder) => {
              if (newFolderData) {
                onEditFolder && onEditFolder(newFolderData, categoryId);
              }
              setModalPublishFolder(false);
              setMenuOpened(false);
            }}
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
            name={`${data?.["name:bg"]}`}
            id={data?.id || 0}
            closeFn={(folderId?: string | number) => {
              setModalDeleteFolder(false);
              onDeleteFolder && onDeleteFolder(+`${folderId}`, categoryId);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Folder;
