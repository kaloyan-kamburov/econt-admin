import React, { useEffect, useState } from "react";
import { Draggable } from "react-drag-reorder";
import { useQuery, useMutation } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

//custom components
import Folder from "./Folder.component";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb.component";

//hooks
import { usePageTitle, usePageError, useCategories } from "../../../hooks/hooks";

//utils
import axios from "../../../utils/api";

//types
import { TFolder } from "../../../context/categories";
import { Path } from "../../../components/common/Breadcrumb/Breadcrumb.component";

interface Props {}

const PageCategory: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();
  const { categories, setCategories } = useCategories();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { setVisibleError, setRetryFn, setErrorMsg } = usePageError();
  const [folders, setFolders] = useState<TFolder[]>([]);
  const [foldersRendered, setfoldersRendered] = useState<boolean>(true);
  const [path, setPath] = useState<Path[]>([]);

  //get category data
  const { refetch: getCategoryData } = useQuery(
    "getCategoryData",
    async () => {
      // setVisible(false);
      const data = await axios(
        `folders?include=category.image&filter[category_id]=${id}&filter[folder_id]=null`
      );
      // const data = await axios(`folders?include=category.image&filter[folder_id]=${id}`);
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setFolders(data?.data?.data || []);
          setTitle(data?.data?.path?.[0]?.name || "");
          setPath(data?.data?.path || []);
          // setTitle(data?.data?.data?.name);
          // setFolders(data?.data?.data?.folders);
          setfoldersRendered(false);
          setTimeout(() => {
            setfoldersRendered(true);
          });
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || `${t("common.errorGettingData")}`);
        setVisibleError(true);
        setRetryFn({
          execute: getCategoryData,
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
            setCategories(newCategories);
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

  useEffect(() => {
    getCategoryData();
  }, [pathname]);

  const refreshContent = () => {
    setfoldersRendered(false);
    setTimeout(() => {
      setfoldersRendered(true);
    });
  };

  return (
    <div className="page-wrapper xxl">
      <Breadcrumb routePath={path} />
      <Folder
        categoryId={id || ""}
        isAdd
        onAddFolder={(newFolder?: TFolder) => {
          newFolder && setFolders([...folders, newFolder]);
          const currentCategoryIndex = newFolder
            ? categories.findIndex((cat) => cat.id === +newFolder.category_id)
            : -1;
          if (currentCategoryIndex > -1) {
            const newCategories = [...categories];
            // const categoryFolders = newFolder
            //   ? newCategories[currentCategoryIndex].folders.filter(
            //       (folder) => folder.id !== +newFolder?.category_id
            //     )
            //   : [];
            newFolder && newCategories[currentCategoryIndex].folders.push(newFolder);
            setCategories(newCategories);
          }
          refreshContent();
        }}
      />
      {foldersRendered && (
        <Draggable
          onPosChange={(currPos, newPos) => {
            const values = {
              newPos,
              currPos,
              id: folders?.[currPos]?.id || "",
            };
            updatePositions.mutate(values);
            setRetryFn({
              execute: () => updatePositions.mutate(values),
            });
          }}
        >
          {folders.map((folder: any) => (
            <Folder
              key={folder.id}
              published={folder.published}
              data={folder}
              categoryId={id || ""}
              folders={folders}
              onEditFolder={(editedFolderData: TFolder, categoryId: number | string) => {
                if (editedFolderData) {
                  const updatedFolderIndex = folders.findIndex(
                    (folder) => folder.id === editedFolderData.id
                  );
                  if (updatedFolderIndex > -1) {
                    const currentFolders = [...folders];
                    currentFolders[updatedFolderIndex] = editedFolderData;
                    setFolders(currentFolders);
                  }
                }
                if (editedFolderData?.published) {
                  const currentCategoryIndex = categories.findIndex(
                    (cat) => +cat.id === +categoryId
                  );
                  if (currentCategoryIndex > -1) {
                    const newCategories = [...categories];
                    const editedCategoryIndex = newCategories[
                      currentCategoryIndex
                    ].folders.findIndex((cat) => cat.id === editedFolderData.id);
                    if (editedCategoryIndex > -1) {
                      newCategories[currentCategoryIndex].folders[editedCategoryIndex] = {
                        ...newCategories[currentCategoryIndex].folders[editedCategoryIndex],
                        ...editedFolderData,
                      };
                      setCategories(newCategories);
                    }
                  }
                }

                refreshContent();
              }}
              onDeleteFolder={(folderId: number | string, categoryId: number | string) => {
                setFolders(folders.filter((folder) => folder.id !== +folderId));
                const currentCategoryIndex = categories.findIndex((cat) => cat.id === +categoryId);
                if (currentCategoryIndex > -1) {
                  const newCategories = [...categories];
                  const categoryFolders = newCategories[currentCategoryIndex].folders.filter(
                    (folder) => folder.id !== folderId
                  );
                  newCategories[currentCategoryIndex].folders = categoryFolders;
                  setCategories(newCategories);
                }
                refreshContent();
              }}
            />
          ))}
        </Draggable>
      )}
    </div>
  );
};

export default PageCategory;
