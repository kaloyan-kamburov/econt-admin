import React, { useEffect, useState } from "react";
import { Draggable } from "react-drag-reorder";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

//MUI components
// import Grid from "@mui/material/Grid";

//custom components
import Group from "./Group.component";
import Folder from "../Category/Folder.component";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb.component";
import PageGroup from "../Group/Group.page";

//hooks
import { useCategories, usePageError, usePageTitle } from "../../../hooks/hooks";

//utils
import axios from "../../../utils/api";

//types
import { Path } from "../../../components/common/Breadcrumb/Breadcrumb.component";
import { TFolder } from "../../../context/categories";

interface Props {}

const PageFolder: React.FC<Props> = () => {
  const { setTitle } = usePageTitle();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { id } = useParams();
  const { categories } = useCategories();
  const { setVisibleError, setErrorMsg, setRetryFn } = usePageError();

  const [pageData, setPageData] = useState<any>({});
  const [pageType, setPageType] = useState<"all" | "only_folders" | "only_files">("all");
  const [records, setRecords] = useState<any>([]);
  const [itemsRendered, setItemsRendered] = useState<boolean>(true);
  const [entityId, setEntityId] = useState<string | number>("");

  const [path, setPath] = useState<Path[]>([]);

  //get category data
  const { refetch: getPageData } = useQuery(
    "getPageData",
    async () => {
      const pathArr = pathname.split("/");
      const entityId = pathArr[pathArr.length - 1];
      const data = await axios(
        `folders?include=category.image&filter[category_id]=${id}&filter[folder_id]=${entityId}`
      );
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setPath(data?.data?.path);
          setPageType(data?.data?.type);
          setRecords(data?.data?.data || []);
          setTitle("");
          // setPageData(data?.data?.data);
        }
      },
      onError: (error: AxiosError) => {
        setVisibleError(true);
        setErrorMsg("Error happened");
        toast.error(error?.message || `${t("common.errorGettingData")}`);
        setRetryFn({
          execute: getPageData,
        });
      },
    }
  );

  //update positions
  const updatePositions = useMutation(
    async (values: { currPos: number; newPos: number; id: number | string }) => {
      const data = await axios.patch(`folders/${values?.id}/order`, {
        position: values.newPos + 1,
      });
      return { ...data, newPos: values.newPos, currPos: values.currPos };
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          const currPos = data?.currPos;
          const newPos = data?.newPos;
          const newCategories = [...categories];
          const editedCategoryIndex = newCategories.findIndex((cat) => cat.id === +(id || 0));

          if (editedCategoryIndex > -1) {
            const tempPfolder = newCategories[editedCategoryIndex].folders.splice(currPos, 1)[0];
            newCategories[editedCategoryIndex].folders.splice(newPos, 0, tempPfolder);
          }

          toast.success(`${t("common.positionsUpdated")}`);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || `${t("common.errorGettingData")}`);
        setVisibleError(true);
      },
    }
  );

  const refreshContent = () => {
    setItemsRendered(false);
    setTimeout(() => {
      setItemsRendered(true);
    });
  };

  useEffect(() => {
    setRecords([]);
    getPageData();
    const pathArr = pathname.split("/");
    const newEntityId = pathArr[pathArr.length - 1];
    setEntityId(newEntityId);
    return () => setErrorMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    refreshContent();
    if (records.length === 0) {
      setPageType("all");
    }
  }, [records]);

  return (
    <div className="page-wrapper xxl">
      {/* <pre>{JSON.stringify(entityId, null, 4)}</pre> */}
      {/* <br />
      <pre>{JSON.stringify(records, null, 4)}</pre> */}
      {itemsRendered && (
        <>
          <Breadcrumb routePath={path} />
          {["all", "only_folders"].includes(pageType) && (
            <Folder
              categoryId={id || ""}
              parentId={+entityId}
              isAdd
              onAddFolder={(newFolder?: TFolder) => {
                newFolder && setRecords([...records, newFolder]);
                setPageType("only_folders");
                refreshContent();
              }}
            />
          )}
          {["all", "only_files"].includes(pageType) && (
            <Group
              published
              isAdd
            />
          )}
          <Draggable
            onPosChange={(currPos, newPos) => {
              // updatePositions.mutate(true);
              const values = {
                newPos,
                currPos,
                id: records?.[currPos]?.id || "",
              };
              updatePositions.mutate(values);
              setRetryFn({
                execute: () => updatePositions.mutate(values),
              });
            }}
          >
            {pageType === "only_folders"
              ? records.map((folder: TFolder) => (
                  <Folder
                    key={folder.id}
                    published={folder.published}
                    data={folder}
                    categoryId={id || ""}
                    parentId={+entityId}
                    folders={records}
                    onEditFolder={(editedFolderData: TFolder, categoryId: number | string) => {
                      if (editedFolderData) {
                        const updatedFolderIndex = records.findIndex(
                          (folder: TFolder) => folder.id === editedFolderData.id
                        );
                        if (updatedFolderIndex > -1) {
                          const currentFolders = [...records];
                          currentFolders[updatedFolderIndex] = editedFolderData;
                          setRecords(currentFolders);
                        }
                      }
                      // if (editedFolderData?.published) {
                      //   const currentCategoryIndex = categories.findIndex(
                      //     (cat) => +cat.id === +categoryId
                      //   );
                      //   if (currentCategoryIndex > -1) {
                      //     const newCategories = [...categories];
                      //     const editedCategoryIndex = newCategories[
                      //       currentCategoryIndex
                      //     ].folders.findIndex((cat) => cat.id === editedFolderData.id);
                      //     if (editedCategoryIndex > -1) {
                      //       newCategories[currentCategoryIndex].folders[editedCategoryIndex] = {
                      //         ...newCategories[currentCategoryIndex].folders[editedCategoryIndex],
                      //         ...editedFolderData,
                      //       };
                      //       setCategories(newCategories);
                      //     }
                      //   }
                      // }

                      refreshContent();
                    }}
                    onDeleteFolder={(folderId: number | string, categoryId: number | string) => {
                      setRecords(records.filter((record: TFolder) => record.id !== +folderId));
                      refreshContent();
                    }}
                  />
                ))
              : records.map((folder: any) => (
                  <Group
                    key={folder.id}
                    published={folder.published}
                    data={folder}
                  />
                ))}
          </Draggable>
        </>
      )}
    </div>
  );
};

export default PageFolder;
